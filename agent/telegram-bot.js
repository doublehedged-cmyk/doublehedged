const path = require("path");
require("dotenv").config({ path: path.join(__dirname, ".env"), quiet: true });

const { TelegramBot } = require("node-telegram-bot-api");
const { replaceText } = require("./website-editor");
const { commitAndPush } = require("./git-helper");

if (!process.env.TELEGRAM_BOT_TOKEN) {
  throw new Error("TELEGRAM_BOT_TOKEN is missing in agent/.env");
}

if (!process.env.TELEGRAM_CHAT_ID) {
  throw new Error("TELEGRAM_CHAT_ID is missing in agent/.env");
}

const bot = new TelegramBot(process.env.TELEGRAM_BOT_TOKEN, { polling: true });
const allowedChatId = String(process.env.TELEGRAM_CHAT_ID);

bot.on("polling_error", (error) => {
  console.error("Telegram polling error:", error.message);
});

bot.onText(/\/start/, (msg) => {
  bot.sendMessage(
    msg.chat.id,
    "Double Hedge Website Agent is live.\n\nUse:\n/change old text => new text"
  );
});

bot.onText(/\/change (.+)/, async (msg, match) => {
  try {
    if (String(msg.chat.id) !== allowedChatId) {
      return bot.sendMessage(msg.chat.id, "Not authorized.");
    }

    const input = match[1];

    if (!input.includes("=>")) {
      return bot.sendMessage(
        msg.chat.id,
        "Use format:\n/change old text => new text"
      );
    }

    const [oldText, newText] = input.split("=>").map((x) => x.trim());

    await bot.sendMessage(msg.chat.id, "Updating website...");

    await replaceText("page.tsx", oldText, newText);

    await commitAndPush(`Update website text: ${newText}`);

    await bot.sendMessage(
      msg.chat.id,
      "Done. Website update pushed to GitHub. Vercel will deploy shortly."
    );
  } catch (error) {
    await bot.sendMessage(msg.chat.id, `Error: ${error.message}`);
  }
});

console.log("Telegram bot is running...");
