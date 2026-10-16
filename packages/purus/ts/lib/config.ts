import fs from "node:fs";
import path from "node:path";

export type ConfigValue = string | number | boolean | ConfigObject;

export interface ConfigObject {
  [key: string]: ConfigValue;
}

export interface LoadedConfig {
  config: ConfigObject;
  configPath: string;
  configDir: string;
}

export function parseConfig(configPath: string): ConfigObject {
  const content = fs.readFileSync(configPath, "utf8");
  const config: ConfigObject = {};

  for (const line of content.split("\n")) {
    const trimmed = line.trim();
    if (trimmed === "" || trimmed.startsWith("--")) continue;

    const match = trimmed.match(/^const\s+([\w.-]+)\s+be\s+(.+)$/);
    if (!match) continue;

    const key = match[1];
    let value: ConfigValue = match[2].trim();

    if (value.startsWith("///") && value.endsWith("///")) {
      value = value.slice(3, -3);
    } else if (value === "true") {
      value = true;
    } else if (value === "false") {
      value = false;
    } else if (/^\d+$/.test(value)) {
      value = parseInt(value, 10);
    } else if (/^\d+\.\d+$/.test(value)) {
      value = parseFloat(value);
    }

    const keys = key.split(".");
    let target = config;
    for (let i = 0; i < keys.length - 1; i++) {
      if (!target[keys[i]] || typeof target[keys[i]] !== "object") {
        target[keys[i]] = {};
      }
      target = target[keys[i]] as ConfigObject;
    }
    target[keys[keys.length - 1]] = value;
  }

  return config;
}

export function findConfig(startDir?: string): string | null {
  let dir = startDir || process.cwd();
  for (;;) {
    const configPath = path.join(dir, "config.purus");
    if (fs.existsSync(configPath)) return configPath;
    const parent = path.dirname(dir);
    if (parent === dir) return null;
    dir = parent;
  }
}

export function loadConfig(startDir?: string): LoadedConfig | null {
  const configPath = findConfig(startDir);
  if (!configPath) return null;
  return {
    config: parseConfig(configPath),
    configPath,
    configDir: path.dirname(configPath),
  };
}
