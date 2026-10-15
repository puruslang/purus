"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatDocument = formatDocument;
const node_1 = require("vscode-languageserver/node");
// eslint-disable-next-line @typescript-eslint/no-var-requires
const purusPlugin = require("@puruslang/prettier-plugin-purus");
async function formatDocument(document) {
    const source = document.getText();
    // Dynamic import for prettier (ESM)
    const prettier = await Promise.resolve().then(() => __importStar(require("prettier")));
    const formatted = await prettier.format(source, {
        parser: "purus",
        plugins: [purusPlugin],
    });
    // Replace entire document
    const lastLine = document.lineCount - 1;
    const lastChar = document.getText(node_1.Range.create(node_1.Position.create(lastLine, 0), node_1.Position.create(lastLine + 1, 0))).length;
    return [
        node_1.TextEdit.replace(node_1.Range.create(node_1.Position.create(0, 0), node_1.Position.create(lastLine, lastChar)), formatted),
    ];
}
//# sourceMappingURL=format.js.map