const fs = require("fs/promises");
const nodeFs = require("fs");
const os = require("os");
const path = require("path");
const OpenAI = require("openai");
require("dotenv").config({ path: path.join(__dirname, ".env"), quiet: true });

const { TelegramBot } = require("node-telegram-bot-api");
const { readFile, writeFile, replaceText } = require("./website-editor");
const { commitAndPush } = require("./git-helper");

const SITE_FILES = ["page.tsx", "layout.tsx", "globals.css"];
const MODEL = process.env.OPENAI_MODEL || "gpt-5.5";
const TRANSCRIBE_MODEL = process.env.OPENAI_TRANSCRIBE_MODEL || "gpt-4o-transcribe";

if (!process.env.TELEGRAM_BOT_TOKEN) {
  throw new Error("TELEGRAM_BOT_TOKEN is missing in agent/.env");
}

if (!process.env.TELEGRAM_CHAT_ID) {
  throw new Error("TELEGRAM_CHAT_ID is missing in agent/.env");
}

if (!process.env.OPENAI_API_KEY) {
  throw new Error("OPENAI_API_KEY is missing in agent/.env");
}

const bot = new TelegramBot(process.env.TELEGRAM_BOT_TOKEN, { polling: true });
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
const allowedChatId = String(process.env.TELEGRAM_CHAT_ID);
const busyChats = new Set();

bot.on("polling_error", (error) => {
  console.error("Telegram polling error:", error.message);
});

bot.onText(/^\/start$/, (msg) => {
  bot.sendMessage(
    msg.chat.id,
    [
      "Double Hedge Website Agent is live.",
      "",
      "Send a text message or voice note with the website change you want.",
      "Example: Add a pricing section under featured courses.",
      "",
      "Quick text replacement still works:",
      "/change old text => new text",
    ].join("\n"),
  );
});

bot.onText(/^\/change (.+)/, async (msg, match) => {
  if (!isAuthorized(msg)) return;

  await runTask(msg, async () => {
    const input = match?.[1] || "";

    if (!input.includes("=>")) {
      return bot.sendMessage(
        msg.chat.id,
        "Use format:\n/change old text => new text",
      );
    }

    const [oldText, newText] = input.split("=>").map((x) => x.trim());

    await bot.sendMessage(msg.chat.id, "Updating website text...");
    await replaceText("page.tsx", oldText, newText);
    await commitAndPush(`Update website text: ${shortMessage(newText)}`);

    return bot.sendMessage(
      msg.chat.id,
      "Done. Website update pushed to GitHub. Vercel will deploy shortly.",
    );
  });
});

bot.on("message", async (msg) => {
  if (!isAuthorized(msg)) return;
  if (msg.text?.startsWith("/start") || msg.text?.startsWith("/change ")) return;

  await runTask(msg, async () => {
    const instruction = await getInstructionFromMessage(msg);

    if (!instruction) {
      return bot.sendMessage(
        msg.chat.id,
        "Send a text instruction or voice note describing the website change.",
      );
    }

    await bot.sendMessage(msg.chat.id, `Working on: ${instruction}`);
    const changes = await planWebsiteChanges(instruction);

    if (changes.length === 0) {
      return bot.sendMessage(msg.chat.id, "I did not find a safe website change to apply.");
    }

    for (const change of changes) {
      await writeFile(change.path, change.content);
    }

    await commitAndPush(`Website update: ${shortMessage(instruction)}`);

    await bot.sendMessage(
      msg.chat.id,
      [
        "Done. Website update pushed to GitHub.",
        `Changed: ${changes.map((change) => `app/${change.path}`).join(", ")}`,
        "Vercel will deploy shortly.",
      ].join("\n"),
    );
  });
});

function isAuthorized(msg) {
  if (String(msg.chat.id) === allowedChatId) return true;

  bot.sendMessage(msg.chat.id, "Not authorized.");
  return false;
}

