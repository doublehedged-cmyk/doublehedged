const path = require("path");
const simpleGit = require("simple-git");

const repoDir = path.resolve(__dirname, "..");
const git = simpleGit(repoDir);

async function commitAndPush(message) {
  if (typeof message !== "string" || message.trim().length === 0) {
    throw new Error("commitAndPush(message) requires a non-empty message");
  }

  await git.add(".");
  const commitResult = await git.commit(message);
  const pushResult = await git.push("origin", "main");

  return {
    commit: commitResult,
    push: pushResult,
  };
}

module.exports = { commitAndPush };
