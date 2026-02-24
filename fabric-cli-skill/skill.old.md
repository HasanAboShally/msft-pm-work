---
name: fabric-cli
description: Guide for interacting with Fabric through the Fabric-CLI `fab` command-line interface. It uses a filesystem-like interface where Fabric resources are navigated and managed like files and directories.
skillType: cli-tool
targetPlatform: Microsoft Fabric, Power BI
requiredTools: fabric-cli
version: 1.0
---

# Fabric CLI (fab) Interaction Skill

## Overview

The Fabric CLI (`fab`) provides a filesystem-like interface for managing Microsoft Fabric resources. This skill defines how AI agents should interact with the CLI to perform operations efficiently and safely.

## Prerequisites

- **CRITICAL:** The `fab` CLI is available. If not redirect user to the fabric-cli web site for instalation: https://microsoft.github.io/fabric-cli/

## Quick Start

**List all workspaces:**
```powershell
fab ls
```

**Interact with Fabric REST API:**
```powershell
fab api workspaces
```

## Critical Rules

### Communication
- ✅ Answer questions in concise, well-formatted bullet points
- ✅ Use only real commands and flags (never guess)
- ✅ Minimize commands and tool calls
- ⚠️ When uncertain, stop and ask for clarification

### Command Execution

| Rule | Reason | Example |
|------|--------|----------|
| Use `-f` flag | Avoid confirmation dialogs | `fab get "path" -f` |
| Use absolute paths | Prevent navigation errors | `/workspace.Workspace/item.Lakehouse` |
| Never use `cd` | Not supported | Use full paths instead |
| Don't use `auth` | User must re-authenticate manually | Prompt user to run `fab auth` |

### Error Response Protocol
- ❌ Do NOT guess commands or flags
- ❌ Do NOT attempt re-authentication via commands
- ✅ Stop and request user clarification
- ✅ Refer to help documentation first

## CLI Commands

### Getting Help

**List all available commands:**
```bash
fab
```

**Get help for specific command:**
```bash
fab <command> -h
```

### Flag Usage Policy

⚠️ **CRITICAL:** Only use flags that are explicitly documented for each command in this guide. Unknown flags may cause errors or unexpected behavior.

## Resource Structure and Navigation

The Fabric CLI uses a hierarchical filesystem-like structure to organize resources.

### Path Patterns

| Level | Pattern | Example |
|-------|---------|----------|
| Workspace | `/[workspace].Workspace` | `/workspace1.Workspace` |
| Item | `/[workspace].Workspace/[item].[Type]` | `/workspace1.Workspace/item1.Lakehouse` |
| Folder | `/[workspace].Workspace/[folder].Folder` | `/workspace1.Workspace/folderA.Folder` |
| Nested | `/[workspace].Workspace/[folder].Folder/[subfolder].Folder/[item].[Type]` | `/workspace1.Workspace/folderA.Folder/folderB.Folder/item2.Notebook` |
| OneLake File | `/[workspace].Workspace/[item].[Type]/Files/[path]` | `/workspace1.Workspace/item1.Lakehouse/Files/data.csv` |
| Virtual (Capacity) | `/.capacities/[capacity].Capacity` | `/.capacities/cap1.Capacity` |
| Virtual (Spark) | `/[workspace].Workspace/.sparkpools/[pool].SparkPool` | `/workspace1.Workspace/.sparkpools/spark1.SparkPool` |

### Operational Patterns

| Operation | Command | Purpose |
|-----------|---------|----------|
| Navigation | `fab cd <path>` | Set working context |
| Verification | `fab ls <path>` | Verify paths/items exist before operations |
| Counting | `fab ls <path> \| Measure-Object` | Count items using PowerShell |
| Force Operations | Add `-f` flag | Skip confirmation prompts |

### Item Type Suffixes

**CRITICAL:** Always use the correct suffix for item types.

#### Data Storage
| Suffix | Description |
|--------|-------------|
| `.Lakehouse` | Data lakehouses |
| `.Warehouse` | Data warehouses |
| `.KQLDatabase` | KQL databases |
| `.SQLDatabase` | SQL databases |
| `.MirroredDatabase` | Mirrored databases |

#### Analytics & BI
| Suffix | Description |
|--------|-------------|
| `.SemanticModel` | Semantic models |
| `.Report` | Power BI reports |
| `.KQLDashboard` | KQL dashboards |
| `.Reflex` | Real-time dashboards |

#### Data Processing
| Suffix | Description |
|--------|-------------|
| `.DataPipeline` | ETL pipelines |
| `.Notebook` | Spark notebooks |
| `.SparkJobDefinition` | Spark jobs |
| `.CopyJob` | Copy activities |

