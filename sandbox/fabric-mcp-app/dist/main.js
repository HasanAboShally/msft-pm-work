/**
 * Fabric MCP App — Entry Point
 * Supports both stdio (local) and HTTP (remote) transports.
 */
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { createMcpExpressApp } from "@modelcontextprotocol/sdk/server/express.js";
import { StreamableHTTPServerTransport } from "@modelcontextprotocol/sdk/server/streamableHttp.js";
import cors from "cors";
import { createServer } from "./server.js";
async function startStdioServer() {
    const server = createServer();
    const transport = new StdioServerTransport();
    await server.connect(transport);
    console.error("[fabric-mcp-app] Server started on stdio transport");
}
async function startHttpServer() {
    const port = parseInt(process.env.PORT ?? "3100", 10);
    const app = createMcpExpressApp({ host: "0.0.0.0" });
    app.use(cors());
    app.all("/mcp", async (req, res) => {
        const server = createServer();
        const transport = new StreamableHTTPServerTransport({
            sessionIdGenerator: undefined,
        });
        res.on("close", () => {
            transport.close().catch(() => { });
            server.close().catch(() => { });
        });
        try {
            await server.connect(transport);
            await transport.handleRequest(req, res, req.body);
        }
        catch (error) {
            console.error("MCP error:", error);
            if (!res.headersSent) {
                res.status(500).json({
                    jsonrpc: "2.0",
                    error: { code: -32603, message: "Internal server error" },
                    id: null,
                });
            }
        }
    });
    const httpServer = app.listen(port, () => {
        console.error(`[fabric-mcp-app] HTTP server listening on http://localhost:${port}/mcp`);
    });
    const shutdown = () => {
        console.error("\nShutting down...");
        httpServer.close(() => process.exit(0));
    };
    process.on("SIGINT", shutdown);
    process.on("SIGTERM", shutdown);
}
async function main() {
    if (process.argv.includes("--stdio")) {
        await startStdioServer();
    }
    else {
        await startHttpServer();
    }
}
main().catch((err) => {
    console.error("Fatal error:", err);
    process.exit(1);
});