async function runTask(msg, task) {
  const chatId = String(msg.chat.id);

  if (busyChats.has(chatId)) {
    await bot.sendMessage(msg.chat.id, "I am already working on a website update. Try again in a moment.");
    return;
  }

  busyChats.add(chatId);

  try {
    await task();
  } catch (error) {
    await bot.sendMessage(msg.chat.id, `Error: ${error.message}`);
  } finally {
    busyChats.delete(chatId);
  }
}

async function getInstructionFromMessage(msg) {
  if (typeof msg.text === "string" && msg.text.trim()) {
    return msg.text.trim();
  }

  if (msg.voice?.file_id) {
    await bot.sendMessage(msg.chat.id, "Transcribing your voice note...");
    return transcribeTelegramVoice(msg.voice.file_id);
  }

  return "";
}

async function transcribeTelegramVoice(fileId) {
  const downloadDir = await fs.mkdtemp(path.join(os.tmpdir(), "double-hedge-voice-"));

  try {
    const filePath = await bot.downloadFile(fileId, downloadDir);
    const transcription = await openai.audio.transcriptions.create({
      file: nodeFs.createReadStream(filePath),
      model: TRANSCRIBE_MODEL,
    });

    return transcription.text.trim();
  } finally {
    await fs.rm(downloadDir, { recursive: true, force: true });
  }
}

async function planWebsiteChanges(instruction) {
  const files = await readSiteFiles();
  const response = await openai.responses.create({
    model: MODEL,
    instructions: [
      "You are an expert Next.js App Router, TypeScript, and Tailwind CSS website editor.",
      "Edit only files inside the app folder.",
      "Return only valid JSON. Do not include markdown fences.",
      "The JSON shape must be: {\"summary\":\"short summary\",\"files\":[{\"path\":\"page.tsx\",\"content\":\"full new file content\"}]}",
      "Only include files that actually need to change.",
      "Preserve existing imports, component structure, dark premium trading academy style, and responsive Tailwind patterns unless the user asks to change them.",
      "Do not add fake profit guarantees, investment advice claims, or hedge fund positioning.",
      "If the request is unclear or unsafe, return {\"summary\":\"no change\",\"files\":[]}.",
    ].join("\n"),
    input: [
      "User instruction:",
      instruction,
      "",
      "Current app files:",
      JSON.stringify(files, null, 2),
    ].join("\n"),
  });

  const parsed = parseJsonResponse(response.output_text || "");

  if (!Array.isArray(parsed.files)) {
    throw new Error("AI response did not include a files array");
  }

  return parsed.files.map((file) => {
    if (!SITE_FILES.includes(file.path)) {
      throw new Error(`AI tried to edit unsupported file: ${file.path}`);
    }

    if (typeof file.content !== "string" || file.content.trim().length === 0) {
      throw new Error(`AI returned empty content for ${file.path}`);
    }

    return {
      path: file.path,
      content: file.content,
    };
  });
}

async function readSiteFiles() {
  const files = {};

  for (const filePath of SITE_FILES) {
    try {
      files[filePath] = await readFile(filePath);
    } catch (error) {
      files[filePath] = `/* Unable to read ${filePath}: ${error.message} */`;
    }
  }

  return files;
}

function parseJsonResponse(text) {
  const trimmed = text.trim();
  const withoutFence = trimmed
    .replace(/^```(?:json)?\s*/i, "")
    .replace(/\s*```$/i, "")
    .trim();

  try {
    return JSON.parse(withoutFence);
  } catch {
    const start = withoutFence.indexOf("{");
    const end = withoutFence.lastIndexOf("}");

    if (start === -1 || end === -1 || end <= start) {
      throw new Error("AI did not return valid JSON");
    }

    return JSON.parse(withoutFence.slice(start, end + 1));
  }
}

function shortMessage(message) {
  return message.replace(/\s+/g, " ").trim().slice(0, 80);
}

console.log("Telegram bot is running...");
