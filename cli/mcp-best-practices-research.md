# MCP (Model Context Protocol) Best Practices for Building Servers and Tools

> **Research Summary** | December 2025  
> Sources: [MCP Specification](https://modelcontextprotocol.io/specification), [modelcontextprotocol/servers](https://github.com/modelcontextprotocol/servers), Official Documentation

---

## 1. Tool Naming Conventions

### Official Specification Guidelines

From the MCP specification (2025-11-25):

| Rule | Guideline |
|------|-----------|
| **Length** | 1-128 characters (inclusive) |
| **Case** | Case-sensitive |
| **Allowed Characters** | `A-Z`, `a-z`, `0-9`, `_` (underscore), `-` (hyphen), `.` (dot) |
| **Forbidden** | Spaces, commas, or other special characters |
| **Uniqueness** | Must be unique within a server |

### Valid Examples from Spec
```
getUser
DATA_EXPORT_v2
admin.tools.list
```

### Recommended Naming Patterns

Based on analysis of official MCP servers (`modelcontextprotocol/servers`):

| Pattern | Style | Examples | Use Case |
|---------|-------|----------|----------|
| **Verb-first kebab-case** | `verb-noun` | `get-weather`, `create-file`, `trigger-long-running-operation` | General tools (recommended for readability) |
| **snake_case** | `verb_noun` | `get_weather`, `read_file`, `search_files` | Filesystem server, Python SDKs |
| **camelCase** | `verbNoun` | `getUser`, `createBranch` | TypeScript/JavaScript conventions |
| **Dot notation** | `domain.action` | `admin.tools.list`, `git.status` | Namespaced/grouped tools |

### Best Practice Recommendations

1. **Choose ONE convention per server** – Consistency is paramount
2. **Use verb-first naming** – Makes intent clear (e.g., `get-alerts` vs `alerts`)
3. **Be descriptive** – `get-weather-forecast` > `weather` > `w`
4. **Use kebab-case for tool names** (recommended by MCP "Everything" server guidelines)
5. **Avoid abbreviations** unless universally understood
6. **Group related tools with prefixes/dots** – e.g., `git.status`, `git.commit`, `git.branch`

```typescript
// ✅ Good
"read_text_file"
"get-structured-content"
"create_entities"

// ❌ Avoid
"rtf"           // Too abbreviated
"File Reader"   // Contains space
"getData!!!"    // Special characters
```

---

## 2. Tool Descriptions

### Specification Requirements

A tool definition includes:
- `name`: Unique identifier
- `title`: Optional human-readable display name
- `description`: Human-readable description of functionality
- `inputSchema`: JSON Schema defining expected parameters
- `outputSchema`: Optional JSON Schema for output structure
- `annotations`: Optional behavioral hints

### Description Best Practices

#### Structure
```json
{
  "name": "search_files",
  "title": "Search Files",
  "description": "Recursively search for files and directories matching a pattern. Searches through all subdirectories from the starting path. The search is case-insensitive. Returns full paths of all matching files. Only works within allowed directories.",
  "inputSchema": { ... }
}
```

#### What to Include

| Element | Purpose | Example |
|---------|---------|---------|
| **Primary function** | What does it do? | "Get current weather information for a location" |
| **Behavior details** | How does it work? | "Recursively searches through all subdirectories" |
| **Return format** | What comes back? | "Returns full paths of all matching files" |
| **Constraints** | What are the limits? | "Only works within allowed directories" |
| **Error conditions** | When does it fail? | "Returns error if path is outside allowed directories" |

#### Length Guidelines

- **Minimum**: 1-2 sentences describing core functionality
- **Recommended**: 3-5 sentences covering function, behavior, and constraints
- **Maximum**: Keep under ~500 characters for best LLM comprehension

#### Real-World Examples from Official Servers

```typescript
// Filesystem Server
{
  name: "edit_file",
  title: "Edit File",
  description: "Make line-based edits to a text file. Each edit replaces exact line sequences with new content. Returns a git-style diff showing the changes made. Only works within allowed directories."
}

// Memory Server  
{
  name: "search_nodes",
  title: "Search Nodes",
  description: "Search for nodes in the knowledge graph based on a query"
}

// Sequential Thinking Server
{
  name: "sequentialthinking",
  title: "Sequential Thinking",
  description: `A detailed tool for dynamic and reflective problem-solving through thoughts.
This tool helps analyze problems through a flexible thinking process that can adapt and evolve.
Each thought can build on, question, or revise previous insights as understanding deepens.

When to use this tool:
- Breaking down complex problems into steps
- Planning and design with room for revision
- Analysis that might need course correction
- Problems where the full scope might not be clear initially`
}
```

---

## 3. Versioning

### Protocol Versioning

MCP uses **date-based version identifiers**: `YYYY-MM-DD`

| Version | Status | Notes |
|---------|--------|-------|
| `2025-11-25` | Current | Latest stable release |
| `2025-06-18` | Final | Previous release |
| `draft` | Draft | In-progress specifications |

### Version Negotiation

- Happens during initialization handshake
- Client sends `protocolVersion` in `initialize` request
- Server responds with supported version
- Both parties MUST agree on a single version for the session

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "initialize",
  "params": {
    "protocolVersion": "2025-11-25",
    "capabilities": { ... },
    "clientInfo": {
      "name": "example-client",
      "version": "1.0.0"
    }
  }
}
```

### Server Versioning Best Practices

1. **Declare server version in initialization**:
```typescript
const server = new McpServer({
  name: "my-mcp-server",
  version: "1.2.0"  // Your server's semantic version
});
```

2. **Use semantic versioning** for your server package
3. **Document protocol compatibility** in README
4. **Support multiple protocol versions** if possible for backwards compatibility

---

## 4. Breaking Changes & Deprecation

### The Challenge

MCP does **not** have a formal deprecation mechanism in the protocol. However, there are patterns to follow:

### Handling Tool Renames

**Option 1: Keep both tools (Recommended)**
```typescript
// Old tool (deprecated but maintained)
server.registerTool(
  "read_file",
  {
    title: "Read File (Deprecated)",
    description: "Read the complete contents of a file as text. DEPRECATED: Use read_text_file instead.",
    inputSchema: ReadTextFileArgsSchema.shape
  },
  readTextFileHandler
);

