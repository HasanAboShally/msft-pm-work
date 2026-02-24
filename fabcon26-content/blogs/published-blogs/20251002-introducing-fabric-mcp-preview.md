---
title: "Introducing Fabric MCP (Preview)"
author: "Hasan Abo Shally"
date: "2025-10-02"
url: "https://blog.fabric.microsoft.com/en-us/blog/introducing-fabric-mcp-public-preview"
views: 93783
platform: "Microsoft Fabric Updates Blog"
categories:
  - AI
  - Announcements
  - Fabric platform
  - Fabric Public APIs
  - Microsoft Fabric
  - Uncategorized
status: "Published"
milestone: "Fabric MCP Public Preview"
repo: "https://aka.ms/FabricMCP"
---

# Introducing Fabric MCP (Preview)

The Model Context Protocol (MCP) for Fabric is a developer-focused framework that brings together Microsoft Fabric's public APIs, item definitions, and best-practice guidance into a unified context layer designed for AI-assisted development. It runs locally on your machine, giving AI agents the context they need to generate code and author items without accessing your environment — keeping you in control as you review and decide when to run the generated code.

As part of the broader Microsoft MCP initiative, Fabric MCP is open source and extensible, inviting contributions to expand its templates, tools, and use cases. By aligning with the open MCP standard, Fabric joins a growing ecosystem of MCP servers across data, infrastructure, and productivity, enabling agents to orchestrate complex workflows across platforms. Now available in preview, Fabric MCP is ready for you to explore, provide feedback, and help shape its future.

*Asking GitHub Copilot in VSCode to generate a python script using the Fabric MCP*

## Why MCP Matters for Data Analytics

Large language models excel at reasoning over text but fall short when they lack access to the systems and data that power real-world applications. To bridge this gap, the Model Context Protocol (MCP) provides a universal way to connect AI systems to external tools and datasets. Think of MCP like a USB-C port for AI — an open, standardized interface that replaces fragmented connectors with a single protocol. The protocol gives developers a secure, two-way connection between their data sources and AI-powered tools, enabling models to retrieve schema, authentication requirements and best practices directly from the systems they target. This standardization helps agents maintain context as they move between different tools and datasets.

For data analytics, this shift is significant. Instead of AI agents operating in isolation, MCP allows them to discover and understand API schemas, item definitions and relationships between services. Early use cases within real-time intelligence show how MCP servers let agents query Eventhouse or Azure Data Explorer using natural language and return optimised KQL queries. Standardised servers also expose schema and metadata so that agents can dynamically learn data structures. Microsoft already publishes MCP servers for a range of services — from Dev Box and SQL Server to real-time intelligence — and these servers share the same architecture: a lightweight MCP server that exposes specific capabilities and a client that forwards model requests.

## Introducing the Fabric MCP (Preview)

The Fabric MCP is our contribution to this ecosystem: a local MCP server that packages the full OpenAPI specifications for Fabric's public APIs, JSON schemas for every item type (Lakehouses, pipelines, semantic models, notebooks, Real-Time analytics workloads and more) and built-in guidance on pagination, error handling and other best practices. Instead of executing actions in your tenant, the Fabric MCP equips AI agents with the context they need to generate robust, production-ready code — and leaves you in control of when and how to run it.

Key capabilities include:

- **Complete API context** – Agents can browse a catalogue of all supported workloads and fetch detailed request/response schemas. They learn authentication requirements, parameter names and data types, so generated code aligns with Fabric's public APIs.
- **Item definition knowledge** – For each Fabric item, the MCP exposes a JSON schema describing its shape, constraints and defaults. Whether you're building a Lakehouse, creating a Data Factory pipeline or configuring a semantic model, your AI assistant knows the exact structure required.
- **Best-practice guidance built in** – Developers often grapple with pagination, long-running operations and error handling. The Fabric MCP surfaces recommended patterns, so code generation follows Microsoft's guidelines from day one.
- **Local-first security** – The server runs entirely on your own machine or infrastructure. It never connects directly to your Fabric environment; instead, it generates code that you decide to execute. This keeps credentials and data safe while still enabling powerful automation.
- **Open source and extensible** – The server is part of the Microsoft MCP repository alongside other service-specific MCP implementations. You can fork it, add new schemas or guidance and contribute back. Templates are just JSON and YAML files — no proprietary formats.

