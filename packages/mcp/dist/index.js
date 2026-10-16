#!/usr/bin/env node
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
const mcp_js_1 = require("@modelcontextprotocol/sdk/server/mcp.js");
const stdio_js_1 = require("@modelcontextprotocol/sdk/server/stdio.js");
const purus_1 = require("purus");
const zod_1 = require("zod");
const os = __importStar(require("os"));
const path = __importStar(require("path"));
const fs = __importStar(require("fs"));
const child_process_1 = require("child_process");
const server = new mcp_js_1.McpServer({ name: "purus-mcp", version: "0.1.0" });
server.registerTool("compile", {
    description: "Purus コードを JavaScript にコンパイルします",
    inputSchema: {
        code: zod_1.z.string().describe("コンパイルする Purus ソースコード"),
        strict: zod_1.z.boolean().optional().describe("strict モードを有効にする（デフォルト: true）"),
        type: zod_1.z.enum(["module", "commonjs"]).optional().describe('出力モジュール形式（デフォルト: "module"）'),
    },
}, async ({ code, strict, type }) => {
    try {
        const js = (0, purus_1.compile)(code, { header: false, strict, type });
        return { content: [{ type: "text", text: js }] };
    }
    catch (e) {
        return {
            content: [{ type: "text", text: e instanceof Error ? e.message : String(e) }],
            isError: true,
        };
    }
});
server.registerTool("check", {
    description: "Purus コードの構文チェックのみ行います（コンパイルはしません）",
    inputSchema: {
        code: zod_1.z.string().describe("チェックする Purus ソースコード"),
    },
}, async ({ code }) => {
    try {
        (0, purus_1.check)(code);
        return { content: [{ type: "text", text: "Syntax OK" }] };
    }
    catch (e) {
        return {
            content: [{ type: "text", text: e instanceof Error ? e.message : String(e) }],
            isError: true,
        };
    }
});
server.registerTool("run", {
    description: "Purus コードをコンパイルして実行し、出力を返します",
    inputSchema: {
        code: zod_1.z.string().describe("実行する Purus ソースコード"),
        timeout: zod_1.z.number().optional().describe("タイムアウト（ミリ秒）。デフォルト: 5000"),
    },
}, async ({ code, timeout: rawTimeout }) => {
    const timeout = Math.min(typeof rawTimeout === "number" ? rawTimeout : 5000, 10000);
    const tmpFile = path.join(os.tmpdir(), `purus-run-${Date.now()}.js`);
    try {
        const js = (0, purus_1.compile)(code, { header: false, type: "commonjs" });
        fs.writeFileSync(tmpFile, js, "utf-8");
        const output = (0, child_process_1.execFileSync)(process.execPath, [tmpFile], {
            encoding: "utf-8",
            stdio: ["pipe", "pipe", "pipe"],
            timeout,
        });
        return { content: [{ type: "text", text: output }] };
    }
    catch (e) {
        let message;
        if (e instanceof Error) {
            const execError = e;
            message = execError.stderr
                ? `${e.message}\n${execError.stderr}`
                : e.message;
        }
        else {
            message = String(e);
        }
        return {
            content: [{ type: "text", text: message }],
            isError: true,
        };
    }
    finally {
        try {
            fs.unlinkSync(tmpFile);
        }
        catch {
            // 無視
        }
    }
});
server.registerTool("version", {
    description: "Purus のバージョンを返します",
    inputSchema: {},
}, async () => {
    return { content: [{ type: "text", text: `purus v${purus_1.version}` }] };
});
async function main() {
    const transport = new stdio_js_1.StdioServerTransport();
    await server.connect(transport);
    console.error("purus-mcp server started");
}
main().catch((err) => {
    console.error(err);
    process.exit(1);
});