// New tool
server.registerTool(
  "read_text_file",
  {
    title: "Read Text File",
    description: "Read the complete contents of a file from the file system as text...",
    inputSchema: ReadTextFileArgsSchema.shape
  },
  readTextFileHandler
);
```

**Option 2: Use `notifications/tools/list_changed`**
- When tools change, emit notification
- Clients can re-fetch tool list
- Enables dynamic tool availability

### Deprecation Strategies

| Strategy | Implementation | Pros | Cons |
|----------|----------------|------|------|
| **Description warning** | Add "DEPRECATED:" prefix | Clear to LLMs and humans | Tool still appears as option |
| **Dual registration** | Keep old + new names | Zero breaking changes | Maintenance overhead |
| **List changed notification** | Emit when tools change | Dynamic updates | Requires client support |
| **Semantic versioning** | Major version bump | Clear contract | Breaks existing clients |

### Recommended Deprecation Pattern

```typescript
// 1. Mark as deprecated in description
{
  name: "old_tool_name",
  description: "DEPRECATED: Use new_tool_name instead. [Original description]",
  // ... rest of config
}

// 2. Maintain for at least 2 major versions or 6 months

// 3. Log usage of deprecated tools
server.registerTool("old_tool_name", config, async (args) => {
  console.warn("Deprecated tool 'old_tool_name' called. Migration recommended.");
  return handler(args);
});

// 4. Provide migration guide in documentation
```

### List Changed Notification

When tools change at runtime:
```json
{
  "jsonrpc": "2.0",
  "method": "notifications/tools/list_changed"
}
```

Enable in capabilities:
```json
{
  "capabilities": {
    "tools": {
      "listChanged": true
    }
  }
}
```

---

## 5. Schema Design

### Input Schema Best Practices

Use JSON Schema (defaults to 2020-12):

```typescript
// Using Zod (recommended for TypeScript)
const GetSumSchema = z.object({
  a: z.number().describe("First number"),
  b: z.number().describe("Second number"),
});