## What Fabric MCP Unlocks

The Fabric MCP brings AI-assisted development to the heart of data analytics. Here's how:

- **AI-assisted item authoring** – Agents can generate or update Fabric items — like Lakehouses, pipelines or semantic models — by combining API context with item schemas and best practices. Instead of hand-writing definitions, you review AI-generated code that aligns with official specs.
- **Intelligent integration code** – With full API documentation and guidance, AI agents can scaffold scripts to call Fabric's REST endpoints, handle authentication and pagination and chain operations correctly. This reduces boilerplate and shortens time-to-value.
- **Cross-platform workflows** – Because the Fabric MCP follows the same open standard as other MCP servers, agents can orchestrate scenarios that span services. For example, an agent could set up a Dev Box via the Dev Box MCP, generate code to create and configure a Lakehouse using Fabric MCP context and provision SQL databases via the SQL MCP — all within a consistent architecture.
- **Reduced learning curve** – New developers can leverage AI agents with deep Fabric knowledge. They don't need to memorize every API detail; the MCP supplies context on request, making onboarding faster.
- **Standardized architecture** – Code generation automatically includes recommended patterns for scalability, security and maintainability. This makes solution architecture more consistent across teams.
- **Innovation focus** – By offloading repetitive integration tasks to AI, teams can focus on business logic, data insights and value creation.

## Get Started

The MCP runs locally and provides read-only access to Fabric API specifications. It does not perform actions in your environment; instead, it contains embedded OpenAPI specifications and documentation from Microsoft Fabric's official API repository. This gives you comprehensive offline access to the API definitions and item schemas without requiring live connections. You remain in control — review the generated code and decide when to run it.

1. **Connect your AI agent or script** – Use your preferred tool to interact with the MCP server and experiment with generating code. For example, list available workloads or fetch item definitions.
2. **Share feedback** – This preview is evolving quickly. Visit the repository for the most up-to-date installation and configuration instructions, star the project to follow progress and open issues or discussions with your ideas and needs. Your input will guide what comes next.

This is a new initiative and will evolve as we learn with the community. Here's how to try it and help shape it:

1. Clone the repository:

```bash
git clone https://github.com/microsoft/mcp.git
cd mcp
```

2. Build the project:

```bash
dotnet build servers/Fabric.Mcp.Server/src/Fabric.Mcp.Server.csproj --configuration Release
```

3. Locate your executable: The executable `fabmcp` will be created at: `servers/Fabric.Mcp.Server/src/bin/Release/fabmcp`

4. Configure your MCP client (example for VS Code `.vscode/mcp.json`):

```json
{
  "servers": {
    "Microsoft Fabric MCP": {
      "command": "/path/to/executable",
      "args": ["server", "start", "--mode", "all"]
    }
  }
}
```

**Notes:**
- Replace `/path/to/executable` with the actual path from step 3 (you might need to use `/fabmcp.exe` on Windows)
- The `--mode all` argument enables all available tools

For updated documentation and installation guidance, and to report any issues, please see: [https://aka.ms/FabricMCP](https://aka.ms/FabricMCP)

## What's Next

The Model Context Protocol for Fabric is still new and evolving. We'll expand templates and guidance, explore hosted experiences and remote-execution patterns and work with other MCP efforts across Microsoft to ensure compatibility. Tell us which templates or workloads are most important to you or which cross-platform scenarios you're excited about — your input will shape what comes next.

## Conclusion

AI-powered data analytics is entering a new era where context is the key to intelligence. By open-sourcing the Fabric MCP and inviting the community to build with us, we're laying the foundation for agents that understand your data and automate your workflows safely and effectively. This is just the start, and we're excited for what's ahead!
