# @puruslang/mcp

[MCP](https://modelcontextprotocol.io) server for [Purus](https://purus.work) (stdio).

Tools: `compile`, `check`, `lint`, `format`, and `run`. `run` is **disabled by default**: set `PURUS_MCP_ALLOW_RUN=1` to enable it (code runs in a child Node process with a 5 s timeout and a 64 KB output cap, but it is not sandboxed). Resource: `purus://stdlib`.

Claude Code `.mcp.json`:

```json
{ "mcpServers": { "purus": { "command": "npx", "args": ["-y", "@puruslang/mcp"] } } }
```

Written from scratch for this project.