// Tool registration
server.registerTool("get-sum", {
  title: "Get Sum Tool",
  description: "Returns the sum of two numbers",
  inputSchema: GetSumSchema
}, handler);
```

### Schema Patterns

**Tool with required parameters:**
```json
{
  "inputSchema": {
    "type": "object",
    "properties": {
      "location": {
        "type": "string",
        "description": "City name or zip code"
      }
    },
    "required": ["location"]
  }
}
```

**Tool with no parameters:**
```json
{
  "inputSchema": {
    "type": "object",
    "additionalProperties": false
  }
}
```

**Tool with optional parameters and defaults:**
```typescript
const EditFileArgsSchema = z.object({
  path: z.string(),
  edits: z.array(z.object({
    oldText: z.string().describe("Text to search for - must match exactly"),
    newText: z.string().describe("Text to replace with")
  })),
  dryRun: z.boolean().default(false).describe("Preview changes using git-style diff format")
});
```

### Output Schema (Structured Content)

When you need typed/validated outputs:

```json
{
  "name": "get_weather_data",
  "outputSchema": {
    "type": "object",
    "properties": {
      "temperature": {
        "type": "number",
        "description": "Temperature in celsius"
      },
      "conditions": {
        "type": "string",
        "description": "Weather conditions description"
      },
      "humidity": {
        "type": "number",
        "description": "Humidity percentage"
      }
    },
    "required": ["temperature", "conditions", "humidity"]
  }
}
```

Response with `structuredContent`:
```json
{
  "result": {
    "content": [
      {
        "type": "text",
        "text": "{\"temperature\": 22.5, \"conditions\": \"Partly cloudy\", \"humidity\": 65}"
      }
    ],
    "structuredContent": {
      "temperature": 22.5,
      "conditions": "Partly cloudy",
      "humidity": 65
    }
  }
}
```

**Key Rule**: For backwards compatibility, tools returning structured content SHOULD also include serialized JSON in a TextContent block.

### Tool Annotations (Behavioral Hints)

MCP supports optional annotations describing tool behavior:

```typescript
server.registerTool(
  "write_file",
  {
    title: "Write File",
    description: "Create or overwrite a file...",
    inputSchema: { ... },
    outputSchema: { content: z.string() },
    annotations: { 
      readOnlyHint: false,      // Tool modifies state
      idempotentHint: true,     // Same call = same result
      destructiveHint: true     // Can cause data loss
    }
  },
  handler
);
```

| Annotation | Meaning | Example Tools |
|------------|---------|---------------|
| `readOnlyHint: true` | Doesn't modify state | `read_file`, `list_directory`, `search_files` |
| `readOnlyHint: false` | Modifies state | `write_file`, `delete_file`, `create_directory` |
| `idempotentHint: true` | Repeatable safely | `create_directory` (mkdir -p behavior) |
| `idempotentHint: false` | May have different effects | `edit_file` (re-applying can fail) |
| `destructiveHint: true` | Can cause data loss | `write_file`, `edit_file`, `delete_file` |
| `destructiveHint: false` | Safe operation | `read_file`, `move_file` |

⚠️ **Security Note**: Clients MUST consider tool annotations untrusted unless from trusted servers.

---

## 6. Error Handling

### Two Error Types

#### 1. Protocol Errors (JSON-RPC)
For structural/protocol issues:

```json
{
  "jsonrpc": "2.0",
  "id": 3,
  "error": {
    "code": -32602,
    "message": "Unknown tool: invalid_tool_name"
  }
}
```

| Code | Meaning |
|------|---------|
| `-32700` | Parse error |
| `-32600` | Invalid request |
| `-32601` | Method not found |
| `-32602` | Invalid params |
| `-32603` | Internal error |

#### 2. Tool Execution Errors
For business logic / runtime errors:

```json
{
  "jsonrpc": "2.0",
  "id": 4,
  "result": {
    "content": [
      {
        "type": "text",
        "text": "Invalid departure date: must be in the future. Current date is 08/08/2025."
      }
    ],
    "isError": true
  }
}
```

### Best Practices

1. **Use `isError: true` for recoverable errors** – LLMs can retry with different params
2. **Provide actionable error messages** – Include what went wrong AND how to fix
3. **Include context** – Current state, valid ranges, examples

```typescript
// ✅ Good error message
{
  "isError": true,
  "content": [{
    "type": "text",
    "text": "Invalid departure date: must be in the future. Current date is 08/08/2025. Please provide a date after today."
  }]
}

