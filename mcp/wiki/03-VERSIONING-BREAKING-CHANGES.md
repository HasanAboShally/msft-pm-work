# Versioning & Breaking Changes

**Purpose:** How to evolve MCP tools without breaking existing agents and workflows.

> **Key Principle:** Agents and workflows depend on tool names, parameters, and output schemas. Changes can break production systems.

---

## 1. What Counts as a Breaking Change?

### 🔴 Breaking Changes (Avoid)

| Change Type | Example | Impact |
|-------------|---------|--------|
| **Rename tool** | `create_workspace` → `new_workspace` | Agents can't find tool |
| **Remove tool** | Delete `delete_workspace` | Agents fail on invocation |
| **Rename required param** | `workspace_id` → `ws_id` | Agents send wrong param |
| **Add required param** | New required `capacity_id` | Existing calls fail |
| **Change param type** | `count: string` → `count: integer` | Type validation fails |
| **Remove output field** | Remove `created_at` from response | Agents expecting field fail |
| **Change output structure** | `{ items: [] }` → `{ data: [] }` | Parsing breaks |

### 🟢 Non-Breaking Changes (Safe)

| Change Type | Example | Why Safe |
|-------------|---------|----------|
| **Add optional param** | New optional `description` | Existing calls still work |
| **Add output field** | New `updated_at` in response | Agents ignore unknown fields |
| **Add new tool** | New `clone_workspace` | Existing tools unaffected |
| **Improve description** | Clarify tool description | Doesn't change behavior |
| **Add enum value** | New status `"archived"` | Existing values still work |

---

## 2. How to Handle Tool Evolution

### 2.1 When You Need to Rename a Tool

**Severity:** 🔴 Required (10) — Follow this process

**Process:**

1. **Keep both tools** (old and new)
2. **Mark old as deprecated** in description
3. **Old tool calls new tool** internally
4. **Announce deprecation** with timeline (minimum 6 months)
5. **Remove old tool** after deprecation period

**Example:**

```json
// Old tool (deprecated)
{
  "name": "create_workspace",
  "description": "DEPRECATED: Use 'create_fabric_workspace' instead. Will be removed March 2026. Creates a new workspace...",
  ...
}

// New tool
{
  "name": "create_fabric_workspace",
  "description": "Creates a new Fabric workspace in the specified capacity...",
  ...
}
```

### 2.2 When You Need to Add a Required Parameter

**Severity:** 🔴 Required (10) — Never add required params to existing tools

**Options:**

| Option | When to Use |
|--------|-------------|
| **Make it optional with default** | If a sensible default exists |
| **Create new tool version** | If no default makes sense |
| **Create separate tool** | If use case is significantly different |

**Example - Option A (Preferred):**
```json
// Before: implicit default
{
  "capacity_id": {
    "type": "string",
    "description": "Capacity ID. Default: user's default capacity.",
    "required": false
  }
}
```

**Example - Option B (New Version):**
```
create_workspace     → Keep as-is (legacy)
create_workspace_v2  → New version with required param
```

### 2.3 When You Need to Change Output Schema

**Severity:** 🟠 Strong (8) — Additive only

**Rules:**
- ✅ ADD new fields (safe)
- ❌ REMOVE existing fields (breaking)
- ❌ RENAME existing fields (breaking)
- ❌ CHANGE field types (breaking)

**If you must change output:**
1. Add new fields alongside old ones
2. Document old fields as deprecated
3. Remove old fields after deprecation period

**Example:**
```json
// Phase 1: Add new field
{
  "created": "2025-01-15",          // Old (deprecated)
  "created_at": "2025-01-15T10:30:00Z"  // New (preferred)
}

// Phase 2 (6 months later): Remove old field
{
  "created_at": "2025-01-15T10:30:00Z"
}
```

---

## 3. Deprecation Process

### 3.1 Timeline

