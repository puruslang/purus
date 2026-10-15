#!/usr/bin/env node
/**
 * Detects line breaks that look like they were mechanically wrapped mid-sentence, in Markdown documentation or code comments. Plain Node.js, no dependencies.

 * Usage:
 *   node scripts/lint.mjs <file> [<file> ...]
 *   node scripts/lint.mjs --json <file>

 * This is a lint, not a gate: it always exits 0 regardless of how many findings it reports. It only exits 1 when an input file can't be read.
 * A finding is a suggestion, not a verdict — deciding whether to fix it is left to the human or the AI reading the output.
 */

import { readFileSync } from "node:fs";

// A line ending in one of these characters is considered "sentence-complete" and is never flagged.
const SENTENCE_END_CHARS = "。」』.!?！？:;：；」)]}>*`";

// A line ending in one of these single Japanese particles/conjunctions is a strong signal that the sentence was cut off mid-way.
const JP_TRAILING_PARTICLES = [
  "は", "が", "を", "に", "で", "と", "も", "の", "へ", "や", "な", "な、",
  "から", "まで", "より", "ので", "けど", "けれど", "しかし", "ただし",
  "だけ", "とも", "ため", "のみ", "ほど", "くらい", "ぐらい", "など",
  "って", "たり", "ながら", "つつ", "やら", "し",
];

// A line ending in one of these English words (preposition/conjunction/article/etc.) is treated the same way.
const EN_TRAILING_WORDS = new Set([
  "a", "an", "the", "and", "or", "but", "of", "to", "with", "in", "on",
  "at", "for", "that", "which", "who", "as", "is", "are", "was", "were",
  "be", "been", "this", "these", "those", "it", "its", "not",
]);