// ❌ Poor error message
{
  "isError": true,
  "content": [{
    "type": "text",
    "text": "Error: invalid date"
  }]
}
```

### Error Handling Guidelines

| Scenario | Error Type | Response Pattern |
|----------|------------|------------------|
| Tool doesn't exist | Protocol Error | JSON-RPC `-32602` |
| Invalid argument type | Protocol Error | JSON-RPC `-32602` |
| Invalid argument value | Tool Execution | `isError: true` with guidance |
| API rate limit | Tool Execution | `isError: true` with retry suggestion |
| Permission denied | Tool Execution | `isError: true` with context |
| Transient failure | Tool Execution | `isError: true`, suggest retry |

---

## 7. Security Considerations

### Server Requirements (MUST)

1. **Validate all tool inputs**
2. **Implement proper access controls**
3. **Rate limit tool invocations**
4. **Sanitize tool outputs**

### Client Recommendations (SHOULD)

1. **Human-in-the-loop**: Prompt for confirmation on sensitive operations
2. **Show tool inputs** before calling (prevent data exfiltration)
3. **Validate tool results** before passing to LLM
4. **Implement timeouts** for tool calls
5. **Log tool usage** for audit purposes

### Content Annotations for Security

```json
{
  "type": "text",
  "text": "Sensitive data here",
  "annotations": {
    "audience": ["user"],      // Only show to user, not assistant
    "priority": 1.0            // High priority content
  }
}
```

| Audience Value | Meaning |
|----------------|---------|
| `["user"]` | Show only to human user |
| `["assistant"]` | Show only to LLM |
| `["user", "assistant"]` | Show to both |

---

## 8. Quick Reference Checklist

### New Tool Checklist

- [ ] Name follows convention (1-128 chars, allowed characters only)
- [ ] Name is unique within server
- [ ] `title` provided for human-readable display
- [ ] `description` covers: function, behavior, constraints
- [ ] `inputSchema` uses JSON Schema with `.describe()` on all properties
- [ ] `outputSchema` provided if returning structured data
- [ ] `annotations` set for `readOnlyHint`, `idempotentHint`, `destructiveHint`
- [ ] Error handling returns actionable messages with `isError: true`
- [ ] Input validation implemented
- [ ] Security considerations addressed

### Server Checklist

- [ ] Server name and version declared
- [ ] Protocol version negotiated
- [ ] `tools` capability declared with `listChanged` if applicable
- [ ] Rate limiting implemented
- [ ] Logging for audit purposes
- [ ] Deprecation strategy documented

---

## 9. Example: Complete Tool Registration

```typescript
import { z } from "zod";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";

// 1. Define schema with descriptions
const SearchFilesSchema = z.object({
  path: z.string().describe("Starting directory for the search"),
  pattern: z.string().describe("Glob pattern to match files (e.g., '*.ts')"),
  excludePatterns: z.array(z.string())
    .optional()
    .default([])
    .describe("Patterns to exclude from search")
});

// 2. Register with full metadata
server.registerTool(
  "search_files",  // snake_case name
  {
    title: "Search Files",  // Human-readable title
    description: 
      "Recursively search for files and directories matching a pattern. " +
      "Searches through all subdirectories from the starting path. " +
      "The search is case-insensitive and returns full paths. " +
      "Only works within allowed directories.",
    inputSchema: SearchFilesSchema,
    outputSchema: { content: z.string() },
    annotations: { 
      readOnlyHint: true,
      idempotentHint: true,
      destructiveHint: false 
    }
  },
  // 3. Handler with error handling
  async (args) => {
    try {
      const validated = SearchFilesSchema.parse(args);
      const results = await searchFiles(validated);
      return {
        content: [{ type: "text", text: results.join("\n") }],
        structuredContent: { content: results.join("\n") }
      };
    } catch (error) {
      return {
        content: [{ 
          type: "text", 
          text: `Search failed: ${error.message}. Ensure path exists and pattern is valid.` 
        }],
        isError: true
      };
    }
  }
);
```

---

## References

- [MCP Specification (2025-11-25)](https://modelcontextprotocol.io/specification/2025-11-25)
- [MCP Tools Specification](https://modelcontextprotocol.io/specification/latest/server/tools)
- [Official MCP Servers Repository](https://github.com/modelcontextprotocol/servers)
- [Build an MCP Server Guide](https://modelcontextprotocol.io/docs/develop/build-server)
- [MCP Architecture Overview](https://modelcontextprotocol.io/docs/concepts/architecture)
- [Security Best Practices](https://modelcontextprotocol.io/specification/draft/basic/security_best_practices)
