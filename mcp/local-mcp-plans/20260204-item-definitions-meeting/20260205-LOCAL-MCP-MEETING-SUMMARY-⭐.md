# Fabric Local MCP: Vision & Roadmap
## Meeting Summary for Item Definitions Discussion

**Date:** February 5, 2026  
**Owner:** Hasan Abo-Shally  
**Audience:** Internal stakeholders (CLI team, Platform team, PM)  
**Purpose:** Align on vision, current state, and import/export tool strategy

---

## 1. Vision: Why Local MCP?

### The Industry Context

The **Model Context Protocol (MCP)** is becoming the standard for connecting AI agents to external systems. Launched by Anthropic in November 2024 and now maintained by the Linux Foundation, MCP enables AI assistants like GitHub Copilot, Claude, and others to:

- **Access tools** — Execute functions (APIs, CLI commands, database queries)
- **Read resources** — Get context (files, schemas, documentation)
- **Use prompts** — Follow pre-built workflow templates

Major players are adopting MCP: VS Code (native support), GitHub Copilot, Claude Desktop, JetBrains IDEs, and many enterprise tools.

### What Fabric Local MCP Achieves

| For Users | Benefit |
|-----------|---------|
| **Developers** | Stay in IDE — no portal context-switching |
| **DevOps Engineers** | AI-assisted CI/CD for Fabric deployments |
| **Data Engineers** | Natural language management of pipelines, lakehouses |
| **ISVs** | Automated workspace migrations and templating |

### The Vision Statement

> **Make AI agents first-class citizens of the Fabric developer experience** — enabling users to manage their entire Fabric lifecycle through natural language, with full transparency and human oversight.

### Key Scenarios Enabled

```
┌─────────────────────────────────────────────────────────────────────┐
│                    FABRIC LOCAL MCP SCENARIOS                       │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│  🔍 DISCOVERY          📝 DEVELOPMENT        🚀 DEPLOYMENT          │
│  ─────────────         ─────────────         ────────────           │
│  "What items are       "Create a pipeline    "Deploy these         │
│   in my workspace?"     that loads data       changes to prod"     │
│                         from Lakehouse"                             │
│  "Show me the schema                         "Clone this workspace │
│   for a Notebook"       "Update the report    to staging"          │
│                          definition to add                          │
│  "List all pipelines     a new visual"       "Export all items     │
│   with errors"                                for backup"           │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
```

### Why Not Just REST APIs?

| Direct REST API | With Local MCP |
|-----------------|----------------|
| Need to know API endpoints | AI knows all Fabric APIs via OpenAPI specs |
| Manual auth token management | CLI handles authentication |
| Parse JSON responses manually | Structured responses for AI reasoning |
| No workflow guidance | Best practices embedded in prompts |
| Single operation at a time | Orchestrated multi-step workflows |

### Guiding Principles

These principles guide all Local MCP design decisions:

| # | Principle | Implication for Import/Export |
|---|-----------|-------------------------------|
| 1 | **Trust agents, verify destructive actions** | Import requires approval; export is safe by default |
| 2 | **Agents inherit user permissions** | MCP can only import to workspaces user has access to |
| 3 | **Offline-first for context, cloud-when-needed** | Validation works offline; import needs cloud |
| 4 | **CLI over SDK for code generation** | Tools wrap CLI, not REST APIs directly |
| 5 | **Errors must teach, not just fail** | Show what went wrong + how to fix + docs link |
| 6 | **Optimize for LLM context windows** | Return concise diffs, not full payloads |

---

## 2. Current State (Public Preview)

**Current Version:** 0.0.0-beta.2 (as of Nov 21, 2025)

### Distribution Channels (All Live)

| Channel | Package | Status |
|---------|---------|--------|
| **VS Code Marketplace** | "Microsoft Fabric MCP Server" | ✅ Live |
| **NuGet** | `Microsoft.Fabric.Mcp` | ✅ Live |
| **NPM** | `@microsoft/fabric-mcp` | ✅ Live |

### Current Tools

| Tool | What It Does | Status |
|------|--------------|--------|
| `publicapis list` | Discover available Fabric workloads | ✅ Live |
| `publicapis get` | Get full OpenAPI spec for a workload | ✅ Live |
| `publicapis itemdefinition get` | Get JSON/YAML schema for item definition | ✅ Live |
| `publicapis examples get` | Retrieve code samples for common tasks | ✅ Live |
| `search_documentation` | Semantic search over MS Learn docs | ✅ Live |
| `get_fabric_glossary` | Retrieve definitions of key concepts | ✅ Live |

### Current Limitations

