"use strict";

const fs = require("fs");
const path = require("path");
const readline = require("readline");
const { CONFIG_PURUS } = require("./templates.js");

function question(rl, text) {
  return new Promise((resolve) => rl.question(text, (a) => resolve(a.trim())));
}

async function run() {
  const configPath = path.join(process.cwd(), "config.purus");

  if (fs.existsSync(configPath)) {
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });
    const answer = await question(
      rl,
      "config.purus already exists. Overwrite? [y/N] ",
    );
    rl.close();
    if (answer.toLowerCase() !== "y") {
      console.log("Aborted.");
      return;
    }
  }

  fs.writeFileSync(configPath, CONFIG_PURUS);
  console.log("Generated config.purus");
}

run();
