# Before/after examples

## README / documentation (Japanese)

```
# Before
吾輩は猫である。名前はまだ無い。どこで生れたかとんと
見当がつかぬ。何でも薄暗いじめじめした所でニャーニャー
泣いていた事だけは記憶している。

## 出典について
本文は夏目漱石『吾輩は猫である』の冒頭から引用しています。
```

```
# After
吾輩は猫である。名前はまだ無い。どこで生れたかとんと見当がつかぬ。何でも薄暗いじめじめした所でニャーニャー泣いていた事だけは記憶している。

## 出典について

本文は夏目漱石『吾輩は猫である』の冒頭から引用しています。
```

Line breaks inside a paragraph get merged, but the blank line between a heading and the body text stays (and should be added if it was missing).

## README / documentation (English)

```
# Before
Call me Ishmael. Some years ago—never mind how long
precisely—having little or no money in my purse, and
nothing particular to interest me on shore, I thought
I would sail about a little and see the watery part
of the world.
```

```
# After
Call me Ishmael. Some years ago—never mind how long precisely—having little or no money in my purse, and nothing particular to interest me on shore, I thought I would sail about a little and see the watery part of the world.
```

## Bullet lists

```
# Before (an item's description is wrapped)
- 『吾輩は猫である』: 夏目漱石が1905年から発表した長編小説。
  猫の視点から人間社会を風刺的に描いている。
- 『舞姫』: 森鴎外がドイツ留学の経験をもとに書いた短編小説。
```

```
# After
- 『吾輩は猫である』: 夏目漱石が1905年から発表した長編小説。猫の視点から人間社会を風刺的に描いている。
- 『舞姫』: 森鴎外がドイツ留学の経験をもとに書いた短編小説。
```

## What NOT to fix (intentional line breaks)

```markdown
Two trailing spaces at the end of a line  
force a line break in Markdown.
```

The above uses two trailing spaces to force an explicit line break (equivalent to `<br>`) — leave it as-is.

```markdown
| Item | Description |
| --- | --- |
| `foo` | This description is quite long, but it lives inside one table cell, so leave it alone |
```

Text inside a table cell should be left alone regardless of length, as long as it isn't split across multiple lines inside the cell itself.

## Code comments (TypeScript)

```ts
// Before
/**
 * この関数は青空文庫形式のテキストをHTMLに変換し、ルビ記法を
 * <ruby>タグに置き換える。変換前のテキストに含まれる改行は
 * 段落の区切りとしてそのまま保持され、それ以外の空白は詰めて
 * 出力される。
 */
```

```ts
// After
/**
 * この関数は青空文庫形式のテキストをHTMLに変換し、ルビ記法を<ruby>タグに置き換える。変換前のテキストに含まれる改行は段落の区切りとしてそのまま保持され、それ以外の空白は詰めて出力される。
 */
```

## Code comments (Python docstring)

```python
# Before
def shuffle(items):
    """Shuffle the given list using the Fisher-Yates
    algorithm. The input list is not mutated; a new
    list is returned instead.
    """
```

```python
# After
def shuffle(items):
    """Shuffle the given list using the Fisher-Yates algorithm. The input list is not mutated; a new list is returned instead."""
```

If a docstring is too long to fit in a single readable line, it's fine to break it sentence-by-sentence, as long as no single sentence spans more than one line.

```python
def shuffle(items):
    """Shuffle the given list using the Fisher-Yates algorithm.

    The input list is not mutated; a new list is returned instead.
    """
```
