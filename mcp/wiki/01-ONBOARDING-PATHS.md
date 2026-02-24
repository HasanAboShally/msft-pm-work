# Onboarding Paths: Detailed Guide

**Purpose:** Step-by-step instructions for each contribution path.

---

## Path A: Add Tools to Remote MCP

**Best for:** Exposing existing Fabric public APIs to AI agents  
**Timeline:** ~2 weeks  
**Your effort:** Low (validation + documentation)

### Prerequisites

- [ ] Fabric public API exists and is GA (not Preview)
- [ ] You have API documentation ready
- [ ] You've reviewed [Tool Design Guidelines](02-TOOL-DESIGN-GUIDELINES.md)

### Step-by-Step Process

#### Step 1: Check if API Exists (Self-Serve)

Before submitting, verify:

1. **API is public and GA**
   - Check [Fabric REST API reference](https://learn.microsoft.com/fabric/rest/api/)
   - Preview APIs may be considered, but with caveats

2. **Operation is general-purpose**
   - Would developers want this in SDK/CLI too?
   - If AI-agent-specific only → Path C

3. **Check if tool already exists**
   - Review current Remote MCP tools (link TBD)
   - Some operations may already be covered by `create_item`, `get_item`, etc.

#### Step 2: Prepare Your Submission (Self-Serve)

Complete the [Intake Form](04-INTAKE-FORM-TEMPLATE.md):

- Tool name, title, description (following guidelines)
- Link to API documentation
- Input parameters and output schema
- 3+ example requests/responses
- Permission requirements

#### Step 3: Submit Request

1. Submit via [Microsoft Form](#link-tbd)
2. Platform team reviews within **5 business days**
3. You'll receive one of:
   - ✅ **Approved** — Scheduled for implementation
   - 🔄 **Needs Changes** — Feedback provided
   - ❌ **Declined** — Reasoning provided (e.g., should be Path B or C)

#### Step 4: Review Meeting (30 min)

- Walk through tool design
- Clarify edge cases
- Agree on implementation timeline

#### Step 5: Platform Team Implements

- Platform team writes the MCP tool code
- Tool added to Remote MCP server
- You receive staging access for validation

#### Step 6: Validate (Your Responsibility)

- [ ] Test tool with sample inputs
- [ ] Verify output matches expected schema
- [ ] Test error scenarios
- [ ] Confirm documentation is accurate

#### Step 7: Ship! 🚀

- Tool included in next Remote MCP release
- You provide user-facing documentation for Learn

---

## Path B: Contribute to Local MCP

**Best for:** Developer tools, VS Code/CLI integrations, open source contribution  
**Timeline:** 2-3 weeks  
**Your effort:** Medium (full implementation)

### Prerequisites

- [ ] Reviewed [Tool Design Guidelines](02-TOOL-DESIGN-GUIDELINES.md)
- [ ] GitHub access to [microsoft/fabric-mcp](https://github.com/microsoft/fabric-mcp)
- [ ] Familiarity with TypeScript (Local MCP is TypeScript-based)

### Step-by-Step Process

#### Step 1: Design Your Tool (Self-Serve)

Create a tool specification:

```markdown
## Tool: {tool_name}

### Description
{2-4 sentences}

### Parameters
| Name | Type | Required | Description |
|------|------|----------|-------------|
| ... | ... | ... | ... |

### Output Schema
{JSON schema}

### Examples
{3+ examples with input/output}

### Error Handling
{Error codes and messages}
```

#### Step 2: Optional Pre-Review

**Recommended for:** Complex tools, uncertain design decisions

1. Post spec in `Fabric MCP Platform` Teams channel
2. Tag @fabricmcp for review
3. We'll provide feedback within 3 business days

**Skip if:** Simple CRUD tool following existing patterns

#### Step 3: Fork and Implement

```bash
# Fork the repo
git clone https://github.com/YOUR-USERNAME/fabric-mcp
cd fabric-mcp

# Create feature branch
git checkout -b feature/your-tool-name

# Implement your tool
# Follow existing patterns in /src/tools/
```

#### Step 4: Implementation Checklist

- [ ] Tool follows naming conventions
- [ ] All parameters have descriptions
- [ ] Output schema defined
- [ ] Error handling implemented
- [ ] Unit tests added
- [ ] Integration test added
- [ ] Documentation updated in README

#### Step 5: Open Pull Request

```markdown
## Summary
{What does this PR add?}

## Tool Details
- Name: `{tool_name}`
- Description: {brief}

## Testing
- [ ] Unit tests pass
- [ ] Manual testing completed
- [ ] Tested with VS Code MCP extension

## Documentation
- [ ] README updated
- [ ] Examples added
```

#### Step 6: Code Review

- Platform team reviews within **5 business days**
- Address feedback, iterate
- Once approved → merged by platform team

#### Step 7: Release Coordination

- Tool included in next Local MCP release
- You're notified when published to npm/marketplace

---

## Path C: Build Your Own MCP Server

**Best for:** AI-specific capabilities that don't belong in public APIs  
**Timeline:** 4-6 weeks  
**Your effort:** High (full ownership)

### Prerequisites

- [ ] Reviewed [Tool Design Guidelines](02-TOOL-DESIGN-GUIDELINES.md)
- [ ] Confirmed this is NOT Path A or B (public API doesn't exist and shouldn't)
- [ ] Have engineering resources for implementation + maintenance
- [ ] Committed to SLA ownership

### When to Choose Path C

| Criteria | Example |
|----------|---------|
| AI-specific generation | `generate_dax_query`, `generate_kql` |
| Analysis/optimization | `optimize_pipeline`, `analyze_model` |
| Complex multi-step logic | `auto_remediate_issue` |
| Domain expertise required | Only your team can build this well |

### Step-by-Step Process

#### Step 1: Prepare Proposal (Self-Serve)

Complete [Intake Form](04-INTAKE-FORM-TEMPLATE.md) including:

- **Architecture proposal:** High-level design
- **Tool specifications:** All tools you plan to expose
- **SLA commitment:** Uptime, response time targets
- **Support model:** Who handles issues
- **Hosting requirements:** Scale, region preferences

#### Step 2: Submit and Review

1. Submit via [Microsoft Form](#link-tbd)
2. Platform team reviews within **5 business days**
3. We schedule **Architecture Review Meeting** (60 min)

#### Step 3: Architecture Review Meeting

Agenda:
- Walk through your architecture
- Discuss security model (must use shared auth)
- Agree on endpoint URL convention
- Review tool designs
- Establish timeline

Outcomes:
- ✅ Approved to proceed
- 🔄 Needs changes (follow-up meeting scheduled)
- ❌ Redirected to Path A or B

#### Step 4: Platform Provides Infrastructure

Once approved, we provision:

| Infrastructure | Details |
|----------------|---------|
| **Endpoint URL** | `api.fabric.microsoft.com/mcp/{your-workload}` |
| **Shared OAuth2** | You use platform auth (no custom auth code) |
| **Audit Logging** | Automatic logging of all tool calls |
| **Rate Limiting** | Standard policies applied |
| **Monitoring** | Shared dashboards, alerting |

**You receive:**
- Endpoint configuration
- Auth integration docs
- Logging SDK/guidelines
- Deployment runbook

#### Step 5: You Build Your MCP Server

Your responsibilities:

- [ ] Implement all tool logic
- [ ] Integrate with shared auth (follow our SDK)
- [ ] Add your tools' logging (via provided SDK)
- [ ] Write documentation (schema, examples, errors)
- [ ] Build tests
- [ ] Set up your CI/CD

#### Step 6: Complete Quality Checklist

Before final review, complete [Quality Checklist](05-QUALITY-CHECKLIST.md):

- [ ] Security review completed
- [ ] All tools follow design guidelines
- [ ] Documentation complete
- [ ] Error handling tested
- [ ] Performance validated
- [ ] Monitoring configured

#### Step 7: Final Review Meeting

- Demo your MCP server
- Walk through quality checklist
- Platform team validates auth/logging integration
- Agree on launch date

#### Step 8: Ship! 🚀

- Platform team enables your endpoint in production
- You announce to your users
- Begin SLA monitoring

### Ongoing Responsibilities

As a workload MCP owner, you own:

| Responsibility | Details |
|----------------|---------|
| **Tool Logic** | Bug fixes, feature enhancements |
| **Documentation** | Keep docs current |
| **SLA** | Meet committed uptime/response time |
| **Support** | Triage customer issues for your tools |
| **Security** | Respond to security incidents |
| **Evolution** | Follow deprecation process for changes |

Platform team continues to own:
- Shared auth infrastructure
- Audit logging infrastructure
- Rate limiting policies
- Monitoring dashboards (shared)

---

## Comparison Matrix

| Aspect | Path A (Remote) | Path B (Local) | Path C (Own Server) |
|--------|-----------------|----------------|---------------------|
| **Best for** | Public API exposure | Dev tools, open source | AI-specific logic |
| **Your effort** | Low | Medium | High |
| **Timeline** | 2 weeks | 2-3 weeks | 4-6 weeks |
| **Implementation** | Platform team | You (open source) | You (private) |
| **Hosting** | Platform managed | Client-side | Platform infra + your code |
| **Auth** | Platform handled | Client tokens | Shared platform auth |
| **Support** | Platform team | Community + you | You own |
| **Maintenance** | Platform team | Community + you | You own |

---

## Decision Flowchart

```
START: I want to add MCP capabilities
    │
    ▼
Q1: Does a public Fabric API exist?
    │
    ├─ YES ──────────────────────────────────► PATH A
    │                                           (Remote MCP)
    └─ NO
       │
       ▼
Q2: SHOULD this be a public API?
    (Would devs want SDK/CLI access?)
    │
    ├─ YES ──────────────────────────────────► Work with API team first
    │                                           Then PATH A
    └─ NO
       │
       ▼
Q3: Is this for local development scenarios?
    (VS Code, CLI, developer tools)
    │
    ├─ YES ──────────────────────────────────► PATH B
    │                                           (Local MCP contribution)
    └─ NO
       │
       ▼
Q4: Is this AI-agent-specific only?
    (Generation, analysis, optimization)
    │
    ├─ YES ──────────────────────────────────► PATH C
    │                                           (Own MCP Server)
    └─ UNCLEAR ──────────────────────────────► Ask in Office Hours
```

---

## Questions?

- **Teams:** `Fabric MCP Platform` channel
- **Office Hours:** Thursdays 10-11am PST
- **Email:** fabricmcp@microsoft.com