#### Real-Time & Streaming
| Suffix | Description |
|--------|-------------|
| `.Eventhouse` | Real-time analytics |
| `.Eventstream` | Streaming data |

#### Machine Learning
| Suffix | Description |
|--------|-------------|
| `.MLExperiment` | ML experiments |
| `.MLModel` | ML models |

#### Other
| Suffix | Description |
|--------|-------------|
| `.Environment` | Spark environments |
| `.KQLQueryset` | KQL query collections |
| `.MountedDataFactory` | Azure Data Factory |
| `.VariableLibrary` | Variable libraries |

**Get item type help:**
```bash
fab desc .ItemType
```


## Error Handling

### Exit Codes

| Code | Meaning | Action Required |
|------|---------|------------------|
| `0` | Success | Continue |
| `1` | General failure | Check error message |
| `2` | Syntax/command error | Verify command syntax |
| `4` | Authentication required | User must run `fab auth` |

### Common Error Messages

| Error | Cause | Resolution |
|-------|-------|------------|
| `[AuthenticationFailed]` | Token expired/invalid | User must re-authenticate with `fab auth` |
| `[NotFound]` | Invalid path | Verify item/workspace exists with `fab ls` |
| `[NotSupported]` | Unsupported operation | Check documentation for alternative approach |
| `[PermissionDenied]` | Insufficient access | User needs appropriate permissions |

### Error Response Protocol

1. ⚠️ Identify error type from message
2. 🔍 Check path syntax and item existence
3. 📖 Consult command help with `fab <command> -h`
4. 🛑 Do NOT attempt automatic fixes (especially for auth)
5. 💬 Communicate issue clearly to user

## Task: Count Resources

### Overview
Use PowerShell pipeline commands for counting operations.

### Count Patterns

#### Count All Workspaces
```powershell
(fab ls | Measure-Object).Count
```

#### Count Items by Type
```powershell
# Count Lakehouses (replace with other item types as needed)
(fab ls [WorkspaceName].Workspace | Select-String "\.Lakehouse").Count
```

#### Count OneLake Files
```powershell
# Files in a Lakehouse folder
(fab ls /[WorkspaceName].Workspace/[ItemName].Lakehouse/Files | Measure-Object).Count
```

#### Count Lakehouse Tables
```powershell
# Tables in a Lakehouse
(fab ls /[WorkspaceName].Workspace/[ItemName].Lakehouse/Tables | Measure-Object).Count
```

### Counting Best Practices

| ✅ Do | ❌ Don't |
|-------|----------|
| Use `Measure-Object` for total counts | Use external counting tools |
| Use `Select-String` for filtered counts | Parse output manually |
| Verify path exists before counting | Assume paths are valid |

## Task: Analyze Item Properties

### Overview
Retrieve metadata and properties from workspaces and items.

### Command Syntax

⚠️ **CRITICAL:** Always use the `-f` flag to avoid user prompts.

**Get specific property:**
```bash
fab get "<path>" -q "<property_name>" -f
```

**Get all properties:**
```bash
fab get "<path>" -q "." -f
```

**User JMESPath queries with `-q`:**

```bash
fab get "<path>" -q "<jmespath_query>" -f
```

Example to get path's of all parts of the definition of an item:

```bash
fab get [WorkspaceName].Workspace/[ItemName].[ItemType] -q definition.parts[*].path -f
```

Example to get semantic model table TMDL files:

# Get table definitions only

```bash
fab get "[WorkspaceName].Workspace/[ItemName].SemanticModel" -q "definition.parts[?contains(path, 'tables/')]" -f
```

### Examples

#### Workspace Properties
```bash
# Get specific property from workspace
fab get "/[WorkspaceName].Workspace" -q "[PropertyName]" -f
```

#### Item Properties
```bash
# Get specific property from item
fab get "/[WorkspaceName].Workspace/[ItemName].[ItemType]" -q "[PropertyName]" -f

# Get all properties from item
fab get "/[WorkspaceName].Workspace/[ItemName].[ItemType]" -q "." -f
```

### Query Flags

| Flag | Purpose | Example |
|------|---------|----------|
| `-q "<property>"` | Get specific property | `-q "displayName"` |
| `-q "."` | Get all properties | `-q "."` |
| `-f` | Force (no prompts) | Required for all operations |

## Task: Analyze Table Schemas in OneLake

### Supported Item Types

Table schema analysis is available for:
- `.Lakehouse`
- `.Warehouse`
- `.MirroredDatabase`
- `.SQLDatabase`
- `.SemanticModel`
- `.KQLDatabase`

### Workflow

#### Step 1: List Tables
```bash
fab ls [WorkspaceName].Workspace/[ItemName].[ItemType]/tables/[SchemaName]/Tables
```

