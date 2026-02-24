# MCP & CLI Integration: Deep Research
## Patterns, Best Practices, and Future Directions for Fabric Local MCP

**Date:** February 4, 2026  
**Author:** Hasan Abo-Shally  
**Purpose:** Research synthesis for MCP-CLI integration strategy  
**Status:** Research Document

---

## Executive Summary

This document synthesizes research from the official MCP specification (June 2025), the MCP reference server implementations, and emerging patterns in the MCP ecosystem. The goal is to inform our strategy for integrating the **Fabric CLI** with the **Fabric Local MCP Server**.

### Key Findings

| Topic | Key Insight |
|-------|-------------|
| **Tools vs. Script Generation** | Both patterns are valid; **script generation is preferred** for auditability and human oversight |
| **CLI Wrapping** | Many successful MCP servers (Git, Filesystem) **wrap CLI commands** inside tools |
| **Human-in-the-Loop** | MCP spec explicitly requires "human in the loop" for tool invocations |
| **Resources** | Underutilized primitive that could expose CLI help, schemas, and workspace state |
| **Prompts** | Ideal for encoding reusable CLI command templates |
| **Elicitation** | New MCP feature (June 2025) enabling servers to request structured user input |
| **Sampling** | Allows servers to request LLM completions for complex reasoning |
| **Tasks** | Experimental feature for long-running operations (perfect for batch import/export) |

---

## Table of Contents