| Gap | User Impact |
|-----|-------------|
| ❌ No item import/export | Can't manage definitions programmatically |
| ❌ No CLI integration | Agents generate SDK code instead of reusable scripts |
| ❌ No dry-run mode | Can't preview changes before execution |
| ❌ No batch operations | Multi-item workflows require manual scripting |

### Hero Scenarios We're Enabling

| Scenario | Persona | Today | With Import/Export Tools |
|----------|---------|-------|-------------------------|
| **Zero-Hallucination Code Gen** | Jian (Developer) | ✅ Works | ✅ Works |
| **First-Try Deployment** | Ari (Data Architect) | ⚠️ Partial | ✅ Full (with validation) |
| **Bidirectional Workflow** | Ren (Data Engineer) | ❌ Manual | ✅ AI-assisted |
| **Dry Run Safety Check** | Ren (Data Engineer) | ❌ Not available | ✅ Preview before apply |

### Architecture Today

```
┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐
│  GitHub Copilot │     │  Fabric Local   │     │  Fabric APIs    │
│  / Claude       │────▶│  MCP Server     │────▶│  / OneLake      │
│  / VS Code      │     │                 │     │                 │
└─────────────────┘     └─────────────────┘     └─────────────────┘
         │                      │
         │  User asks question  │  MCP provides context:
         │                      │  • API schemas
         ▼                      │  • Best practices
    AI generates code           │  • Workspace info
    or answers questions        │
```

---

## 3. Roadmap: Additional Capabilities

### Longer-Term Opportunities

| Capability | Description | Priority |
|------------|-------------|----------|
| **Workspace cloning** | One-command workspace duplication with dependencies | P1 |
| **Pipeline authoring** | Natural language to pipeline definition | P2 |
| **Cross-workspace deployment** | CI/CD-style promotion across environments | P1 |
| **Smart refactoring** | AI-assisted schema migrations | P2 |
| **Real-time monitoring** | Pipeline status and alerting | P3 |
| **Capacity management** | AI recommendations for scaling | P3 |

### Shorter-Term Focus (Q1-Q2 2026)

| Capability | Target | Status |
|------------|--------|--------|
| **Item definition export** | Q1 | 🎯 Discussion topic |
| **Item definition import** | Q1 | 🎯 Discussion topic |
| **Definition validation** | Q1 | Design phase |
| **CLI script generation** | Q1 | Planning |
| **Workspace batch export** | Q2 | Pending API |
| **Workspace batch import** | Q2 | Pending API |

---

## 4. Focus Area: Item Definition Import/Export

### The User Scenario

> "I want my AI agent (GitHub Copilot) to export a report definition from Fabric, let me modify it locally, and then import it back — all without leaving VS Code."

```
┌──────────────┐     ┌──────────────┐     ┌──────────────┐     ┌──────────────┐
│    FABRIC    │     │   LOCAL      │     │   COPILOT    │     │    FABRIC    │
│   (Source)   │     │   FILES      │     │   EDITS      │     │   (Target)   │
├──────────────┤     ├──────────────┤     ├──────────────┤     ├──────────────┤
│              │     │              │     │              │     │              │
│ SalesReport  │────▶│ report.json  │────▶│ Updated JSON │────▶│ SalesReport  │
│ .Report      │ MCP │              │ IDE │ (new visual) │ MCP │ .Report      │
│              │Export│             │     │              │Import│ (updated)   │
└──────────────┘     └──────────────┘     └──────────────┘     └──────────────┘
```

### Why Dedicated Tools for Import/Export?

The question: **Should the MCP generate CLI scripts, or have dedicated tools that wrap CLI commands?**

**Answer: Both.** Here's the architecture:

```
┌─────────────────────────────────────────────────────────────────────┐
│                    LOCAL MCP TOOL ARCHITECTURE                      │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│   TWO APPROACHES (COMPLEMENTARY)                                    │
│                                                                     │
│   ┌─────────────────────────────┐   ┌─────────────────────────────┐ │
│   │  APPROACH A: Script Gen     │   │  APPROACH B: Direct Tools   │ │
│   │  ─────────────────────────  │   │  ─────────────────────────  │ │
│   │                             │   │                             │ │
│   │  User: "Export workspace"   │   │  User: "Export workspace"   │ │
│   │           │                 │   │           │                 │ │
│   │           ▼                 │   │           ▼                 │ │
│   │  MCP generates CLI script:  │   │  MCP calls `workspace       │ │
│   │  ┌───────────────────────┐  │   │  export` tool directly:     │ │
│   │  │ fab export /workspace │  │   │  ┌───────────────────────┐  │ │
│   │  │   --output ./export   │  │   │  │ Tool wraps CLI and    │  │ │
│   │  └───────────────────────┘  │   │  │ returns results       │  │ │
│   │           │                 │   │  └───────────────────────┘  │ │
│   │           ▼                 │   │           │                 │ │
│   │  User reviews & executes    │   │           ▼                 │ │
│   │  in terminal                │   │  Results returned to agent  │ │
│   │                             │   │  (with human approval)      │ │
│   └─────────────────────────────┘   └─────────────────────────────┘ │
│                                                                     │
│   BOTH USE CLI AS UNDERLYING ENGINE                                 │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
```

