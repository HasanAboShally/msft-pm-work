# MCP Tool Design Guidelines

**Purpose:** Standards for designing high-quality MCP tools that work well with AI agents.

> **Severity Legend:**  
> 🔴 Required (10) | 🟠 Strong (7-9) | 🟡 Recommended (4-6) | 🟢 Suggested (1-3)

---

## 1. Tool Naming

### 1.1 Format Rules

| Rule | Severity | Details |
|------|----------|---------|
| Use `snake_case` | 🟠 Strong (8) | `create_workspace`, not `createWorkspace` or `create-workspace` |
| Start with verb | 🟠 Strong (8) | `get_`, `create_`, `update_`, `delete_`, `list_`, `run_`, `generate_` |
| Keep it short | 🟡 Recommended (5) | 1-3 words preferred, max 5 words |
| Be specific | 🟠 Strong (7) | `create_lakehouse` not `create_resource` |
| Avoid abbreviations | 🟡 Recommended (5) | `get_workspace` not `get_ws` |

### 1.2 Naming Patterns

**Standard CRUD Operations:**
```
create_{resource}      → create_workspace
get_{resource}         → get_lakehouse
update_{resource}      → update_pipeline
delete_{resource}      → delete_notebook
list_{resources}       → list_warehouses (plural)
```

**Action Operations:**
```
run_{action}           → run_pipeline
execute_{action}       → execute_query
trigger_{action}       → trigger_refresh
generate_{output}      → generate_dax_query
analyze_{target}       → analyze_semantic_model
```

**Query/Search Operations:**
```
search_{resources}     → search_items
query_{target}         → query_kql_database
find_{target}          → find_tables
```

### 1.3 Naming Don'ts

| ❌ Avoid | ✅ Instead | Why |
|----------|-----------|-----|
| `createWorkspace` | `create_workspace` | Inconsistent casing |
| `workspace_create` | `create_workspace` | Verb should come first |
| `new_ws` | `create_workspace` | Unclear abbreviation |
| `doWorkspaceStuff` | `update_workspace` | Vague, not actionable |
| `workspace` | `get_workspace` | Missing verb |

### 1.4 Namespacing (For Workload MCPs)

If building a workload-specific MCP with many tools, consider dot notation:

```
powerbi.generate_dax
powerbi.analyze_model
powerbi.run_bpa

datafactory.create_pipeline
datafactory.optimize_dataflow
```

**Severity:** 🟡 Recommended (5) — Use when you have 10+ tools to avoid confusion

---

## 2. Tool Titles

The `title` field is the human-readable display name shown in UI.

| Rule | Severity | Details |
|------|----------|---------|
| Use Title Case | 🟠 Strong (7) | "Create Workspace" not "create workspace" |
| Match the verb | 🟠 Strong (7) | Tool `create_workspace` → Title "Create Workspace" |
| Keep concise | 🟡 Recommended (5) | 2-4 words |
| No technical jargon | 🟡 Recommended (5) | "Generate DAX Query" not "Generate DAX AST" |

**Examples:**

| Tool Name | Title |
|-----------|-------|
| `create_workspace` | Create Workspace |
| `list_lakehouses` | List Lakehouses |
| `generate_dax_query` | Generate DAX Query |
| `run_best_practice_analyzer` | Run Best Practice Analyzer |

---

## 3. Tool Descriptions

### 3.1 Structure

Every description should answer:
1. **What** does it do? (1 sentence)
2. **When** to use it? (optional, 1 sentence)
3. **What** does it return? (1 sentence)
4. **Constraints/Limits** (if any)

### 3.2 Template

```
{What it does}. {When to use/context}. Returns {output description}. {Constraints}.
```

### 3.3 Examples

**Good ✅:**
```
Creates a new workspace in the specified capacity. Use this to set up new project environments. Returns the workspace ID and metadata. Requires Contributor or higher permissions on the capacity.
```

**Bad ❌:**
```
Creates workspace.
```
_(Too brief, missing context)_

**Bad ❌:**
```
This tool allows you to create a new workspace in Microsoft Fabric. A workspace is a container for items like lakehouses, warehouses, notebooks, and more. When you call this tool, it will create the workspace and return information about it. You need to have the right permissions to do this.
```
_(Too verbose, buries key info)_

### 3.4 Description Rules

| Rule | Severity | Details |
|------|----------|---------|
| 2-4 sentences max | 🟠 Strong (7) | Agents parse descriptions; brevity helps |
| Start with verb | 🟠 Strong (8) | "Creates...", "Returns...", "Searches..." |
| Include return info | 🟠 Strong (7) | Agents need to know what they'll get |
| Mention constraints | 🟡 Recommended (6) | Permissions, limits, prerequisites |
| No marketing speak | 🟠 Strong (7) | "Creates workspace" not "Empowers you to..." |

