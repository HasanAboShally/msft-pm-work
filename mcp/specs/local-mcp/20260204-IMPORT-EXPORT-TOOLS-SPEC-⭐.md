# Fabric Local MCP: Import/Export Item Definitions Tools
## Feature Specification

**Version:** 1.0 (Draft)  
**Date:** February 4, 2026  
**Author:** Hasan Abo-Shally  
**Status:** Design Discussion  
**Meeting:** February 5, 2026 – Item Definitions Alignment Session

---

## Executive Summary

This specification defines the **Import and Export tools** for the Fabric Local MCP, enabling AI agents to manage Fabric item definitions (reports, datasets, pipelines, lakehouses, etc.) programmatically. The design prioritizes:

- **Human-in-the-loop control** — AI proposes, user approves
- **Reliability** — Preserve inter-item relationships automatically
- **Transparency** — Clear visibility into what actions will occur
- **CLI integration** — Leverage Fabric CLI for auth and execution

---

## Table of Contents

1. [Problem Statement](#1-problem-statement)
2. [Current MCP Capabilities](#2-current-mcp-capabilities)
3. [Proposed Tools](#3-proposed-tools)
4. [Tool Specifications](#4-tool-specifications)
5. [Implementation Approach](#5-implementation-approach)
6. [Human-in-the-Loop Patterns](#6-human-in-the-loop-patterns)
7. [API Dependencies](#7-api-dependencies)
8. [Decision Points](#8-decision-points)
9. [Appendix: Item Definition Reference](#appendix-item-definition-reference)

---

## 1. Problem Statement

### Current Pain Points

| Pain Point | Impact | Who's Affected |
|------------|--------|----------------|
| **Manual workspace cloning** | Takes hours; error-prone | ISVs, DevOps engineers |
| **ID patching for dependencies** | Requires custom scripts to fix GUIDs after export | All developers |
| **No AI-assisted migration** | Cannot use Copilot for deployment tasks | All Fabric users |
| **Context switching** | Must leave IDE to use portal for content management | Developers |

### The Opportunity

By adding Import/Export tools to the Local MCP:
- AI agents can **orchestrate complex migrations** with human oversight
- **One-step workspace cloning** replaces multi-hour manual processes
- Developers stay **in their IDE** for all Fabric operations
- **CI/CD workflows** become AI-assisted

### Success Metrics

| Metric | Target |
|--------|--------|
| Time to clone workspace | <5 minutes (vs. hours today) |
| Human intervention needed | Approval only (no manual ID fixes) |
| Error rate on import | <5% (self-healing with retries) |
| Agent code generation accuracy | >95% for definition-based operations |

---

## 2. Current MCP Capabilities

### Existing Tools (from GitHub repo: microsoft/mcp)

The Fabric MCP Server currently provides these tool namespaces:

#### Public API Tools (`publicapis`)
| Tool | Purpose | ReadOnly |
|------|---------|----------|
| `publicapis list` | List all Fabric workload types with API specs | ✅ |
| `publicapis get` | Get OpenAPI spec for a workload | ✅ |
| `publicapis platform get` | Get platform-level API specs | ✅ |
| `publicapis bestpractices get` | Get best practice documentation | ✅ |
| `publicapis bestpractices examples get` | Get example API requests/responses | ✅ |
| `publicapis bestpractices itemdefinition get` | Get JSON schema for item definitions | ✅ |

#### OneLake Tools (`onelake`)
| Tool | Purpose | ReadOnly |
|------|---------|----------|
| `onelake workspace list` | List workspaces | ✅ |
| `onelake item list` | List items in workspace | ✅ |
| `onelake item create` | Create new Fabric item | ❌ |
| `onelake file read/write/delete` | File operations | ❌ (write/delete) |
| `onelake directory create/delete` | Directory operations | ❌ |
| `onelake table list/get` | Table operations | ✅ |

### Gap Analysis

| Required Capability | Current Status | Gap |
|---------------------|----------------|-----|
| Export item definition | ❌ Not available | Need `definition export` tool |
| Export workspace (batch) | ❌ Not available | Need `workspace export` tool |
| Import item definition | ❌ Not available | Need `definition import` tool |
| Import workspace (batch) | ❌ Not available | Need `workspace import` tool |
| Validate definition | ❌ Not available | Need `definition validate` tool |
| Generate CLI script | ❌ Not available | Need `cli generate` tool |

---

## 3. Proposed Tools

### Tool Architecture

> **Key Architectural Decision:** The **Fabric CLI is the sole execution engine** for all Local MCP operations. This is enabled by the integration of the `fabric-cicd` library into the CLI (as a `deploy` command), which grants the CLI workspace-level deployment capabilities. The CLI already supports export/import of item definitions.

```
┌─────────────────────────────────────────────────────────────────────────┐
│                    FABRIC LOCAL MCP - ITEM DEFINITIONS                  │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                         │
│  CONTEXT TOOLS (Read-Only)           EXECUTION TOOLS (Write)            │
│  ────────────────────────            ───────────────────────            │
│  • definition get                    • definition import                 │
│  • definition validate               • workspace import                  │
│  • workspace export                  • workspace deploy (via fabric-cicd)│
│  • cli generate                      • cli execute                       │
│                                                                          │
└─────────────────────────────────────────────────────────────────────────┘
                                  │
                                  │ All operations are CLI command wrappers
                                  ▼
                    ┌─────────────────────────┐
                    │      FABRIC CLI         │
                    │  (Sole Execution Engine)│
                    ├─────────────────────────┤
                    │  • fab export           │
                    │  • fab import           │
                    │  • fab deploy (NEW)     │  ← fabric-cicd integration
                    │  • Auth & Token Mgmt    │
                    │  • Retry & Error Handle │
                    └─────────────────────────┘
                                  │
                                  ▼
                    ┌─────────────────────────┐
                    │   FABRIC REST APIs      │
                    └─────────────────────────┘
```

### Why CLI as Sole Execution Engine?

| Benefit | Description |
|---------|-------------|
| **Single source of truth** | CLI is the canonical implementation for Fabric automation |
| **fabric-cicd integration** | `fab deploy` brings workspace deployment capabilities |
| **Proven execution** | CLI already tested and used in production CI/CD |
| **Auth handled** | No need to manage tokens in MCP—CLI does it |
| **Script transparency** | Every MCP action = CLI command users can reproduce |
| **Maintenance simplicity** | MCP stays thin; CLI team owns execution logic |

### Tool Summary

| Tool | Namespace | ReadOnly | Description |
|------|-----------|----------|-------------|
| `definition get` | `itemdef` | ✅ | Get definition JSON for a single item |
| `definition validate` | `itemdef` | ✅ | Validate JSON against item schema |
| `workspace export` | `itemdef` | ✅ | Export all definitions from workspace |
| `definition import` | `itemdef` | ❌ | Import single item definition |
| `workspace import` | `itemdef` | ❌ | Import all definitions to workspace |
| `cli generate` | `itemdef` | ✅ | Generate Fabric CLI script |
| `cli execute` | `itemdef` | ❌ | Execute approved CLI commands |
| `workspace deploy` | `itemdef` | ❌ | Deploy workspace (via fabric-cicd) |

### Prerequisites

Since the CLI is the sole execution engine, users must have:

1. **Fabric CLI installed** — `pip install fabric-cli` or equivalent
2. **CLI authenticated** — User logged in via `fab login`
3. **CLI in PATH** — MCP must be able to invoke `fab` command

---

## 4. Tool Specifications

### 4.1 `definition get` — Get Item Definition

**Purpose:** Retrieve the JSON definition of a single Fabric item.

**Tool Metadata:**
```json
{
  "id": "itemdef-definition-get",
  "name": "get",
  "title": "Get Item Definition",
  "description": "Retrieve the complete JSON definition for a Fabric item (report, dataset, pipeline, etc.)",
  "metadata": {
    "destructive": false,
    "idempotent": true,
    "readOnly": true,
    "localRequired": false
  }
}
```

**Parameters:**
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `workspace-id` | GUID | Yes* | Target workspace ID |
| `workspace` | string | Yes* | Workspace name (alternative to ID) |
| `item-id` | GUID | Yes* | Item ID to export |
| `item` | string | Yes* | Item name with type suffix (e.g., `SalesReport.Report`) |
| `format` | string | No | Output format: `json` (default), `yaml` |

*Either ID or name required

**Output Schema:**
```json
{
  "status": 200,
  "message": "Success",
  "results": {
    "itemId": "guid",
    "itemName": "string",
    "itemType": "string",
    "workspaceId": "guid",
    "definition": {
      "format": "string",
      "parts": [
        {
          "path": "string",
          "payload": "base64-string",
          "payloadType": "InlineBase64"
        }
      ]
    }
  }
}
```

**Example Usage:**
```bash
# By ID
fabmcp itemdef definition get --workspace-id "47242da5-ff3b-46fb-a94f-977909b773d5" --item-id "0e67ed13-2bb6-49be-9c87-a1105a4ea342"

# By name
fabmcp itemdef definition get --workspace "Analytics Workspace" --item "SalesReport.Report"
```

---

### 4.2 `definition validate` — Validate Definition

**Purpose:** Check if a JSON definition conforms to the item's schema before import.

**Tool Metadata:**
```json
{
  "id": "itemdef-definition-validate",
  "name": "validate",
  "title": "Validate Item Definition",
  "description": "Validate a JSON definition against the item type schema. Returns errors if invalid.",
  "metadata": {
    "destructive": false,
    "idempotent": true,
    "readOnly": true,
    "localRequired": false
  }
}
```

**Parameters:**
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `item-type` | string | Yes | Item type (e.g., `Lakehouse`, `Report`, `Pipeline`) |
| `definition` | JSON | Yes | The definition JSON to validate |
| `strict` | bool | No | Enable strict validation (default: false) |

**Output Schema:**
```json
{
  "status": 200,
  "message": "Validation complete",
  "results": {
    "isValid": true,
    "itemType": "Report",
    "warnings": [],
    "errors": [],
    "schemaVersion": "1.0.0"
  }
}
```

**Error Response Example:**
```json
{
  "status": 400,
  "message": "Validation failed",
  "results": {
    "isValid": false,
    "itemType": "Pipeline",
    "errors": [
      {
        "path": "parts[0].payload",
        "message": "Invalid base64 encoding",
        "code": "INVALID_PAYLOAD"
      },
      {
        "path": "definition.activities[2]",
        "message": "Referenced Lakehouse ID not found in definition bundle",
        "code": "MISSING_DEPENDENCY"
      }
    ],
    "warnings": [
      {
        "path": "parts[1].path",
        "message": "Large payload detected (>1MB). May exceed model context limits.",
        "code": "LARGE_PAYLOAD"
      }
    ]
  }
}
```

---

### 4.3 `workspace export` — Export Workspace Definitions

**Purpose:** Export all item definitions from a workspace as a single JSON bundle.

**Tool Metadata:**
```json
{
  "id": "itemdef-workspace-export",
  "name": "export",
  "title": "Export Workspace Definitions",
  "description": "Export all item definitions from a workspace. Returns a JSON bundle that can be imported elsewhere.",
  "metadata": {
    "destructive": false,
    "idempotent": true,
    "readOnly": true,
    "localRequired": false
  }
}
```

**Parameters:**
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `workspace-id` | GUID | Yes* | Source workspace ID |
| `workspace` | string | Yes* | Source workspace name |
| `include-types` | string[] | No | Filter to specific item types |
| `exclude-types` | string[] | No | Exclude specific item types |
| `output-file` | path | No | Save to file instead of returning JSON |

**Output Schema:**
```json
{
  "status": 200,
  "message": "Export complete",
  "results": {
    "workspaceId": "guid",
    "workspaceName": "string",
    "exportedAt": "ISO-8601",
    "itemCount": 12,
    "items": [
      {
        "itemId": "guid",
        "itemName": "string",
        "itemType": "Lakehouse",
        "folderPath": "/Analytics",
        "definition": { ... },
        "dependencies": ["guid", "guid"]
      }
    ],
    "metadata": {
      "version": "1.0",
      "fabricApiVersion": "v1",
      "exportMethod": "batch"
    }
  }
}
```

**Implementation Notes:**
- Uses **Batch Export API** when available (preferred)
- Falls back to **sequential single-item exports** if batch unavailable
- Includes **folder structure** information
- Identifies **dependencies** between items

---

### 4.4 `definition import` — Import Single Item

**Purpose:** Import a single item definition into a workspace.

**Tool Metadata:**
```json
{
  "id": "itemdef-definition-import",
  "name": "import",
  "title": "Import Item Definition",
  "description": "Import a single item definition into a workspace. Creates new item or updates existing.",
  "metadata": {
    "destructive": false,
    "idempotent": false,
    "readOnly": false,
    "localRequired": false
  }
}
```

**Parameters:**
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `workspace-id` | GUID | Yes* | Target workspace ID |
| `workspace` | string | Yes* | Target workspace name |
| `definition` | JSON | Yes | Item definition to import |
| `item-name` | string | No | Override item name |
| `folder-path` | string | No | Target folder path |
| `conflict-action` | enum | No | `fail`, `skip`, `rename` (default: `fail`) |
| `dry-run` | bool | No | Preview changes without applying (default: false) |

**Output Schema (Success):**
```json
{
  "status": 201,
  "message": "Item created successfully",
  "results": {
    "action": "created",
    "itemId": "new-guid",
    "itemName": "SalesReport",
    "itemType": "Report",
    "workspaceId": "guid",
    "folderPath": "/Analytics",
    "dependencyBindings": [
      {
        "originalId": "old-dataset-guid",
        "newId": "new-dataset-guid",
        "itemType": "Dataset"
      }
    ]
  }
}
```

**Dry-Run Output:**
```json
{
  "status": 200,
  "message": "Dry run complete - no changes made",
  "results": {
    "wouldCreate": true,
    "itemName": "SalesReport",
    "itemType": "Report",
    "conflicts": [],
    "missingDependencies": [
      {
        "type": "Dataset",
        "referencedId": "guid",
        "referencedName": "SalesModel"
      }
    ]
  }
}
```

---

### 4.5 `workspace import` — Batch Import Workspace

**Purpose:** Import an entire exported workspace bundle, preserving all relationships.

**Tool Metadata:**
```json
{
  "id": "itemdef-workspace-import",
  "name": "import-workspace",
  "title": "Import Workspace Definitions",
  "description": "Import all item definitions from an export bundle into a target workspace. Automatically preserves inter-item relationships.",
  "metadata": {
    "destructive": false,
    "idempotent": false,
    "readOnly": false,
    "localRequired": false
  }
}
```

**Parameters:**
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `workspace-id` | GUID | Yes* | Target workspace ID |
| `workspace` | string | Yes* | Target workspace name |
| `bundle` | JSON | Yes* | Export bundle from `workspace export` |
| `bundle-file` | path | Yes* | Path to export bundle file |
| `include-types` | string[] | No | Filter to specific item types |
| `conflict-action` | enum | No | `fail`, `skip`, `rename` (default: `fail`) |
| `preserve-folders` | bool | No | Recreate folder structure (default: true) |
| `dry-run` | bool | No | Preview changes without applying (default: false) |

**Output Schema:**
```json
{
  "status": 201,
  "message": "Import complete",
  "results": {
    "summary": {
      "totalItems": 12,
      "created": 12,
      "skipped": 0,
      "failed": 0
    },
    "items": [
      {
        "action": "created",
        "originalId": "old-guid",
        "newId": "new-guid",
        "itemName": "SalesLakehouse",
        "itemType": "Lakehouse"
      }
    ],
    "dependencyMappings": {
      "old-lakehouse-guid": "new-lakehouse-guid",
      "old-dataset-guid": "new-dataset-guid"
    }
  }
}
```

**Critical Behavior:**
- **Automatic ID mapping** — New GUIDs assigned, references updated automatically
- **Dependency ordering** — Creates items in correct order (Lakehouse → Dataset → Report)
- **Atomic operation** — All-or-nothing (rollback on failure)
- **Empty workspace required** — Initial version requires target workspace to be empty

---

### 4.6 `cli generate` — Generate CLI Script

**Purpose:** Generate a Fabric CLI script for an operation without executing it.

**Tool Metadata:**
```json
{
  "id": "itemdef-cli-generate",
  "name": "generate",
  "title": "Generate CLI Script",
  "description": "Generate a Fabric CLI script for the requested operation. Returns the script for user review.",
  "metadata": {
    "destructive": false,
    "idempotent": true,
    "readOnly": true,
    "localRequired": false
  }
}
```

**Parameters:**
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `operation` | enum | Yes | `export`, `import`, `clone`, `backup` |
| `source-workspace` | string | No | Source workspace (for export/clone) |
| `target-workspace` | string | No | Target workspace (for import/clone) |
| `options` | object | No | Operation-specific options |
| `format` | enum | No | `bash`, `powershell` (default: `bash`) |

**Output Schema:**
```json
{
  "status": 200,
  "message": "Script generated",
  "results": {
    "operation": "clone",
    "format": "bash",
    "script": "#!/bin/bash\n\n# Clone workspace 'DevWorkspace' to 'ProdWorkspace'\n# Generated by Fabric MCP on 2026-02-04\n\n# Step 1: Export source workspace\nfab workspace export --workspace 'DevWorkspace' --output ./export-bundle.json\n\n# Step 2: Create target workspace (if needed)\nfab workspace create --name 'ProdWorkspace' --capacity P1\n\n# Step 3: Import into target\nfab workspace import --workspace 'ProdWorkspace' --input ./export-bundle.json\n\necho 'Clone complete!'",
    "estimatedDuration": "3-5 minutes",
    "warnings": [
      "Dataset credentials will need to be re-entered after import",
      "Pipeline schedules will be disabled and need manual re-activation"
    ]
  }
}
```

---

### 4.7 `cli execute` — Execute CLI Script

**Purpose:** Execute an approved CLI script with progress tracking.

**Tool Metadata:**
```json
{
  "id": "itemdef-cli-execute",
  "name": "execute",
  "title": "Execute CLI Script",
  "description": "Execute a Fabric CLI script. Requires explicit user confirmation.",
  "metadata": {
    "destructive": true,
    "idempotent": false,
    "readOnly": false,
    "localRequired": true
  }
}
```

**Parameters:**
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `script` | string | Yes | The CLI script to execute |
| `confirmed` | bool | Yes | User confirmation flag (must be true) |
| `timeout` | int | No | Timeout in seconds (default: 600) |

**Output Schema:**
```json
{
  "status": 200,
  "message": "Execution complete",
  "results": {
    "exitCode": 0,
    "duration": 127,
    "steps": [
      {
        "step": 1,
        "command": "fab workspace export ...",
        "status": "success",
        "output": "Exported 12 items to export-bundle.json"
      },
      {
        "step": 2,
        "command": "fab workspace import ...",
        "status": "success",
        "output": "Imported 12 items successfully"
      }
    ]
  }
}
```

---

## 5. Implementation Approach

### Core Principle: CLI as Execution Engine

All MCP tools are **thin wrappers around Fabric CLI commands**. The MCP server invokes CLI processes and parses their output. This approach:

- Reuses all CLI logic (auth, retry, pagination, error handling)
- Ensures MCP behavior matches direct CLI usage
- Simplifies MCP maintenance (CLI team owns execution)
- Provides users with transparent, reproducible commands

### CLI Commands We'll Wrap

| MCP Tool | CLI Command | Status |
|----------|-------------|--------|
| `definition get` | `fab item get --expand definition` | ✅ Available |
| `workspace export` | `fab export --workspace <id>` | ✅ Available |
| `definition import` | `fab item create --definition <json>` | ✅ Available |
| `workspace import` | `fab import --workspace <id>` | ✅ Available |
| `workspace deploy` | `fab deploy` | 🔄 Coming (fabric-cicd integration) |

### fabric-cicd Integration (New!)

The `fabric-cicd` library is being integrated into the CLI as the `fab deploy` command. This brings:

- **Workspace-level deployments** — Deploy entire workspaces in one command
- **Dependency resolution** — Automatic ordering of item creation
- **ID mapping** — Automatic rebinding of cross-item references
- **Incremental updates** — Only deploy changed items (future)

```bash
# Example: Deploy workspace from Git to Fabric
fab deploy --source ./workspace-export --target "ProdWorkspace"
```

### Implementation Pattern

Each MCP tool follows this pattern:

```csharp
public class WorkspaceExportCommand : GlobalCommand<WorkspaceExportOptions>
{
    private readonly ICliExecutor _cliExecutor;
    
    public override async Task<CommandResponse> ExecuteAsync(...)
    {
        // Build CLI command
        var cliCommand = $"fab export --workspace \"{options.WorkspaceId}\" --format json";
        
        // Execute via CLI
        var result = await _cliExecutor.RunAsync(cliCommand, cancellationToken);
        
        if (result.ExitCode != 0)
        {
            return CommandResponse.Error(result.StdErr);
        }
        
        // Parse and return structured result
        var exportBundle = JsonSerializer.Deserialize<ExportBundle>(result.StdOut);
        return CommandResponse.Success(exportBundle);
    }
}
```

### ICliExecutor Service

```csharp
public interface ICliExecutor
{
    Task<CliResult> RunAsync(string command, CancellationToken ct);
    Task<CliResult> RunScriptAsync(string script, CancellationToken ct);
    bool IsCliAvailable();
    string GetCliVersion();
}

public class FabricCliExecutor : ICliExecutor
{
    public async Task<CliResult> RunAsync(string command, CancellationToken ct)
    {
        var process = new Process
        {
            StartInfo = new ProcessStartInfo
            {
                FileName = "fab",
                Arguments = command,
                RedirectStandardOutput = true,
                RedirectStandardError = true,
                UseShellExecute = false
            }
        };
        
        process.Start();
        var stdout = await process.StandardOutput.ReadToEndAsync(ct);
        var stderr = await process.StandardError.ReadToEndAsync(ct);
        await process.WaitForExitAsync(ct);
        
        return new CliResult(process.ExitCode, stdout, stderr);
    }
}
```

### Phase Plan

**Phase 1: GA (March 2026 - FabCon)**
- Wrap existing CLI commands: `export`, `import`, `item get`, `item create`
- Add `definition validate` using local schema checking
- Add `cli generate` and `cli execute` for script workflows

**Phase 2: Post-GA (Q2 2026)**
- Integrate `fab deploy` when fabric-cicd is merged
- Add workspace-level deployment tools
- Add dry-run support via CLI flags

---

## 6. Human-in-the-Loop Patterns

### Pattern 1: Propose → Review → Confirm → Execute

```
┌──────────────┐    ┌────────────────┐    ┌──────────────┐    ┌──────────────┐
│ User Request │───▶│ Agent Proposes │───▶│ User Reviews │───▶│ User Confirms│
│              │    │ (generates     │    │ (sees script │    │ (explicit    │
│ "Clone my    │    │  CLI script)   │    │  or plan)    │    │  approval)   │
│ workspace"   │    │                │    │              │    │              │
└──────────────┘    └────────────────┘    └──────────────┘    └──────────────┘
                                                                     │
                                                                     ▼
                                                            ┌──────────────┐
                                                            │ Agent Executes│
                                                            │ (with progress)│
                                                            └──────────────┘
```

### Pattern 2: Dry-Run Preview

```
User: "Import this workspace to production"

Agent: I'll preview what would happen first...
       [Calls workspace import with dry-run=true]

Agent: Here's what would be created in Production:
       • 1 Lakehouse (SalesLake)
       • 2 Datasets (SalesModel, InventoryModel)
       • 3 Reports (Dashboard, SalesTrend, Inventory)
       
       ⚠️ Note: Dataset credentials will need to be re-entered.
       
       Proceed with import? [Yes / No / Show Script]

User: Yes

Agent: [Calls workspace import with confirmed=true]
       ✅ Import complete! 6 items created.
```

### Pattern 3: Script Generation for Power Users

```
User: "Give me a script to clone workspace X to Y"

Agent: [Calls cli generate --operation clone]

Agent: Here's a Fabric CLI script you can run:

       ```bash
       #!/bin/bash
       # Clone workspace 'DevWorkspace' to 'ProdWorkspace'
       
       # Export
       fab workspace export --workspace "DevWorkspace" -o ./bundle.json
       
       # Import
       fab workspace import --workspace "ProdWorkspace" -i ./bundle.json
       ```
       
       Would you like me to run this, or will you execute it manually?
```

### Confirmation Requirements

| Tool | Requires Confirmation | Reason |
|------|----------------------|--------|
| `definition get` | No | Read-only |
| `definition validate` | No | Read-only |
| `workspace export` | No | Read-only |
| `cli generate` | No | Read-only |
| `definition import` | **Yes** | Creates/modifies content |
| `workspace import` | **Yes** | Creates multiple items |
| `cli execute` | **Yes** | Executes arbitrary commands |

---

## 7. API Dependencies

### CLI Commands Required

Since the CLI is our sole execution engine, here's what we need from the CLI team:

| CLI Command | Current Status | MCP Tool Dependency |
|-------------|----------------|---------------------|
| `fab export` | ✅ Available | `workspace export` |
| `fab import` | ✅ Available | `workspace import` |
| `fab item get --expand definition` | ✅ Available | `definition get` |
| `fab item create --definition` | ✅ Available | `definition import` |
| `fab deploy` | 🔄 Coming (fabric-cicd) | `workspace deploy` |
| `fab validate` | ❌ Needed | `definition validate` |

### fabric-cicd Integration Status

The `fabric-cicd` library integration into CLI is in progress:

| Feature | Status | Notes |
|---------|--------|-------|
| Core deployment logic | ✅ Library exists | PyPI: `fabric-cicd` |
| CLI `deploy` command | 🔄 In development | Ohad's team |
| Dependency ordering | ✅ In library | Auto-handles item creation order |
| ID remapping | ✅ In library | Cross-item references auto-fixed |
| Dry-run support | ❓ TBD | Request: add `--dry-run` flag |

### CLI Requirements for MCP

To enable MCP tools, the CLI should support:

1. **JSON output mode** — `--format json` for machine-readable output
2. **Stdout output** — `--output -` to write to stdout (not just files)
3. **Exit codes** — Clear exit codes for success/failure
4. **Structured errors** — JSON error responses with codes and messages

### Questions for CLI Team (Tomorrow's Meeting)

### Questions for CLI Team (Tomorrow's Meeting)

1. **`fab deploy` timeline:**
   - When will fabric-cicd integration land in CLI?
   - Will it be available for FabCon GA?

2. **JSON output support:**
   - Do all export/import commands support `--format json`?
   - Can output go to stdout (`--output -`)?

3. **Dry-run capability:**
   - Can we add `--dry-run` flag to import/deploy?
   - What would dry-run output look like?

4. **Validation command:**
   - Is there a `fab validate` command or equivalent?
   - If not, can MCP do local schema validation?

5. **Error handling:**
   - What exit codes are used?
   - Are error messages structured (JSON) or text?

---

## 8. Decision Points

### Meeting Agenda Decisions

| # | Decision | Options | Recommendation |
|---|----------|---------|----------------|
| 1 | **Execution engine** | CLI only vs. CLI + direct REST | **CLI only** ✅ |
| 2 | **fab deploy timeline** | Wait for GA vs. ship without | Ship GA without, add post-GA |
| 3 | **Validation approach** | CLI command vs. local schema check | Local schema (no CLI dependency) |
| 4 | **CLI output format** | Require JSON vs. parse text | Require JSON for MCP tools |
| 5 | **Error handling** | Fail-fast vs. continue on error | Fail-fast with detailed reporting |
| 6 | **Target workspace state** | Must be empty vs. support merge | Empty required for v1 |

### Open Questions

1. **Large definitions:** How do we handle datasets with 500+ measures that exceed model context?
   - Proposed: Stream to file, return file reference

2. **Circular shortcuts:** Lakehouse A → Lakehouse B → Lakehouse A?
   - Proposed: Document limitation, manual 2-pass import

3. **Credential handling:** Are connection strings exported?
   - Expected: No, require re-auth post-import

4. **Folder structure:** How deep can workspace folders nest?
   - Need: API confirmation on max depth

---

## Appendix: Item Definition Reference

### Supported Item Types

Based on the MCP repo's item definition resources:

| Item Type | Definition File | Notes |
|-----------|-----------------|-------|
| Lakehouse | `lakehouse-definition.md` | Includes shortcuts, data access roles |
| Report | `report-definition.md` | PBIR and PBIR-Legacy formats |
| Pipeline | `pipeline-definition.md` | Activities, triggers |
| Warehouse | `warehouse-definition.md` | — |
| Dataset (Semantic Model) | — | Via Power BI XMLA |
| Notebook | `notebook-definition.md` | Spark config |
| Eventstream | `eventstream-definition.md` | Sources, destinations, streams |
| GraphQL API | `graphql-api-definition.md` | Data sources, objects |
| Map | `map-definition.md` | Basemap, data sources |
| Variable Library | `variable-library-definition.md` | CI/CD parameters |
| Environment | `environment-definition.md` | Libraries, Spark config |

### Definition Structure (Common Pattern)

All definitions follow this structure:

```json
{
  "format": "ItemTypeDefinitionV1",
  "parts": [
    {
      "path": "definition.json",
      "payload": "<base64>",
      "payloadType": "InlineBase64"
    },
    {
      "path": ".platform",
      "payload": "<base64>",
      "payloadType": "InlineBase64"
    }
  ]
}
```

### Example: Lakehouse Definition Parts

| Part Path | Required | Description |
|-----------|----------|-------------|
| `lakehouse.metadata.json` | ✅ | Lakehouse properties |
| `shortcuts.metadata.json` | ❌ | OneLake shortcuts |
| `data-access-roles.json` | ❌ | Security roles |
| `alm.settings.json` | ❌ | ALM configuration |
| `.platform` | ❌ | Platform metadata |

---

## Revision History

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 1.0 | 2026-02-04 | Hasan Abo-Shally | Initial draft |

---

*This specification is for internal planning purposes. Features and timelines subject to change.*
