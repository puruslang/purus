Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
//#region src/index.ts
const KEYWORDS = /* @__PURE__ */ new Set([
	"const",
	"let",
	"var",
	"be",
	"fn",
	"async",
	"return",
	"to",
	"gives",
	"if",
	"elif",
	"else",
	"unless",
	"then",
	"while",
	"until",
	"do",
	"for",
	"in",
	"range",
	"match",
	"when",
	"switch",
	"case",
	"try",
	"catch",
	"finally",
	"throw",
	"import",
	"from",
	"export",
	"default",
	"require",
	"use",
	"namespace",
	"public",
	"all",
	"with",
	"add",
	"sub",
	"mul",
	"div",
	"fdiv",
	"mod",
	"neg",
	"pow",
	"eq",
	"neq",
	"lt",
	"gt",
	"le",
	"ge",
	"and",
	"or",
	"not",
	"pipe",
	"coal",
	"band",
	"bor",
	"bxor",
	"bnot",
	"shl",
	"shr",
	"ushr",
	"as",
	"of",
	"typeof",
	"instanceof",
	"type",
	"new",
	"delete",
	"this",
	"await",
	"yield",
	"void",
	"class",
	"extends",
	"super",
	"static",
	"private",
	"protected",
	"get",
	"set",
	"true",
	"false",
	"null",
	"nil",
	"undefined",
	"nan",
	"infinity",
	"break",
	"continue",
	"list",
	"object",
	"function",
	"blank"
]);
function tokenize(source) {
	const tokens = [];
	let i = 0;
	const len = source.length;
	while (i < len) {
		if (i === 0 && source[i] === "#" && source[i + 1] === "!") {
			let end = source.indexOf("\n", i);
			if (end === -1) end = len;
			tokens.push({
				type: "shebang",
				value: source.slice(i, end)
			});
			i = end;
			continue;
		}
		if (source[i] === "\n") {
			tokens.push({
				type: "newline",
				value: "\n"
			});
			i++;
			continue;
		}
		if (source[i] === "\r") {
			i++;
			continue;
		}
		if (source[i] === " " || source[i] === "	") {
			const start = i;
			while (i < len && (source[i] === " " || source[i] === "	")) i++;
			tokens.push({
				type: "whitespace",
				value: source.slice(start, i)
			});
			continue;
		}
		if (source[i] === "-" && source[i + 1] === "-" && source[i + 2] === "-") {
			let end = source.indexOf("---", i + 3);
			if (end === -1) end = len;
			else end += 3;
			tokens.push({
				type: "block-comment",
				value: source.slice(i, end)
			});
			i = end;
			continue;
		}
		if (source[i] === "-" && source[i + 1] === "-") {
			let end = source.indexOf("\n", i);
			if (end === -1) end = len;
			tokens.push({
				type: "comment",
				value: source.slice(i, end)
			});
			i = end;
			continue;
		}
		if (source[i] === "/" && source[i + 1] === "/" && source[i + 2] === "/") {
			let j = i + 3;
			while (j < len) {
				if (source[j] === "\\" && j + 1 < len) {
					j += 2;
					continue;
				}
				if (source[j] === "/" && source[j + 1] === "/" && source[j + 2] === "/") {
					j += 3;
					break;
				}
				j++;
			}
			tokens.push({
				type: "string",
				value: source.slice(i, j)
			});
			i = j;
			continue;
		}
		if (source[i] === "/" && source[i + 1] === "/" && source[i + 2] === ";") {
			let j = i + 3;
			while (j < len) {
				if (source[j] === "\\" && j + 1 < len) {
					j += 2;
					continue;
				}
				if (source[j] === ";" && source[j + 1] === "/" && source[j + 2] === "/") {
					j += 3;
					break;
				}
				j++;
			}
			tokens.push({
				type: "string",
				value: source.slice(i, j)
			});
			i = j;
			continue;
		}
		if ("[],;".includes(source[i])) {
			tokens.push({
				type: "punct",
				value: source[i]
			});
			i++;
			continue;
		}
		if (source[i] === "\\" && source[i + 1] === ".") {
			tokens.push({
				type: "punct",
				value: "\\."
			});
			i += 2;
			continue;
		}
		if (source[i] === "\\") {
			tokens.push({
				type: "punct",
				value: "\\"
			});
			i++;
			continue;
		}
		if (source[i] === ".") {
			tokens.push({
				type: "punct",
				value: source[i]
			});
			i++;
			continue;
		}
		if (/[a-zA-Z_]/.test(source[i])) {
			const start = i;
			while (i < len && /[a-zA-Z0-9_-]/.test(source[i])) i++;
			const word = source.slice(start, i);
			tokens.push({
				type: KEYWORDS.has(word) ? "keyword" : "ident",
				value: word
			});
			continue;
		}
		if (/[0-9]/.test(source[i])) {
			const start = i;
			if (source[i] === "0" && i + 1 < len && (source[i + 1] === "b" || source[i + 1] === "B")) {
				i += 2;
				while (i < len && /[01]/.test(source[i])) i++;
			} else if (source[i] === "0" && i + 1 < len && (source[i + 1] === "x" || source[i + 1] === "X")) {
				i += 2;
				while (i < len && /[0-9a-fA-F]/.test(source[i])) i++;
			} else {
				while (i < len && /[0-9]/.test(source[i])) i++;
				if (i < len && source[i] === "." && i + 1 < len && /[0-9]/.test(source[i + 1])) {
					i++;
					while (i < len && /[0-9]/.test(source[i])) i++;
				}
			}
			if (i < len && source[i] === "n" && (i + 1 >= len || !/[a-zA-Z0-9_]/.test(source[i + 1]))) i++;
			tokens.push({
				type: "number",
				value: source.slice(start, i)
			});
			continue;
		}
		if (source[i] === "/" && source[i + 1] !== "/") {
			let j = i + 1;
			while (j < len && source[j] !== "/" && source[j] !== "\n") {
				if (source[j] === "\\") j++;
				j++;
			}
			if (j < len && source[j] === "/") {
				j++;
				while (j < len && /[gimsuy]/.test(source[j])) j++;
				tokens.push({
					type: "regex",
					value: source.slice(i, j)
				});
				i = j;
				continue;
			}
		}
		tokens.push({
			type: "other",
			value: source[i]
		});
		i++;
	}
	return tokens;
}
function parseLinesFromTokens(tokens) {
	const lines = [];
	let current = [];
	for (const tok of tokens) if (tok.type === "newline") {
		lines.push(current);
		current = [];
	} else current.push(tok);
	if (current.length > 0) lines.push(current);
	return lines;
}
function getLineIndent(lineTokens) {
	if (lineTokens.length === 0) return 0;
	if (lineTokens[0].type === "whitespace") {
		let count = 0;
		for (const ch of lineTokens[0].value) count += ch === "	" ? 2 : 1;
		return count;
	}
	return 0;
}
function isEmptyLine(lineTokens) {
	return lineTokens.every((t) => t.type === "whitespace");
}
/**
* Returns "postfix", "prefix", or null for the backslash token at content[ti].
* Postfix: (ident | ] | number) \ (add|sub keyword)  → x\add, x\sub
* Prefix:  (add|sub keyword) \ ident                 → add\x, sub\x
*/
function isIncrDecrSlash(content, ti) {
	if (content[ti].value !== "\\") return null;
	let ni = ti + 1;
	while (ni < content.length && content[ni].type === "whitespace") ni++;
	let pi = ti - 1;
	while (pi >= 0 && content[pi].type === "whitespace") pi--;
	const nextTok = ni < content.length ? content[ni] : null;
	const prevTok = pi >= 0 ? content[pi] : null;
	if (nextTok && nextTok.type === "keyword" && (nextTok.value === "add" || nextTok.value === "sub")) {
		if (prevTok && (prevTok.type === "ident" || prevTok.value === "]" || prevTok.type === "number")) return "postfix";
	}
	if (prevTok && prevTok.type === "keyword" && (prevTok.value === "add" || prevTok.value === "sub")) {
		if (nextTok && nextTok.type === "ident") return "prefix";
	}
	return null;
}
function formatPurus(source, options = {}) {
	const indent = options.tabWidth || 2;
	const indentStr = options.useTabs || false ? "	" : " ".repeat(indent);
	const lines = parseLinesFromTokens(tokenize(source));
	const result = [];
	for (let li = 0; li < lines.length; li++) {
		const line = lines[li];
		if (isEmptyLine(line)) {
			result.push("");
			continue;
		}
		const origIndent = getLineIndent(line);
		const indentLevel = Math.round(origIndent / indent);
		let startIdx = 0;
		while (startIdx < line.length && line[startIdx].type === "whitespace") startIdx++;
		const content = line.slice(startIdx);
		if (content.length === 0) {
			result.push("");
			continue;
		}
		const prefix = indentStr.repeat(indentLevel);
		let lineStr = "";
		for (let ti = 0; ti < content.length; ti++) {
			const tok = content[ti];
			if (tok.type === "whitespace") {
				const next = content[ti + 1];
				const prevChar = lineStr.length > 0 ? lineStr[lineStr.length - 1] : "";
				const nextIsIncrDecrSlash = next && next.value === "\\" && isIncrDecrSlash(content, ti + 1) !== null;
				let spaceIdx = ti - 1;
				while (spaceIdx >= 0 && content[spaceIdx].type === "whitespace") spaceIdx--;
				const prevIsIncrDecrSlash = spaceIdx >= 0 && content[spaceIdx].value === "\\" && isIncrDecrSlash(content, spaceIdx) !== null;
				if (lineStr.length > 0 && next && next.value !== "]" && next.value !== "[" && prevChar !== "[" && !nextIsIncrDecrSlash && !prevIsIncrDecrSlash) lineStr += " ";
			} else {
				if (ti > 0 && content[ti - 1].type !== "whitespace" && lineStr.length > 0) {
					const prev = lineStr[lineStr.length - 1];
					let suppressSpace = false;
					if (tok.value === "." || prev === ".") suppressSpace = true;
					else if (tok.value === "," || tok.value === ";") suppressSpace = true;
					else if (tok.value === "[" || tok.value === "]" || prev === "[") suppressSpace = true;
					else if (tok.value === "\\" && isIncrDecrSlash(content, ti) !== null) suppressSpace = true;
					else {
						let pi = ti - 1;
						while (pi >= 0 && content[pi].type === "whitespace") pi--;
						if (pi >= 0 && content[pi].value === "\\" && isIncrDecrSlash(content, pi) !== null) suppressSpace = true;
					}
					if (!suppressSpace) lineStr += " ";
				}
				lineStr += tok.value;
			}
		}
		lineStr = lineStr.replace(/(\/\/;.*?;\/\/|\/\/\/[\s\S]*?\/\/\/)|([,;])(?!\s)/g, (m, str, sep) => {
			if (str) return str;
			return sep + " ";
		});
		lineStr = lineStr.trimEnd();
		result.push(prefix + lineStr);
	}
	let output = result.join("\n");
	if (!output.endsWith("\n")) output += "\n";
	return output;
}
const languages = [{
	name: "Purus",
	parsers: ["purus"],
	extensions: [
		".purus",
		".cpurus",
		".mpurus"
	],
	vscodeLanguageIds: ["purus"]
}];
const parsers = { purus: {
	parse(text) {
		return {
			type: "purus-root",
			body: text
		};
	},
	astFormat: "purus-ast",
	locStart: () => 0,
	locEnd: (node) => node.body ? node.body.length : 0
} };
const printers = { "purus-ast": { print(path, options) {
	const node = path.node;
	return formatPurus(node.body, {
		tabWidth: options.tabWidth,
		useTabs: options.useTabs
	});
} } };
//#endregion
exports.formatPurus = formatPurus;
exports.languages = languages;
exports.parsers = parsers;
exports.printers = printers;
