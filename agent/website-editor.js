const fs = require("fs/promises");
const path = require("path");

const appDir = path.resolve(__dirname, "..", "app");

function resolveAppPath(filePath) {
  if (typeof filePath !== "string" || filePath.trim().length === 0) {
    throw new Error("path must be a non-empty string");
  }

  const resolvedPath = path.resolve(appDir, filePath);
  const relativePath = path.relative(appDir, resolvedPath);

  if (
    relativePath === "" ||
    relativePath.startsWith("..") ||
    path.isAbsolute(relativePath)
  ) {
    throw new Error("Access denied: file must be inside the app folder");
  }

  return resolvedPath;
}

async function readFile(filePath) {
  return fs.readFile(resolveAppPath(filePath), "utf8");
}

async function writeFile(filePath, content) {
  if (typeof content !== "string") {
    throw new Error("content must be a string");
  }

  const resolvedPath = resolveAppPath(filePath);
  await fs.mkdir(path.dirname(resolvedPath), { recursive: true });
  await fs.writeFile(resolvedPath, content, "utf8");
}

async function replaceText(filePath, oldText, newText) {
  if (typeof oldText !== "string" || oldText.length === 0) {
    throw new Error("oldText must be a non-empty string");
  }

  if (typeof newText !== "string") {
    throw new Error("newText must be a string");
  }

  const content = await readFile(filePath);

  if (!content.includes(oldText)) {
    throw new Error("oldText was not found in the file");
  }

  const updatedContent = content.replaceAll(oldText, newText);
  await writeFile(filePath, updatedContent);

  return updatedContent;
}

module.exports = {
  readFile,
  writeFile,
  replaceText,
};