### The CLI as Sole Execution Engine

**Key Decision:** All MCP execution flows through the **Fabric CLI**.

```
                    ┌─────────────────────────┐
                    │   MCP TOOLS LAYER       │
                    │   (Thin wrapper)        │
                    ├─────────────────────────┤
                    │ • definition export     │
                    │ • definition import     │
                    │ • definition validate   │
                    │ • cli generate          │
                    │ • cli execute           │
                    └───────────┬─────────────┘
                                │
                                │ All tools invoke CLI
                                ▼
                    ┌─────────────────────────┐
                    │     FABRIC CLI          │
                    │   (Execution Engine)    │
                    ├─────────────────────────┤
                    │ • fab export            │
                    │ • fab import            │
                    │ • fab deploy ← NEW      │
                    │ • Auth & tokens         │
                    │ • Retry logic           │
                    └───────────┬─────────────┘
                                │
                                ▼
                    ┌─────────────────────────┐
                    │   FABRIC REST APIs      │
                    └─────────────────────────┘
```

### Why CLI as Execution Engine?

| Benefit | Why It Matters |
|---------|----------------|
| **Single source of truth** | CLI is the canonical Fabric automation tool |
| **Auth handled** | No token management in MCP — CLI does it |
| **Reproducible** | Every MCP action = CLI command user can run manually |
| **Proven** | CLI is tested and used in production CI/CD |
| **Maintainable** | MCP stays thin; CLI team owns execution logic |
| **fabric-cicd integration** | `fab deploy` brings workspace-level deployment |

---

## 5. Proposed Tools: Import/Export Focus

### Tool Summary

| Tool | Purpose | Pattern | Priority |
|------|---------|---------|----------|
| `definition export` | Export single item's definition JSON | Direct (read-only) | **P0** |
| `definition import` | Import definition back to Fabric | Hybrid (approval) | **P0** |
| `definition validate` | Validate JSON against schema | Direct (read-only) | P1 |
| `workspace export` | Batch export all items | Direct (read-only) | P1 |
| `workspace import` | Batch import all items | Hybrid (approval) | P1 |
| `cli generate` | Generate CLI script for any operation | Direct (read-only) | P1 |
| `cli execute` | Execute approved CLI commands | Hybrid (approval) | P1 |

### Tool: `definition export`

**Purpose:** Export a single item's definition to local JSON file.

**Flow:**
```
User: "Export the SalesReport definition"
         │
         ▼
MCP Tool: definition export
         │
         ▼
CLI: fab export /workspace/SalesReport.Report -o ./report.json
         │
         ▼
Result: Definition saved to ./report.json
```

**Input:**
| Parameter | Required | Description |
|-----------|----------|-------------|
| `workspace` | Yes | Workspace name or ID |
| `item` | Yes | Item name with type (e.g., `SalesReport.Report`) |
| `outputPath` | Yes | Local path for exported JSON |
| `format` | No | `json` (default) or `yaml` |

**Output:** File saved locally + confirmation message.

---

### Tool: `definition import`

**Purpose:** Import a local definition JSON back to Fabric.

**Flow:**
```
User: "Import the updated report definition"
         │
         ▼
MCP Tool: definition import
         │
         ▼
MCP: Shows preview of changes (diff)
         │
         ▼
User: Approves import (via elicitation)
         │
         ▼
CLI: fab import /workspace -i ./report.json
         │
         ▼
Result: Item updated in Fabric
```

**Why Approval Required:**
- Import **modifies** Fabric state
- Could overwrite existing item
- May affect dependent items
- Human must confirm changes

**Input:**
| Parameter | Required | Description |
|-----------|----------|-------------|
| `workspace` | Yes | Target workspace name or ID |
| `sourcePath` | Yes | Local path to definition JSON |
| `strategy` | No | `overwrite`, `skip`, `rename` (default: ask) |
| `dryRun` | No | Preview changes without applying |

**Output:** Import result + list of created/updated items.

---

### Tool: `definition validate`

**Purpose:** Validate definition JSON against item schema before import.

**Flow:**
```
User: "Check if this definition is valid"
         │
         ▼
MCP Tool: definition validate
         │
         ▼
MCP: Loads schema, validates JSON
         │
         ▼
Result: Valid ✅ or list of errors ❌
```

**Why This Matters:**
- Catch errors **before** import fails
- Better error messages than API returns
- AI can fix issues automatically

---

