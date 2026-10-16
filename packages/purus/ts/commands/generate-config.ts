import fs from "node:fs";
import path from "node:path";
import readline from "node:readline";
import { CONFIG_PURUS } from "../lib/templates.js";

function question(rl: readline.Interface, text: string): Promise<string> {
  return new Promise((resolve) => rl.question(text, (a) => resolve(a.trim())));
}

/** `purus config` */
export async function run(): Promise<void> {
  const configPath = path.join(process.cwd(), "config.purus");

  if (fs.existsSync(configPath)) {
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });
    const answer = await question(
      rl,
      "config.purus already exists. Overwrite? [y/N] "
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
