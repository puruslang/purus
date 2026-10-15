import { TextEdit, Range, Position } from "vscode-languageserver/node";
import { TextDocument } from "vscode-languageserver-textdocument";

// eslint-disable-next-line @typescript-eslint/no-var-requires
const purusPlugin = require("@puruslang/prettier-plugin-purus");

export async function formatDocument(
  document: TextDocument
): Promise<TextEdit[]> {
  const source = document.getText();

  // Dynamic import for prettier (ESM)
  const prettier = await import("prettier");

  const formatted = await prettier.format(source, {
    parser: "purus",
    plugins: [purusPlugin],
  });

  // Replace entire document
  const lastLine = document.lineCount - 1;
  const lastChar = document.getText(
    Range.create(Position.create(lastLine, 0), Position.create(lastLine + 1, 0))
  ).length;

  return [
    TextEdit.replace(
      Range.create(Position.create(0, 0), Position.create(lastLine, lastChar)),
      formatted
    ),
  ];
}
