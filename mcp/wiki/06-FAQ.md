# FAQ & Troubleshooting

**Common questions answered.**

---

## General Questions

### Q: What's the difference between Remote MCP and Local MCP?

| Aspect | Remote MCP | Local MCP |
|--------|------------|-----------|
| **Where it runs** | Cloud (api.fabric.microsoft.com) | User's machine |
| **Auth** | OAuth2 (user signs in once) | Local tokens, interactive auth |
| **Best for** | Enterprise agents, production workflows | Developer tools, VS Code, CLI |
| **Latency** | Network dependent | Fast (local) |
| **Offline** | ❌ No | ✅ Yes (with cached tokens) |

### Q: Which path should I choose?

**Quick decision:**
- My API already exists → **Path A**
- Building dev tools / VS Code extension → **Path B**
- Building AI-specific generation/analysis → **Path C**

Still unsure? Post in Teams channel or join Office Hours.

### Q: How long does the process take?

| Path | Typical Timeline |
|------|------------------|
| Path A (Remote) | 2 weeks |
| Path B (Local) | 2-3 weeks |
| Path C (Own Server) | 4-6 weeks |

Timelines assume you come prepared with completed intake form and documentation.

### Q: What if I need to ship faster?

1. Come fully prepared (intake form, docs, examples complete)
2. Book time with us ahead of review deadline
3. For urgent customer needs, flag in submission and escalate via email

### Q: Who pays for hosting (Path C)?

Platform team provides shared infrastructure at no cost to your team:
- Endpoint hosting
- Auth infrastructure
- Audit logging
- Monitoring dashboards

You own compute costs for your tool logic (Azure resources your code runs on).

---

## Tool Design Questions

### Q: Can I use camelCase for tool names?

**No.** MCP tools in Fabric use `snake_case` for consistency.

- ❌ `createWorkspace`
- ✅ `create_workspace`

### Q: My tool needs 10+ parameters. Is that OK?

Generally, too many parameters is a sign the tool is doing too much. Consider:

1. **Split into multiple tools** — Can this be 2-3 focused tools?
2. **Use nested objects** — Group related params
3. **Make more optional** — Provide smart defaults

If you truly need 10+ params, document clearly and discuss in review.

### Q: Can I change a tool name after shipping?

**Yes, but carefully.** Follow the deprecation process:

1. Keep old tool (mark deprecated in description)
2. Add new tool with new name
3. Old tool calls new tool internally
4. Remove old tool after 6 months

See [Versioning & Breaking Changes](03-VERSIONING-BREAKING-CHANGES.md).

### Q: How should I handle long-running operations?

Operations >5 seconds must use async pattern:

1. Return immediately with `operation_id`
2. Provide polling endpoint for status
3. Return final result when complete

```json
// Initial response
{
  "operation_id": "op-12345",
  "status": "running"
}

// After polling
{
  "operation_id": "op-12345",
  "status": "completed",
  "result": { ... }
}
```

### Q: What annotations should I use?

| Annotation | Use When |
|------------|----------|
| `readOnlyHint: true` | Tool only reads data (GET/LIST) |
| `destructiveHint: true` | Tool deletes data |
| `idempotentHint: true` | Safe to retry (most tools) |

---

## Path A Questions (Remote MCP)

### Q: My API is in Preview. Can I still add it?

**Yes, with caveats:**
- Must be marked as Preview in tool description
- May require additional review
- Will be flagged to users/agents

### Q: The operation I need is covered by generic `create_item`. Do I need a new tool?

Probably not! If `create_item(type="YourItemType")` works, just:
1. Document the item type
2. Provide examples
3. No new tool code needed

Ask in Office Hours if unsure.

### Q: Who implements the tool code?

**Platform team** implements Path A tools. You provide:
- API documentation
- Test cases
- Validation of implementation

---

## Path B Questions (Local MCP)

### Q: Where's the contribution guide?