---

## 4. Parameter Design

### 4.1 Parameter Naming

| Rule | Severity | Details |
|------|----------|---------|
| Use `snake_case` | 🟠 Strong (8) | `workspace_id`, not `workspaceId` |
| Be descriptive | 🟠 Strong (7) | `workspace_id` not `id` (when ambiguous) |
| Use standard suffixes | 🟡 Recommended (5) | `_id`, `_name`, `_path`, `_count` |

### 4.2 Required vs Optional

| Rule | Severity | Details |
|------|----------|---------|
| Minimize required params | 🟡 Recommended (6) | Fewer = easier for agents |
| Provide sensible defaults | 🟡 Recommended (6) | `max_results: 100` |
| Group related optionals | 🟢 Suggested (3) | Use nested objects |

### 4.3 Parameter Descriptions

Every parameter MUST have a description. Include:
- What it is
- Valid values/format (if not obvious)
- Default value (if optional)

**Example:**
```json
{
  "workspace_id": {
    "type": "string",
    "description": "The unique identifier (GUID) of the workspace. Found in workspace URL or settings."
  },
  "max_results": {
    "type": "integer",
    "description": "Maximum number of items to return. Default: 100. Max: 1000.",
    "default": 100
  }
}
```

---

## 5. Output Schema

### 5.1 Structure Guidelines

| Rule | Severity | Details |
|------|----------|---------|
| Always define `outputSchema` | 🟠 Strong (8) | Helps agents understand response |
| Use consistent field names | 🟠 Strong (7) | `created_at` everywhere, not sometimes `createdAt` |
| Include metadata | 🟡 Recommended (5) | `total_count`, `has_more`, `next_cursor` |

### 5.2 Pagination Pattern

For list operations, use consistent pagination:

```json
{
  "items": [...],
  "total_count": 150,
  "continuation_token": "abc123",
  "has_more": true
}
```

### 5.3 Error Responses

Include structured errors in your schema:

```json
{
  "error": {
    "code": "WORKSPACE_NOT_FOUND",
    "message": "Workspace with ID 'xyz' was not found.",
    "suggestion": "Verify the workspace ID and ensure you have access."
  }
}
```

---

## 6. Tool Annotations

MCP supports annotations to help agents understand tool behavior:

| Annotation | Purpose | When to Use |
|------------|---------|-------------|
| `readOnlyHint: true` | Tool doesn't modify data | GET/LIST operations |
| `destructiveHint: true` | Tool deletes or overwrites | DELETE operations |
| `idempotentHint: true` | Safe to retry | Most operations |
| `openWorldHint: true` | May interact with external systems | Calls external APIs |

**Example:**
```json
{
  "name": "delete_workspace",
  "annotations": {
    "destructiveHint": true,
    "idempotentHint": true
  }
}
```

**Severity:** 🟡 Recommended (6) — Helps agents make safer decisions

---

## 7. Async Operations

For long-running operations (>5 seconds):

### 7.1 Pattern

1. Tool returns immediately with `operation_id`
2. Agent polls status endpoint
3. Eventually gets final result

**Severity:** 🔴 Required (10) for operations >30 seconds

### 7.2 Response Format

**Initial Response:**
```json
{
  "operation_id": "op-12345",
  "status": "running",
  "estimated_completion": "2025-01-15T10:30:00Z"
}
```

**Polling Response:**
```json
{
  "operation_id": "op-12345",
  "status": "completed",
  "result": { ... }
}
```

**Status Values:** `pending`, `running`, `completed`, `failed`

---

## 8. Documentation Requirements

Every tool must have:

| Requirement | Severity | Format |
|-------------|----------|--------|
| JSON Schema | 🔴 Required (10) | Complete input/output schemas |
| 3+ Examples | 🟠 Strong (8) | Real-world usage scenarios |
| Error Codes | 🟠 Strong (7) | All possible errors + remediation |
| Permissions | 🟠 Strong (7) | What RBAC roles needed |

---

## ✅ Quick Checklist

Before submitting your tool design:

- [ ] Tool name is `verb_noun` in `snake_case`
- [ ] Title is human-readable Title Case
- [ ] Description is 2-4 sentences, starts with verb
- [ ] All parameters have descriptions
- [ ] Output schema is defined
- [ ] Error responses are documented
- [ ] Annotations added (readOnly, destructive, etc.)
- [ ] 3+ examples provided
- [ ] Permissions documented

---

## 📚 References

- [MCP Specification - Tools](https://spec.modelcontextprotocol.io/specification/2025-11-05/server/tools/)
- [JSON Schema](https://json-schema.org/)
- [Fabric API Naming Conventions](https://learn.microsoft.com/fabric/rest/api/)
