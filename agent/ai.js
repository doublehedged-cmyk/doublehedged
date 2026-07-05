const path = require("path");
const OpenAI = require("openai");
require("dotenv").config({ path: path.join(__dirname, ".env"), quiet: true });

const MODEL = process.env.OPENAI_MODEL || "gpt-5.5";

let client;

function getClient() {
  if (!client) {
    client = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });
  }

  return client;
}

async function askAI(prompt) {
  if (!process.env.OPENAI_API_KEY) {
    throw new Error("OPENAI_API_KEY is missing in agent/.env");
  }

  if (typeof prompt !== "string" || prompt.trim().length === 0) {
    throw new Error("askAI(prompt) requires a non-empty string prompt");
  }

  try {
    const response = await getClient().responses.create({
      model: MODEL,
      input: prompt,
    });

    return response.output_text || "";
  } catch (error) {
    if (error instanceof OpenAI.APIError) {
      const message = [
        `OpenAI API error (${error.status || "no-status"})`,
        error.name,
        error.message,
        error.request_id ? `request_id=${error.request_id}` : null,
      ]
        .filter(Boolean)
        .join(": ");

      throw new Error(message);
    }

    throw new Error(
      error instanceof Error
        ? `Failed to ask OpenAI: ${error.message}`
        : "Failed to ask OpenAI: unknown error",
    );
  }
}

module.exports = { askAI };