| Stage | Duration | Actions |
|-------|----------|---------|
| **Announce** | Day 0 | Update description, notify in Teams, release notes |
| **Soft Deprecation** | 0-3 months | Tool works, warnings logged, docs updated |
| **Hard Deprecation** | 3-6 months | Tool works, returns warning in response |
| **Removal** | 6+ months | Tool removed |

### 3.2 Deprecation Notice Format

In tool description:
```
⚠️ DEPRECATED: This tool will be removed on {DATE}. 
Use '{new_tool_name}' instead. 
Migration guide: {link}
```

In response (optional, during hard deprecation):
```json
{
  "result": { ... },
  "_deprecation_warning": {
    "message": "This tool is deprecated and will be removed on 2026-03-01",
    "replacement": "create_fabric_workspace",
    "migration_guide": "https://..."
  }
}
```

### 3.3 Notification Channels

When deprecating a tool:

- [ ] Update tool description with warning
- [ ] Post in `Fabric MCP Platform` Teams channel
- [ ] Add to release notes
- [ ] Update documentation
- [ ] Email known heavy users (if identifiable)

---

## 4. MCP Protocol Versioning

MCP uses date-based versioning: `YYYY-MM-DD`

**Current version:** `2025-11-05`

### 4.1 Version Negotiation

During MCP handshake, client and server agree on version:

```json
// Client sends
{
  "protocolVersion": "2025-11-05"
}

// Server responds with supported version
{
  "protocolVersion": "2025-11-05"
}
```

### 4.2 Handling Version Differences

| Scenario | Behavior |
|----------|----------|
| Client newer than server | Server uses its version (older) |
| Server newer than client | Server downgrades to client version |
| Incompatible versions | Connection fails with error |

### 4.3 When Fabric MCP Updates Protocol Version

- Announce 3 months before enforcement
- Support previous version for 6 months
- Document migration steps

---

## 5. Semantic Versioning for Workload MCPs

If building your own workload MCP server (Path C), use semantic versioning:

```
MAJOR.MINOR.PATCH

1.0.0 → 1.1.0 → 1.2.0 → 2.0.0
```

| Version Change | When |
|----------------|------|
| **MAJOR** (2.0.0) | Breaking changes |
| **MINOR** (1.1.0) | New tools, non-breaking features |
| **PATCH** (1.0.1) | Bug fixes, doc updates |

**Communicate version in:**
- Server info response
- Documentation
- Release notes

---

## 6. Best Practices Summary

### DO ✅

- Add new optional parameters with defaults
- Add new fields to output schemas
- Create new tools for new functionality
- Maintain deprecated tools for 6 months minimum
- Communicate changes early and often
- Test backwards compatibility before release

### DON'T ❌

- Rename existing tools without deprecation period
- Remove required parameters
- Change parameter or output types
- Remove tools without notice
- Assume agents will adapt automatically

---

## 7. Impact Assessment Checklist

Before making any tool change, answer:

| Question | If Yes |
|----------|--------|
| Does this rename a tool? | Follow deprecation process |
| Does this remove a tool? | Follow deprecation process |
| Does this add a required param? | Make optional or create new tool |
| Does this rename a param? | Follow deprecation process |
| Does this change param type? | Create new tool |
| Does this remove output fields? | Follow deprecation process |
| Does this change output structure? | Follow deprecation process |

**If all answers are "No"** → Safe to proceed  
**If any answer is "Yes"** → Follow deprecation process

---

## 8. Communication Template

When announcing a deprecation:

```markdown
## 🔔 Deprecation Notice: {tool_name}

**What's changing:** {brief description}

**Timeline:**
- Soft deprecation: {date}
- Hard deprecation: {date}  
- Removal: {date}

**Replacement:** Use `{new_tool_name}` instead

**Migration steps:**
1. Update tool name from `{old}` to `{new}`
2. {any parameter changes}
3. {any output changes}

**Questions?** Post in Fabric MCP Platform Teams channel
```

---

## 📚 References

- [MCP Specification - Versioning](https://spec.modelcontextprotocol.io/)
- [Semantic Versioning](https://semver.org/)
- [API Evolution Best Practices](https://cloud.google.com/apis/design/compatibility)