1. [MCP Tools & CLI: Integration Patterns](#1-mcp-tools--cli-integration-patterns)
2. [Resources: Exposing Context](#2-resources-exposing-context)
3. [Prompts: Reusable Templates](#3-prompts-reusable-templates)
4. [Elicitation: Requesting User Input](#4-elicitation-requesting-user-input)
5. [Sampling: Server-Side LLM Access](#5-sampling-server-side-llm-access)
6. [Tasks: Long-Running Operations](#6-tasks-long-running-operations)
7. [Roots: Workspace Boundaries](#7-roots-workspace-boundaries)
8. [MCP Apps & Composability](#8-mcp-apps--composability)
9. [Recommendations for Fabric Local MCP](#9-recommendations-for-fabric-local-mcp)

---

## 1. MCP Tools & CLI: Integration Patterns

### How Should MCP Tools Relate to CLI Commands?

Based on research of the MCP specification and reference implementations, there are **three patterns** for integrating CLI commands with MCP tools:

### Pattern A: Direct Tool Execution (CLI as Implementation)

The MCP tool directly wraps a CLI command, executing it when invoked.

```
┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐
│ AI Agent        │────▶│ MCP Tool        │────▶│ CLI Execution   │
│ calls tool      │     │ (wraps CLI)     │     │ (subprocess)    │
└─────────────────┘     └─────────────────┘     └─────────────────┘
```

**Example from MCP Reference Servers:**

```typescript
// From modelcontextprotocol/servers - Git server pattern
server.registerTool("git_status", {
  description: "Get git status for repository",
  inputSchema: { path: z.string() }
}, async (args) => {
  const result = await execAsync(`git status --porcelain`, { cwd: args.path });
  return { content: [{ type: "text", text: result.stdout }] };
});
```

**Pros:**
- Simple, direct execution
- Immediate feedback
- Works well for read-only operations

**Cons:**
- Limited human oversight
- No audit trail of what was executed
- Can't be reproduced manually

**Best For:** Read-only operations, queries, status checks

---

### Pattern B: Script Generation (Human-in-the-Loop)

The MCP tool generates CLI commands but **does not execute them**. The human reviews and approves execution separately.

```
┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐     ┌──────────────┐
│ AI Agent        │────▶│ MCP Tool        │────▶│ User Reviews    │────▶│ User Executes│
│ requests action │     │ generates script│     │ script          │     │ in terminal  │
└─────────────────┘     └─────────────────┘     └─────────────────┘     └──────────────┘
```

**Example Pattern:**

```typescript
server.registerTool("cli_generate", {
  description: "Generate CLI commands for a Fabric operation",
  inputSchema: { operation: z.string(), params: z.object({}) }
}, async (args) => {
  const commands = generateCLICommands(args.operation, args.params);
  return {
    content: [{
      type: "text",
      text: `## Generated CLI Commands\n\n\`\`\`bash\n${commands}\n\`\`\`\n\n**Review these commands before executing.**`
    }]
  };
});
```

**Pros:**
- Full human oversight
- Commands can be modified before execution
- Reproducible and auditable
- Aligns with MCP spec's "human in the loop" requirement

**Cons:**
- Requires separate execution step
- Slower for simple operations
- User must have CLI installed locally

**Best For:** Write operations, deployments, destructive actions

---

### Pattern C: Hybrid (Generate + Execute with Approval)

Combines both patterns: generates scripts for complex operations, allows direct execution for safe ones, uses **elicitation** for approval.

```
┌───────────────┐     ┌───────────────┐     ┌───────────────┐     ┌───────────────┐
│ MCP Tool      │────▶│ Generate CLI  │────▶│ Request       │────▶│ Execute or    │
│ receives task │     │ commands      │     │ Approval      │     │ Return script │
└───────────────┘     └───────────────┘     │ (elicitation) │     └───────────────┘
                                            └───────────────┘
```

**Using MCP Elicitation (June 2025 Spec):**

```typescript
server.registerTool("workspace_deploy", {
  description: "Deploy changes to Fabric workspace",
  inputSchema: { source: z.string(), target: z.string() }
}, async (args, { elicit }) => {
  const commands = generateDeployCommands(args);
  
  // Ask user for approval using elicitation
  const approval = await elicit({
    message: `Ready to deploy to ${args.target}. Execute these commands?`,
    requestedSchema: {
      type: "object",
      properties: {
        approve: { type: "boolean", title: "Execute deployment?" },
        dryRun: { type: "boolean", title: "Dry-run only?" }
      }
    }
  });
  
  if (approval.action === "accept" && approval.content.approve) {
    if (approval.content.dryRun) {
      return await executeDryRun(commands);
    }
    return await executeCommands(commands);
  }
  
  return { content: [{ type: "text", text: `Commands generated but not executed:\n${commands}` }] };
});
```

**Pros:**
- Best of both worlds
- Flexible based on operation risk
- Uses native MCP elicitation for structured approval

**Cons:**
- More complex implementation
- Requires client elicitation support

**Best For:** Mixed workloads where some operations need review, others don't

---

### Which MCP Reference Servers Wrap CLI Commands?

| Server | CLI/Tool Wrapped | Pattern Used |
|--------|------------------|--------------|
| **@modelcontextprotocol/server-filesystem** | Node.js fs module (not CLI) | Direct execution |
| **@modelcontextprotocol/server-git** | Git CLI commands | Direct execution |
| **@modelcontextprotocol/server-fetch** | HTTP fetch (not CLI) | Direct execution |
| **Third-party: GitKraken** | gk CLI | Direct execution |
| **Third-party: Firebase** | firebase-tools CLI | Direct execution |
| **Third-party: Cycode** | cycode CLI | Direct execution |

**Key Insight:** Most CLI-wrapping MCP servers use **Pattern A** (direct execution) because they focus on read-only or developer-tool operations. For Fabric (which involves production deployments), **Pattern B or C** is more appropriate.

---

### MCP Spec Guidance on Human-in-the-Loop

From the official MCP specification (June 2025):

> **For trust & safety and security, there SHOULD always be a human in the loop with the ability to deny tool invocations.**
>
> Applications SHOULD:
> - Provide UI that makes clear which tools are being exposed to the AI model
> - Insert clear visual indicators when tools are invoked
> - Present confirmation prompts to the user for operations, to ensure a human is in the loop

**Recommendation for Fabric Local MCP:**
- Use **Pattern B (script generation)** for all write operations
- Use **Pattern A (direct execution)** only for read-only queries
- Consider **Pattern C (hybrid with elicitation)** for batch operations

---

## 2. Resources: Exposing Context

### What Are MCP Resources?

Resources are **read-only data sources** that provide context to AI applications. Unlike tools (which perform actions), resources expose information that can be queried.

### How Resources Differ from Tools

| Aspect | Tools | Resources |
|--------|-------|-----------|
| Purpose | Perform actions | Provide context |
| Control Model | Model-controlled (LLM decides) | Application-controlled (host decides) |
| Mutability | Can modify state | Read-only |
| Use Case | Execute commands, call APIs | Expose schemas, docs, configs |

### Resource Ideas for Fabric Local MCP

| Resource URI | Content | Use Case |
|--------------|---------|----------|
| `fabric://cli/help` | CLI help text for all commands | AI learns available commands |
| `fabric://cli/version` | Current CLI version | Compatibility checking |
| `fabric://workspace/{id}/state` | Current workspace item state | Context for operations |
| `fabric://schema/{itemType}` | JSON schema for item type | Validation during generation |
| `fabric://bestpractices/{topic}` | Best practice documentation | Guidance during code gen |
| `fabric://auth/status` | Current auth context | Inform user of login status |

### Resource Templates

MCP supports **parameterized resources** using URI templates (RFC 6570):

```typescript
server.registerResourceTemplate({
  uriTemplate: "fabric://schema/{itemType}",
  name: "Fabric Item Schema",
  description: "JSON schema for a Fabric item type",
  mimeType: "application/json"
}, async ({ itemType }) => {
  const schema = await getItemSchema(itemType);
  return { uri: `fabric://schema/${itemType}`, text: JSON.stringify(schema) };
});
```

**Client Usage:**
```
GET resource: fabric://schema/Lakehouse
GET resource: fabric://schema/Pipeline.PipelineV1
```

---

## 3. Prompts: Reusable Templates

### What Are MCP Prompts?

Prompts are **pre-written templates** that help structure interactions with language models. They're user-controlled (explicitly selected by users) rather than model-controlled.

### Prompt Ideas for Fabric Local MCP

| Prompt Name | Purpose | Arguments |
|-------------|---------|-----------|
| `fabric-export-workspace` | Template for exporting a workspace | `workspaceId`, `outputPath` |
| `fabric-import-definition` | Template for importing an item | `itemType`, `sourcePath`, `targetWorkspace` |
| `fabric-migrate-items` | Migration workflow prompt | `sourceWorkspace`, `targetWorkspace`, `itemFilter` |
| `fabric-troubleshoot-error` | Debug a Fabric error | `errorMessage`, `context` |
| `fabric-create-pipeline` | Create a new pipeline | `pipelineName`, `activities` |

### Prompt Structure

```typescript
server.registerPrompt("fabric-export-workspace", {
  title: "Export Workspace",
  description: "Export all items from a Fabric workspace to local files",
  arguments: [
    { name: "workspaceId", description: "Workspace ID or name", required: true },
    { name: "outputPath", description: "Local directory for export", required: true },
    { name: "includeData", description: "Include table data", required: false }
  ]
}, async (args) => {
  return {
    messages: [
      {
        role: "user",
        content: {
          type: "text",
          text: `Export all items from workspace "${args.workspaceId}" to "${args.outputPath}".
${args.includeData ? "Include table data in the export." : "Export definitions only."}

Use the Fabric CLI to perform this operation. Generate the commands and explain each step.`
        }
      }
    ]
  };
});
```

### Why Prompts Matter

Prompts enable:
- **Consistent workflows** — Same pattern for common tasks
- **Slash commands** — `/export-workspace my-workspace ./output`
- **User control** — User selects prompt, not AI
- **Embedded resources** — Include schemas and docs in prompt context

---

## 4. Elicitation: Requesting User Input

### What Is Elicitation? (New in MCP June 2025)

Elicitation allows **servers to request structured input** from users during tool execution. This is crucial for human-in-the-loop workflows.

> **From MCP Spec:** "Elicitation is newly introduced in this version of the MCP specification and its design may evolve in future protocol versions."

### Elicitation Use Cases for Fabric Local MCP

| Use Case | What to Elicit | Schema |
|----------|----------------|--------|
| **Deployment approval** | Confirm before deploying | `{ approve: boolean }` |
| **Workspace selection** | Choose target workspace | `{ workspace: enum }` |
| **Conflict resolution** | How to handle existing items | `{ strategy: "skip" | "overwrite" | "rename" }` |
| **Parameter input** | Missing required parameters | `{ param1: string, param2: number }` |
| **Dry-run confirmation** | Preview changes, then confirm | `{ proceed: boolean, modifyBefore: boolean }` |

### Elicitation Workflow

```
┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐
│ Server sends    │────▶│ Client presents │────▶│ User responds   │
│ elicit request  │     │ UI form         │     │ with input      │
└─────────────────┘     └─────────────────┘     └─────────────────┘
```

### Elicitation Schema Restrictions

MCP elicitation uses a **restricted JSON Schema** subset:
- Only flat objects (no nesting)
- Primitive types only: `string`, `number`, `integer`, `boolean`
- Enum support for dropdowns
- Format hints: `email`, `uri`, `date`, `date-time`

### Example: Deployment Approval

```typescript
const approval = await elicit({
  message: "Ready to deploy 5 items to 'Production' workspace. This will overwrite existing items.",
  requestedSchema: {
    type: "object",
    properties: {
      approve: {
        type: "boolean",
        title: "Deploy Now",
        description: "Confirm deployment to production"
      },
      backupFirst: {
        type: "boolean",
        title: "Create Backup",
        description: "Export existing items before overwriting",
        default: true
      },
      notifyTeam: {
        type: "boolean",
        title: "Notify Team",
        description: "Send Slack notification after deployment"
      }
    },
    required: ["approve"]
  }
});
```

### Response Actions

Elicitation responses have three possible actions:
1. **Accept** — User approved, `content` contains data
2. **Decline** — User explicitly declined
3. **Cancel** — User dismissed without choosing

---

## 5. Sampling: Server-Side LLM Access

### What Is Sampling?

Sampling allows MCP **servers to request LLM completions** from the client. This enables agentic behaviors where the server needs to reason.

> **From MCP Spec:** "Sampling in MCP allows servers to implement agentic behaviors, by enabling LLM calls to occur nested inside other MCP server features."

### Sampling Use Cases for Fabric Local MCP

| Use Case | Why Sampling Helps |
|----------|-------------------|
| **Error interpretation** | Server asks LLM to explain a Fabric API error |
| **Command generation** | Server asks LLM to generate CLI commands for a natural-language request |
| **Migration planning** | Server asks LLM to analyze item dependencies and suggest migration order |
| **Conflict resolution** | Server asks LLM to recommend how to handle schema mismatches |

### Sampling Flow

```
┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐
│ MCP Server      │────▶│ Client forwards │────▶│ LLM generates   │
│ requests sample │     │ to LLM          │     │ response        │
└─────────────────┘     └─────────────────┘     └─────────────────┘
```

### Model Preferences

Servers can express preferences for the LLM used:
- **Hints:** Suggest specific models (e.g., `claude-3-sonnet`)
- **Priorities:** Cost, speed, intelligence (0-1 scale)

```typescript
const response = await sample({
  messages: [{
    role: "user",
    content: {
      type: "text",
      text: "Analyze this error and suggest a fix: " + errorMessage
    }
  }],
  modelPreferences: {
    hints: [{ name: "claude-3-sonnet" }],
    intelligencePriority: 0.9,
    speedPriority: 0.5
  },
  maxTokens: 500
});
```

### Security Considerations

> **From MCP Spec:** "For trust & safety and security, there SHOULD always be a human in the loop with the ability to deny sampling requests."

---

## 6. Tasks: Long-Running Operations

### What Are MCP Tasks? (Experimental)

Tasks are **durable execution wrappers** for long-running operations. They enable "call now, fetch later" patterns.

### Why Tasks Matter for Fabric

Fabric operations like batch export/import can take **minutes** to complete. Tasks provide:
- **Async execution** — Start operation, check status later
- **Progress tracking** — `statusMessage` updates during execution
- **TTL management** — Automatic cleanup after completion
- **Resumability** — Continue after disconnection

### Task Lifecycle

```
┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐
│ tools/call      │────▶│ Server returns  │────▶│ Client polls    │
│ with task param │     │ CreateTaskResult│     │ tasks/get       │
└─────────────────┘     └─────────────────┘     └─────────────────┘
         │                                               │
         │                      ┌────────────────────────┘
         │                      ▼
         │              ┌─────────────────┐
         └─────────────▶│ Task completes  │
                        │ with result     │
                        └─────────────────┘
```

### Task States

| State | Description |
|-------|-------------|
| `running` | Task is in progress |
| `completed` | Task finished successfully |
| `failed` | Task encountered error |
| `cancelled` | Task was cancelled |
| `input_required` | Task paused, waiting for user input (elicitation) |

### Example: Batch Export Task

```typescript
server.experimental.tasks.registerToolTask("workspace_export", {
  title: "Export Workspace",
  description: "Export all items from a workspace (long-running)"
}, async (args, { updateProgress, elicit }) => {
  const items = await listWorkspaceItems(args.workspaceId);
  
  for (let i = 0; i < items.length; i++) {
    updateProgress({
      statusMessage: `Exporting ${items[i].name} (${i + 1}/${items.length})...`,
      progress: i / items.length
    });
    await exportItem(items[i], args.outputPath);
  }
  
  return {
    content: [{
      type: "text",
      text: `Exported ${items.length} items to ${args.outputPath}`
    }]
  };
});
```

---

## 7. Roots: Workspace Boundaries

### What Are Roots?

Roots define the **filesystem boundaries** where MCP servers can operate. They let users specify which directories servers can access.

### Root Use Cases for Fabric Local MCP

| Root Pattern | Purpose |
|--------------|---------|
| `file:///project/fabric-definitions` | Limit server to project's Fabric folder |
| `file:///home/user/dev` | Allow access to entire dev directory |
| Multiple roots | Access both local project and shared templates |

### Security Benefits

- Servers can only access files within declared roots
- Users explicitly consent to directory access
- Prevents accidental access to sensitive files

---

## 8. MCP Apps & Composability

### Emerging MCP Ecosystem Patterns

The MCP ecosystem is evolving toward **composable, multi-server architectures**:

#### MCP Registry (Coming GA)
- Centralized discovery of MCP servers
- Automatic capability cataloging
- Version management

#### Server Identity
- `.well-known/mcp.json` for server metadata
- Agent cards for capability advertisement
- Discovery without connection

#### Official Extensions
- Industry-specific protocol extensions
- Healthcare, finance, education verticals
- Standardized patterns for common operations

### Multi-Server Composition

```
┌─────────────────┐
│ MCP Host        │
│ (Claude Desktop)│
├─────────────────┤
│ ┌─────────────┐ │
│ │ Fabric MCP  │ │──── Fabric operations
│ └─────────────┘ │
│ ┌─────────────┐ │
│ │ Git MCP     │ │──── Version control
│ └─────────────┘ │
│ ┌─────────────┐ │
│ │ GitHub MCP  │ │──── Issue tracking
│ └─────────────┘ │
└─────────────────┘
```

**Implication for Fabric:** Our MCP server should focus on **Fabric-specific operations** and rely on other MCP servers for adjacent functionality (Git, GitHub, file management).

---

## 9. Recommendations for Fabric Local MCP

### Tool Strategy

| Tool Category | Pattern | Rationale |
|---------------|---------|-----------|
| **Read operations** | Direct execution (Pattern A) | Safe, immediate feedback |
| **Single writes** | Script generation (Pattern B) | Human review required |
| **Batch operations** | Hybrid with elicitation (Pattern C) | Complex, needs approval |
| **Long-running** | Tasks with progress | Batch export/import |

### Recommended Tool Surface

#### CLI Integration Tools

| Tool | Pattern | Description |
|------|---------|-------------|
| `cli help` | Direct | Get CLI help for a command |
| `cli generate` | Script Gen | Generate CLI commands for an operation |
| `cli execute` | Hybrid | Execute approved CLI commands |
| `cli validate` | Direct | Validate CLI syntax before execution |

#### Item Definition Tools

| Tool | Pattern | Description |
|------|---------|-------------|
| `definition get` | Direct | Get item definition JSON |
| `definition validate` | Direct | Validate definition against schema |
| `definition export` | Tasks | Export definitions to files |
| `definition import` | Hybrid | Import with approval |

#### Workspace Tools

| Tool | Pattern | Description |
|------|---------|-------------|
| `workspace export` | Tasks | Batch export with progress |
| `workspace import` | Hybrid | Batch import with approval |
| `workspace deploy` | Hybrid | Deploy via fabric-cicd |

### Resource Strategy

| Resource | Purpose |
|----------|---------|
| `fabric://cli/help/{command}` | CLI documentation |
| `fabric://schema/{itemType}` | Item type schemas |
| `fabric://workspace/{id}/items` | Current workspace state |
| `fabric://auth/context` | Authentication status |

### Prompt Strategy

| Prompt | Purpose |
|--------|---------|
| `/fabric-export` | Export workflow template |
| `/fabric-import` | Import workflow template |
| `/fabric-migrate` | Migration planning prompt |
| `/fabric-deploy` | Deployment workflow |
| `/fabric-troubleshoot` | Error diagnosis |

### Elicitation Use Cases

| Scenario | When to Elicit |
|----------|----------------|
| Deployment approval | Before any write to production |
| Conflict resolution | When item already exists |
| Missing parameters | When required params not provided |
| Dry-run confirmation | After showing preview |

### Implementation Priority

| Phase | Focus | Q2 2026 |
|-------|-------|---------|
| **Phase 1** | CLI integration basics | `cli generate`, `cli execute` |
| **Phase 2** | Item definition tools | `definition export/import` |
| **Phase 3** | Batch operations | `workspace export/import` with Tasks |
| **Phase 4** | Advanced prompts | Slash commands for common workflows |

---

## Appendix: MCP Specification References

### Official Resources

- [MCP Specification (June 2025)](https://modelcontextprotocol.io/specification/2025-06-18)
- [MCP Tools Specification](https://modelcontextprotocol.io/specification/2025-06-18/server/tools)
- [MCP Resources Specification](https://modelcontextprotocol.io/specification/2025-06-18/server/resources)
- [MCP Prompts Specification](https://modelcontextprotocol.io/specification/2025-06-18/server/prompts)
- [MCP Elicitation Specification](https://modelcontextprotocol.io/specification/2025-06-18/client/elicitation)
- [MCP Sampling Specification](https://modelcontextprotocol.io/specification/2025-06-18/client/sampling)
- [MCP Roots Specification](https://modelcontextprotocol.io/specification/2025-06-18/client/roots)
- [MCP Reference Servers](https://github.com/modelcontextprotocol/servers)
- [MCP Roadmap](https://modelcontextprotocol.io/development/roadmap)

### Third-Party Implementations Referenced

- GitKraken MCP Server
- Firebase MCP Server
- Cycode MCP Server
- Desktop Commander MCP Server

---

## Revision History

| Date | Version | Changes |
|------|---------|---------|
| 2026-02-04 | 1.0 | Initial research synthesis |