## 6. Decision Points for Discussion

### Decision 1: Tool vs. CLI Script for Import/Export

| Option | Pros | Cons |
|--------|------|------|
| **Dedicated MCP tools** | Better UX, automatic, integrated | Less transparent |
| **CLI script generation** | Fully transparent, reproducible | Extra step for user |
| **Hybrid (recommended)** | Best of both — tool wraps CLI | Slight complexity |

**Recommendation:** Hybrid approach where tools wrap CLI commands. The tool calls CLI under the hood but can also show the equivalent CLI command for transparency.

---

### Decision 2: Approval Flow for Imports

| Option | When to Use |
|--------|-------------|
| **Always require approval** | Production deployments, destructive ops |
| **Smart approval** | Approve for new workspaces, skip for dev |
| **User setting** | Let user configure approval level |

**Recommendation:** Always require approval for imports. Use MCP **elicitation** to request user confirmation with a preview of changes.

---

### Decision 3: Dry-Run Implementation

| Option | Description |
|--------|-------------|
| **MCP-side dry-run** | MCP validates locally, doesn't call CLI |
| **CLI --dry-run flag** | Pass flag to CLI, get preview from API |
| **Both** | Local validation + API preview |

**Question for CLI team:** Does `fab import --dry-run` exist or is it planned?

---

### Decision 4: Error Handling & Retries

| Scenario | Handling |
|----------|----------|
| Network failure | CLI retries automatically |
| Auth expired | Prompt user to re-auth |
| Partial failure (batch) | Return partial results + errors |
| Schema validation fail | Show errors before attempting import |

---

## 7. Implementation Approach

### Phase 1: Foundation (Q1 2026)

| Task | Owner | Dependency |
|------|-------|------------|
| Add `definition export` tool | MCP team | CLI export command |
| Add `definition import` tool | MCP team | CLI import command |
| Add `definition validate` tool | MCP team | JSON schemas |
| Implement approval flow (elicitation) | MCP team | VS Code/Copilot support |

### Phase 2: Batch Operations (Q2 2026)

| Task | Owner | Dependency |
|------|-------|------------|
| Add `workspace export` tool | MCP team | CLI batch export |
| Add `workspace import` tool | MCP team | CLI batch import |
| Add `workspace deploy` tool | MCP team | `fab deploy` (fabric-cicd) |

### Prerequisites

| Requirement | Status | Owner |
|-------------|--------|-------|
| CLI export command | ✅ Available | CLI team |
| CLI import command | ✅ Available | CLI team |
| CLI dry-run flag | ❓ To confirm | CLI team |
| CLI JSON output format | ❓ To confirm | CLI team |
| fabric-cicd in CLI (`fab deploy`) | 🔄 In progress | CLI team |

---

## 8. Next Steps

### Tomorrow's Meeting (Feb 5)

1. **Align on CLI as execution engine** — Confirm CLI team support
2. **Confirm CLI capabilities** — dry-run, JSON output, error codes
3. **Agree on tool design** — input/output schemas
4. **Discuss approval flow** — elicitation vs. explicit prompt
5. **Set timeline** — When can we ship P0 tools?

### After Meeting

1. Finalize tool specifications
2. Create ADO work items with requirements
3. Begin implementation of `definition export` and `definition import`
4. Coordinate with CLI team on any needed enhancements

---

## 9. Success Metrics

| Outcome | Metric | Target (at GA) |
|---------|--------|----------------|
| **Adoption** | Weekly Active Users | **5,000+** |
| **Code Quality** | First-attempt deployment success | **75%+** |
| **Efficiency** | Time to author complex item | **< 5 min** (vs 30+) |
| **Satisfaction** | VS Code Marketplace Rating | **4.5/5** |
| **Safety** | Critical Security Incidents | **0** |

---

## Appendix: MCP Primitives Reference

| Primitive | Purpose | Our Usage |
|-----------|---------|-----------|
| **Tools** | Execute actions | Import/export operations |
| **Resources** | Expose read-only data | CLI help, schemas, auth status |
| **Prompts** | Reusable templates | `/export-workspace`, `/import-definition` |
| **Elicitation** | Request user input | Approval dialogs, conflict resolution |
| **Tasks** | Long-running operations | Batch import/export (future) |

---

## Appendix: Glossary

| Term | Definition |
|------|------------|
| **Item Definition** | JSON representation of a Fabric item (report, pipeline, etc.) |
| **MCP Tool** | Function that AI can invoke to perform an action |
| **MCP Resource** | Read-only data source for AI context |
| **Elicitation** | MCP feature for servers to request structured user input |
| **fabric-cicd** | Python library for Fabric CI/CD, being integrated into CLI |
| **Human-in-the-Loop** | Design pattern where humans approve AI-proposed actions |