[microsoft/fabric-mcp](https://github.com/microsoft/fabric-mcp) — Check README and CONTRIBUTING.md.

### Q: What language is Local MCP written in?

TypeScript. Your tools should be TypeScript.

### Q: Can I submit a spec for review before implementing?

**Yes, recommended!** Post your spec in Teams channel with @fabricmcp tag. We'll review within 3 business days.

### Q: How are Local MCP releases handled?

Platform team manages releases:
- PRs merged on approval
- Releases typically weekly/bi-weekly
- Published to npm and VS Code marketplace

---

## Path C Questions (Own MCP Server)

### Q: Do I need to implement my own auth?

**No!** You MUST use shared platform auth. We provide:
- OAuth2 integration SDK
- Token validation library
- No custom auth code allowed

### Q: Who owns the SLA?

**You do.** When you launch a workload MCP, you commit to:
- Uptime target (e.g., 99.9%)
- Response time target (e.g., p95 < 2s)
- Support response time

### Q: What if there's an outage?

1. You investigate and resolve (your code)
2. If infra issue, escalate to platform team
3. Communicate to your users
4. Post-mortem if needed

### Q: Can I use any tech stack?

For the tool logic, yes (Python, C#, Node.js, etc.). However:
- Must integrate with our auth SDK
- Must use our logging SDK
- Must expose standard MCP protocol

---

## Security Questions

### Q: What security review is required?

| Path | Requirement |
|------|-------------|
| Path A | Platform team handles (you validate) |
| Path B | Standard open-source PR review |
| Path C | **Your team must complete security review** |

For Path C, complete threat model and security review before final approval.

### Q: What's the "double-check pattern"?

Our security model:

1. **MCP validates token** — User is authenticated
2. **Fabric API enforces RBAC** — User is authorized

You don't implement custom authorization. Fabric APIs check permissions. This ensures consistent security across all MCP tools.

### Q: Can my tool access data the user can't normally access?

**No.** Tools run with user's permissions. If user can't access a resource via UI/API, tool can't either.

---

## Process Questions

### Q: What's the review SLA?

- **Initial review:** 5 business days
- **Code review (Path B):** 5 business days
- **Architecture review (Path C):** Scheduled within 5 days of request

### Q: What if my request is declined?

You'll receive feedback explaining why. Common reasons:
- Should be different path (A→B, B→C, etc.)
- Tool design needs work
- Missing documentation
- Security concerns

Address feedback and resubmit, or discuss in Office Hours.

### Q: Can I expedite the process?

Yes, for legitimate urgent needs:
1. Flag urgency in submission
2. Email fabricmcp@microsoft.com with business justification
3. We'll prioritize if possible

### Q: How do I get updates on my submission?

- You'll receive email confirmation on submission
- Platform team updates via email
- Track in Teams channel if you prefer visibility

---

## Troubleshooting

### "My tool isn't showing up in agent's tool list"

Check:
1. Tool deployed to correct endpoint
2. Auth working (can you call any tools?)
3. Tool schema valid (test with MCP inspector)
4. Caching (some clients cache tool lists)

### "Users getting auth errors"

Check:
1. Using shared OAuth2 (not custom auth)
2. User has appropriate Fabric permissions
3. Token not expired
4. Correct scope requested

### "Tool returns wrong data format"

Check:
1. Output schema matches implementation
2. Testing with same inputs that fail
3. Edge cases (null values, empty arrays)

---

## Still Have Questions?

| Channel | Best For |
|---------|----------|
| **Teams: Fabric MCP Platform** | Quick questions, community discussion |
| **Office Hours (Thursdays 10-11am PST)** | Design discussions, complex questions |
| **Email: fabricmcp@microsoft.com** | Private/urgent matters |

---

## Feedback on This Wiki

Found an issue? Have a suggestion?

1. Edit directly and submit PR (if you have access)
2. Post feedback in Teams channel
3. Email fabricmcp@microsoft.com