#### Step 2: Get Table Schema
```bash
fab table schema [WorkspaceName].Workspace/[ItemName].[ItemType]/tables/[SchemaName]/Tables/[TableName]
```

### Example: Lakehouse Table Schema Analysis

```powershell
# List all tables in dbo schema
fab ls MyWorkspace.Workspace/MyLakehouse.Lakehouse/tables/dbo/Tables

# Get schema for specific table
fab table schema MyWorkspace.Workspace/MyLakehouse.Lakehouse/tables/dbo/Tables/SalesData
```

### Schema Information Retrieved

The schema output typically includes:
- Column names
- Data types
- Nullability
- Primary keys
- Indexes (where applicable)

## Task: Analyze Item Definitions/Code

### Overview
Extract full code definitions and implementation details from Fabric items.

### When to Use
Use this task when asked about:
- Item structure or contents
- Implementation details
- Code definitions
- Configuration details

### Command Pattern

⚠️ **CRITICAL:** Always use the `-f` flag to avoid user prompts.

```bash
fab get "<path>" -q "definition" -f
```

### Examples by Item Type

#### Semantic Model (TMDL)
```bash
# Get full TMDL definition (tables, measures, relationships, etc.)
fab get "/[WorkspaceName].Workspace/[ItemName].SemanticModel" -q "definition" -f
```

#### Report (PBIR)
```bash
# Get full report definition
fab get "/[WorkspaceName].Workspace/[ItemName].Report" -q "definition" -f
```

#### Other Items
```bash
# Get definition for any item type
fab get "/[WorkspaceName].Workspace/[ItemName].[ItemType]" -q "definition" -f
```

### Output Format

The output format depends on the item type:
- **Semantic Models**: TMDL (Tabular Model Definition Language)
- **Reports**: PBIR (Power BI Report format)
- **Notebooks**: JSON with cell definitions
- **Pipelines**: JSON with pipeline configuration

## Task: Item operations

### Overview
Common operations over Fabric Items

### Command Syntax

**Rename item**

```bash
fab set "[WorkspaceName].Workspace/[ItemName].[ItemType]" -q displayName -i "[NewName]" -f
```

## Task: Use Fabric REST APIs

### Overview
Direct interaction with Fabric and Power BI REST APIs using the `fab api` command.

### Command Syntax

```bash
fab api <endpoint> [options]
```

### Audience Flag

The `-A` flag specifies the target service:

| Flag | Service | Default |
|------|---------|----------|
| `-A fabric` | Fabric REST API | Yes |
| `-A powerbi` | Power BI REST API | No |

### HTTP Methods

Use `-X` flag to specify HTTP method:
- `-X get` - Retrieve data
- `-X post` - Create or execute
- `-X put` - Update
- `-X delete` - Remove

### Examples

#### Fabric API: Get Capacities
```bash
fab api 'capacities' -X get
```

#### Power BI API: Execute DAX Query
```bash
fab api -A powerbi -X post groups/{workspaceId}/datasets/{datasetId}/executeQueries -i '{"queries":[{"query":"EVALUATE SUMMARIZECOLUMNS('\''Table'\''[Column], \"@ColumnName\", SUM('\''Sales'\''[Amount]))"}]}'
```

#### Power BI API: Get Refresh History
```bash
fab api -A powerbi -X get groups/{workspaceId}/datasets/{datasetId}/refreshes
```

### Input Data

Use `-i` flag to pass JSON payload:
```bash
fab api <endpoint> -X post -i '<json_data>'
```

### Getting Help

```bash
fab api -h
```

## References and Documentation

### When to Consult Documentation

Refer to documentation when:
- Uncertain about command syntax
- Command flags are unclear
- Path patterns seem incorrect
- Error messages are ambiguous

### Official Documentation Links

| Resource | URL | Purpose |
|----------|-----|----------|
| Main Documentation | https://microsoft.github.io/fabric-cli/ | Complete reference |
| Cheat Sheet | https://microsoft.github.io/fabric-cli/cheatsheet.html | Quick reference |
| Workspace Examples | https://microsoft.github.io/fabric-cli/examples/workspace_examples.html | Workspace operations |
| Item Examples | https://microsoft.github.io/fabric-cli/examples/item_examples.html | Item and OneLake operations |

### Troubleshooting Steps

1. ✅ Check command syntax with `fab <command> -h`
2. ✅ Verify path format with `fab ls`
3. ✅ Consult cheat sheet for quick reference
4. ✅ Search specific examples in documentation
5. ⚠️ If still uncertain, ask user for clarification

### Using Web Search Tool

When encountering difficulties after checking built-in help, use the Web Search tool to fetch latest documentation from the official links above.