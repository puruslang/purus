# How to fix it

## Basic operation: join the lines

Once you find an unnatural break, remove the newline and merge the two lines into one. For Japanese, just delete the newline — no space is needed between the joined text. For English, replace the newline with a single space so the words don't run together.

```
# Before (Japanese, mechanically wrapped)
石炭をば早や積み果てつ。中等室の卓のほとりはいと静かにて、
熾熱灯の光の晴れがましきも徒なり。今宵は夜ごとにここに
集ひ来る骨牌仲間もホテルに宿りて、船に残れるは余一人のみなれば。

# After
石炭をば早や積み果てつ。中等室の卓のほとりはいと静かにて、熾熱灯の光の晴れがましきも徒なり。今宵は夜ごとにここに集ひ来る骨牌仲間もホテルに宿りて、船に残れるは余一人のみなれば。
```

```
# Before (English)
It is a truth universally acknowledged, that a single
man in possession of a good fortune, must be in want
of a wife.

# After
It is a truth universally acknowledged, that a single man in possession of a good fortune, must be in want of a wife.
```

## Work paragraph by paragraph

When a paragraph has several unnatural breaks, join the whole paragraph into one line first, then re-check for any boundary that should actually be kept. Fixing line-by-line in isolation can leave inconsistencies with the next line you haven't looked at yet, so treat each paragraph as one unit of work.

## Decide which breaks to keep before you start joining

Before merging anything, decide that the following breaks are off-limits.

- Blank lines (paragraph boundaries).
- The line breaks immediately before and after a heading.
- The line break between one list item and the next.
- Any line break inside a fenced code block (\`\`\`).
- Any line break inside a table row.
- An explicit Markdown line break (two trailing spaces, a trailing backslash, or `<br>`).

Only join line breaks that don't fall into one of these categories.

## When a single list item is long

If one bullet's description is long and has been wrapped across multiple lines, merge the whole item back into one line. It's fine to split the item into multiple sentences if that helps clarity, but don't then wrap those sentences again.

```
# Before
- この関数は与えられた配列をシャッフルする。
  内部的にはFisher-Yatesアルゴリズムを使って
  おり、引数の配列自体は書き換えない。

# After
- この関数は与えられた配列をシャッフルする。内部的にはFisher-Yatesアルゴリズムを使っており、引数の配列自体は書き換えない。
```

## Code comments and docstrings

Keep the comment syntax (`//`, `#`, `*`, etc.) intact and only merge the text content. When one sentence spans several `//` lines, collapse it into a single `//` line. If the comment intentionally separates paragraphs, keep that separation and merge within each paragraph — but the separator itself should be an unmarked blank line (no `//`/`#`/`*`) or no separator at all, never a bare comment marker with nothing after it. A lone `//`/`*`/`#` line isn't something people actually write by hand; if you find one acting as a separator between two paragraphs, strip the marker so it becomes a real blank line (or drop it entirely if the two paragraphs read fine run together).

```ts
// Before (bare marker used as a separator — nobody writes this by hand)
// First paragraph of the comment.
//
// Second paragraph of the comment.

// After
// First paragraph of the comment.

// Second paragraph of the comment.
```

```ts
// Before
// この関数は青空文庫形式のテキストを受け取り、ルビ記法や
// 注記記法を取り除いた上で、段落ごとに分割した配列を
// 返す。

// After
// この関数は青空文庫形式のテキストを受け取り、ルビ記法や注記記法を取り除いた上で、段落ごとに分割した配列を返す。
```

For JSDoc/docstrings with tags like `@param` or `@returns`, keep each tag on its own line as a structural boundary, and only merge the description text within a single tag.

```ts
/**
 * Before
 * @param text 変換対象の青空文庫形式テキスト。ルビ記法
 *   (｜文字《ルビ》)を含んでいてもよい。
 */

/**
 * After
 * @param text 変換対象の青空文庫形式テキスト。ルビ記法(｜文字《ルビ》)を含んでいてもよい。
 */
```

## After you fix it

- Re-read the merged text to confirm the meaning and nuance haven't shifted.
- A resulting line that's now very long is not a sign of failure — let the display's soft-wrap handle it.
- If a diff would otherwise balloon in size (a one-character fix turning into a full paragraph reflow), either explain why in the commit/PR description, or avoid bundling it with an unrelated change.
