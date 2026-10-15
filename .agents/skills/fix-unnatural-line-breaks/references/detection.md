# Detection criteria

An "unnatural line break" is a newline that isn't at a meaningful boundary (paragraph, list item, heading, code block) but was inserted purely because a line reached some column width.

## Common signals

Treat a line-ending break as suspicious when any of the following hold.

- The line ends on something other than sentence-final punctuation (`。` `」` `』` `.` `!` `?` `！` `？`) or a closing bracket.
- The line ends on a Japanese particle (`は` `が` `を` `に` `で` `と` `も` `の`, etc.).
- The line ends on a conjunction or preposition in English (`and` `or` `but` `of` `to` `with` `in`, etc.).
- The next line starts with a lowercase English letter, or with hiragana/kanji, without introducing a new sentence or a new list item.
- Looking at the whole file (or a whole paragraph), nearly every line wraps at roughly the same column (e.g. 72–80 characters) — a clear sign of mechanical, tool-driven wrapping.

## Japanese-specific cues

Japanese has no spaces between words, so unnatural breaks are visually less obvious than in English. Watch especially for breaks at these positions.

- Right after a `、` (a line ending in the reading-pause comma is a near-certain break — that comma exists precisely because the sentence keeps going) and right before one (so the next line starts with `、`).
- Right after or right before a single-character particle left stranded at the end or start of a line — for example, a line ending in `これは` with the next line continuing `便利です`. This extends past the single-particle case: continuing conjunctions like `だけ` `とも` `ため` `のみ` `ほど` `くらい`/`ぐらい` `など` `って` `たり` `ながら` `つつ` `やら` `し` are just as strong a signal.
- In the middle of a compound predicate or auxiliary verb — for example, a line ending in `〜することが` with the next line continuing `できます`.
- Right after an opening bracket (`「` or `(`) or right before a closing one (`」` or `)`).
- In a code comment, a next line that opens with a JSDoc-style inline tag (`{@link ...}`, `{@see ...}`, etc.) — that's continuing the previous line by construction, no matter how the previous line ends.

## English-specific cues

- A word split mid-way by automatic hyphenation (word-wrap-driven hyphen insertion).
- A break in the middle of a prepositional phrase or relative clause — e.g. splitting `the file that\nwas created`.
- A Markdown link split across lines so that `[text]` and `(url)` end up on different lines.

## Watch out for false positives

The following are fine as-is and should not be "fixed."

- Anything inside a fenced code block (delimited by \`\`\`).
- Markdown table rows.
- The line break between one list item and the next — that's a meaningful boundary.
- The line breaks immediately before/after a heading (`#`).
- An intentional Markdown line break: two trailing spaces, or an explicit `<br>`.
- A long URL or a standalone code line.
- Poetry, code samples, or quotations where the line break itself carries meaning.
- Structured config such as CI workflow YAML, JSON, or shell scripts embedded in a YAML block scalar (`key: |`). Nearly every line there is either a `key: value` pair or executable script, not prose, and `scripts/lint.mjs` has no real YAML parser to tell the difference reliably — treat such files as out of scope entirely rather than trying to lint them.
- A shebang line (`#!/usr/bin/env node`). It matches a `#` comment prefix but isn't prose, and shouldn't be paired with the real comment line after it.

## The lint script doesn't catch everything

`scripts/lint.mjs` only flags a line ending in `、`, on a tracked particle/word, on an inline-tag continuation, a bare comment marker used as a separator, or a break with no sentence-final punctuation before a lowercase/hiragana/kanji continuation. Real unnatural breaks fall outside those rules all the time — for example, a Japanese line that ends on a noun rather than a particle but is still mid-clause, with no comma to catch it either. Running the script narrows down where to look; it does not replace reading the file. Always walk every paragraph and comment block by eye using the criteria above, including the parts the script left unflagged.

## Where to look, by file type

### Markdown documentation

Treat each paragraph (a block separated by blank lines) as a unit, then list every internal line break inside it. When a "paragraph" spans multiple lines, figure out whether each break is a meaningful boundary (the paragraph might actually be a collection of separate list-like items) or just mechanical wrapping.

### Code comments and docstrings

Treat a run of consecutive comment lines (`//`, `/* */`, `#`, `"""`, etc.) as one block. If a single sentence (a unit ending in a period or `。`) spans more than one comment line, that's a strong signal of an unnatural break.

Also watch for a bare comment marker (`//`, `*`, or `#` with nothing else on the line) sitting between two lines of real comment text. That's not how people actually write comments by hand — a genuine paragraph separator inside a comment block is either an unmarked blank line (no marker at all) or no separator at all, never an empty marker-only line.
