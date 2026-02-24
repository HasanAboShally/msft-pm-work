# Fabric MCP App — Workspace Refresh Card

An interactive MCP App that renders a **Fabric-styled dashboard** inside your AI chat (Claude, VS Code Copilot, ChatGPT) for monitoring and managing dataset refreshes in Microsoft Fabric workspaces.

Built with [MCP Apps Extension](https://github.com/modelcontextprotocol/ext-apps) (SEP-1865).

![Fabric Refresh Card](https://img.shields.io/badge/MCP_App-Fabric_UI-117865?style=for-the-badge)

## What It Does

| Feature | Description |
|---------|-------------|
| 🏢 **Workspace picker** | Select from your accessible Fabric workspaces |
| 📊 **Refresh dashboard** | Summary cards showing succeeded/failed/in-progress counts |
| 📋 **Dataset table** | All refreshable semantic models with status badges |
| 📜 **Refresh history** | Click any dataset to expand its refresh timeline |
| ▶️ **Trigger refresh** | One-click refresh for individual datasets or all at once |
| 🔔 **Toast notifications** | Real-time feedback on actions |
| 🧠 **Context updates** | Actions are reported back to the LLM for conversational continuity |

## Prerequisites

- **Node.js** 20+
- **npm** 10+
- A **Fabric/Power BI bearer token** (see [Get a token](https://learn.microsoft.com/en-us/rest/api/fabric/articles/get-started/fabric-api-quickstart))

## Quick Start

```bash
# 1. Install dependencies
npm install

# 2. Build the app
npm run build

# 3. Set your Fabric token
export FABRIC_TOKEN="eyJ0eXAi..."

# 4. Run locally via stdio
npm run start:stdio
```

## MCP Client Configuration

### Claude Desktop / Claude.ai
Add to `claude_desktop_config.json`:
```json
{
  "mcpServers": {
    "fabric-refresh": {
      "command": "node",
      "args": ["dist/main.js", "--stdio"],
      "cwd": "/path/to/fabric-mcp-app",
      "env": {
        "FABRIC_TOKEN": "eyJ0eXAi..."
      }
    }
  }
}
```

### VS Code (Copilot)
Add to `.vscode/mcp.json`:
```json
{
  "servers": {
    "fabric-refresh": {
      "command": "node",
      "args": ["dist/main.js", "--stdio"],
      "cwd": "/path/to/fabric-mcp-app",
      "env": {
        "FABRIC_TOKEN": "eyJ0eXAi..."
      }
    }
  }
}
```

### HTTP Mode (for remote/shared access)
```bash
npm run start:http
# Server runs at http://localhost:3100/mcp
```

## Development

```bash
# Watch mode — auto-rebuilds on changes
npm run start
```

The dev server uses `concurrently` to run Vite in watch mode and tsx to restart the server.

## Project Structure

```
fabric-mcp-app/
├── main.ts           # Entry point — stdio & HTTP transports
├── server.ts         # MCP server — tools & resource registration
├── fabric-api.ts     # Fabric/Power BI REST API client
├── mcp-app.html      # Interactive UI app (bundled by Vite)
├── vite.config.ts    # Vite build config (single-file bundle)
├── tsconfig.json     # TypeScript config (type checking)
├── tsconfig.server.json  # TypeScript config (server compilation)
└── package.json
```

## How MCP Apps Work

```
User asks about refreshes
       ↓
LLM calls workspace_refresh_card tool
       ↓
Host fetches ui://refresh-card/mcp-app.html resource
       ↓
Host renders HTML in sandboxed iframe
       ↓
App ←→ Server bidirectional communication via MCP
       ↓
User sees Fabric-styled dashboard in chat
```

## Getting a Fabric Token

1. Go to [Fabric Portal](https://app.fabric.microsoft.com)
2. Open browser DevTools → Network tab
3. Look for any API call and copy the `Authorization: Bearer ...` header value
4. Or use Azure CLI: `az account get-access-token --resource https://analysis.windows.net/powerbi/api --query accessToken -o tsv`

## License

MIT