// Allows an optional comment prefix before the fence, so an example block nested inside a /** */ or # comment (e.g. " * ```ts") is recognized too — otherwise its contents (real code, not prose) get scanned as if they were comment text.
const CODE_FENCE_RE = /^\s*(?:\/\/|#|\*|\/\/\/|;;)?\s*```/;
const TABLE_ROW_RE = /^\s*\|.*\|\s*$/;
const LIST_ITEM_RE = /^\s*([-*+]|\d+[.)])\s+/;
const HEADING_RE = /^\s*#{1,6}\s+/;
const COMMENT_PREFIX_RE = /^\s*(\/\/|#|\*|\/\/\/|;;)\s?/;
const BLOCKQUOTE_RE = /^\s*>/;
const SHEBANG_RE = /^#!/;
// A JSDoc-style inline tag ({@link ...}, {@see ...}, {@linkcode ...}, etc.): a next line opening with one is continuing the previous line by construction, regardless of how the previous line ends.
const INLINE_TAG_RE = /^\{@\w+/;

// A YAML mapping key ("name: ...", "- type: markdown", "attributes:"). Used to skip structural lines in .yml/.yaml files so they aren't mistaken for wrapped prose; this deliberately does not try to parse block scalars (`key: |`) since that requires tracking indentation, so genuinely wrapped prose inside a block scalar can still slip through undetected.
const YAML_KEY_RE = /^\s*(-\s+)?[A-Za-z0-9_.-]+:(\s|$)/;
const YAML_EXTENSIONS = [".yml", ".yaml"];
const MARKDOWN_EXTENSIONS = [".md", ".markdown", ".mdx"];

function isIntentionalBreak(line) {
  const trimmed = line.replace(/\n$/, "");
  return trimmed.endsWith("  ") || trimmed.endsWith("\\");
}

function stripCommentPrefix(line) {
  return line.replace(COMMENT_PREFIX_RE, "");
}

function lastWord(text) {
  const words = text.match(/[A-Za-z']+/g);
  return words ? words[words.length - 1].toLowerCase() : "";
}

function endsWithSentenceEndChar(text) {
  return text.length > 0 && SENTENCE_END_CHARS.includes(text[text.length - 1]);
}

/** Returns a reason string if this looks like a suspicious break, otherwise null. */
function looksLikeMidSentenceBreak(current, nxt, isMarkdown) {
  const stripped = current.replace(/\s+$/, "");
  if (!stripped) return null;
  if (isIntentionalBreak(current)) return null;
  if (endsWithSentenceEndChar(stripped)) return null;

  const nextStripped = nxt.trim();
  if (!nextStripped) return null; // next line is blank -> paragraph boundary
  // These are Markdown structural markers, not meaningful outside Markdown:
  // in a #-comment language a "# " continuation line would itself match
  // HEADING_RE, and in a /** */ block a " * " continuation line would match
  // LIST_ITEM_RE, silently suppressing every real finding in that file.
  if (
    isMarkdown &&
    (LIST_ITEM_RE.test(nxt) || HEADING_RE.test(nxt) || BLOCKQUOTE_RE.test(nxt))
  ) {
    return null; // next line starts a new structural element
  }

  const body = stripCommentPrefix(stripped);

  // A line ending in the reading-pause comma is a near-certain break — that's what "、" is for.
  if (body.endsWith("、")) {
    return 'line ends with the reading-pause comma "、"';
  }

  for (const particle of JP_TRAILING_PARTICLES) {
    if (body.endsWith(particle)) {
      return `line ends with the particle/conjunction "${particle}"`;
    }
  }

  const word = lastWord(body);
  if (EN_TRAILING_WORDS.has(word)) {
    return `line ends with the conjunction/preposition/article "${word}"`;
  }

  // For non-Markdown files, nextStripped still carries its own comment prefix ("// ", "* ", "# ", ...) — strip it too, or the continuation checks below compare against the prefix character instead of the real text and never fire.
  const nextBody = isMarkdown
    ? nextStripped
    : stripCommentPrefix(nextStripped);

  if (INLINE_TAG_RE.test(nextBody)) {
    return "next line continues with an inline tag (e.g. {@link ...})";
  }

  // English line with no terminal punctuation, continuing into a lowercase-initial next line: likely a mechanical wrap.
  if (/[A-Za-z]/.test(body) && /^[a-z]/.test(nextBody)) {
    return "no terminal punctuation, and the next line continues in lowercase (English)";
  }

  // Japanese line with no terminal punctuation and no trailing particle, continuing into a line starting with hiragana/kanji: likely a mechanical wrap.
  if (
    /[぀-んァ-ヶ一-龠]/.test(body) &&
    /^[぀-んァ-ヶ一-龠]/.test(nextBody)
  ) {
    return "no terminal punctuation, and the next line continues (Japanese)";
  }

  return null;
}

/**
 * If the file opens with a `---` YAML frontmatter block, returns the index of its closing `---` line; otherwise returns -1. Frontmatter is key: value data, not prose, so it's excluded from scanning.
 */
function frontmatterEndIndex(lines) {
  if (lines.length === 0 || lines[0].replace(/\s+$/, "") !== "---") return -1;
  for (let i = 1; i < lines.length; i++) {
    if (lines[i].replace(/\s+$/, "") === "---") return i;
  }
  return -1;
}

function isCommentLine(line) {
  // A shebang matches COMMENT_PREFIX_RE (bare "#") but isn't prose, and pairing its tail with a real comment line produces false positives.
  if (SHEBANG_RE.test(line)) return false;
  return COMMENT_PREFIX_RE.test(line);
}

// A comment line that carries only the marker itself, no text — "//", "*", "#" with nothing (or just whitespace) after it.
function isEmptyCommentMarkerLine(line) {
  return isCommentLine(line) && stripCommentPrefix(line).trim() === "";
}

// A comment line with real text content, as opposed to an empty marker line or a non-comment line.
function isNonEmptyCommentLine(line) {
  return isCommentLine(line) && stripCommentPrefix(line).trim() !== "";
}

function hasExtension(path, extensions) {
  const lower = path.toLowerCase();
  return extensions.some((ext) => lower.endsWith(ext));
}

function scanFile(path) {
  const content = readFileSync(path, "utf-8");
  const lines = content.split(/\r\n|\n|\r/);

  const findings = [];
  let inCodeFence = false;
  const frontmatterEnd = frontmatterEndIndex(lines);
  const isYamlFile = hasExtension(path, YAML_EXTENSIONS);
  const isMarkdown = hasExtension(path, MARKDOWN_EXTENSIONS);

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    if (i <= frontmatterEnd) continue;
    if (isYamlFile && YAML_KEY_RE.test(line)) continue;
    if (CODE_FENCE_RE.test(line)) {
      inCodeFence = !inCodeFence;
      continue;
    }
    if (inCodeFence) continue;
    if (TABLE_ROW_RE.test(line)) continue;

    // A bare comment marker between two real comment lines is being used as a paragraph separator, but that's not how comments actually get written by hand — real code uses either an unmarked blank line or no separator at all (issue #2).
    if (
      !isMarkdown &&
      isEmptyCommentMarkerLine(line) &&
      i > 0 &&
      i + 1 < lines.length &&
      isNonEmptyCommentLine(lines[i - 1]) &&
      isNonEmptyCommentLine(lines[i + 1])
    ) {
      findings.push({
        file: path,
        line: i + 1,
        reason:
          "bare comment marker used as a paragraph separator — use an unmarked blank line or no separator at all",
        snippet: line.trim(),
        next_snippet: lines[i + 1].trim(),
      });
    }

    // In a non-Markdown source file, only comment lines are prose; actual code is never a candidate (it isn't sentences at all, and comparing code line N to code line N+1 produces constant false positives).
    if (!isMarkdown && !isCommentLine(line)) continue;
    if (i + 1 >= lines.length) continue;

    const nxt = lines[i + 1];
    // Likewise, don't compare a comment line to a following line of actual code — that's the end of the comment block, not a mid-sentence continuation.
    if (!isMarkdown && !isCommentLine(nxt)) continue;

    const reason = looksLikeMidSentenceBreak(line, nxt, isMarkdown);
    if (reason) {
      findings.push({
        file: path,
        line: i + 1,
        reason,
        snippet: line.trim(),
        next_snippet: nxt.trim(),
      });
    }
  }

  return findings;
}

function main() {
  const args = process.argv.slice(2);
  const asJson = args.includes("--json");
  const files = args.filter((a) => a !== "--json");

  if (files.length === 0) {
    console.error("usage: lint.mjs [--json] <file> [<file> ...]");
    return 1;
  }

  const allFindings = [];
  for (const path of files) {
    try {
      allFindings.push(...scanFile(path));
    } catch (e) {
      console.error(`error: ${path}: ${e.message}`);
      return 1;
    }
  }

  if (asJson) {
    console.log(JSON.stringify(allFindings, null, 2));
  } else {
    if (allFindings.length === 0) {
      console.log("No suspicious line breaks found.");
    }
    for (const f of allFindings) {
      console.log(`${f.file}:${f.line}: ${f.reason}`);
      console.log(`    > ${f.snippet}`);
      console.log(`    > ${f.next_snippet}`);
    }
  }

  return 0;
}

process.exitCode = main();
