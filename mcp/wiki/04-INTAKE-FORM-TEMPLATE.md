# MCP Tool/Server Intake Form

**Purpose:** Complete this form before engaging the platform team. This ensures productive conversations and faster turnaround.

> **Submission:** After preparing this information, submit via [Microsoft Form](#link-tbd)

---

## 📋 Section 1: Basic Information

| Field | Your Answer |
|-------|-------------|
| **Workload Team** | _(e.g., Power BI, Data Factory, RTI, OneLake)_ |
| **PM Contact** | _(Name + alias)_ |
| **Engineering Contact** | _(Name + alias)_ |
| **Target Ship Date** | _(Quarter or specific date)_ |

---

## 📋 Section 2: Contribution Type

**Which path are you pursuing?** _(Select one)_

- [ ] **Path A:** Add tools to existing Remote MCP (Fabric public APIs)
- [ ] **Path B:** Contribute to Local MCP (open source)
- [ ] **Path C:** Build our own workload MCP server

---

## 📋 Section 3: Tool Proposals

For each tool you want to add, provide:

### Tool 1

| Field | Description |
|-------|-------------|
| **Tool Name** | _(e.g., `generate_dax_query`)_ |
| **Title** | _(Human-readable, e.g., "Generate DAX Query")_ |
| **Description** | _(2-3 sentences explaining what it does)_ |
| **Category** | _(e.g., analytics, data-integration, real-time)_ |

**Does a public API exist for this operation?**
- [ ] Yes → Provide API documentation link: _____________
- [ ] No, but it should be a public API → Explain: _____________
- [ ] No, this is AI-agent specific only

**Input Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| _param1_ | _string_ | _Yes_ | _Description_ |
| _param2_ | _integer_ | _No_ | _Description_ |

**Output Schema:**

```json
{
  "result": "string",
  "metadata": {
    "field1": "type"
  }
}
```

**Example Usage:**

```json
// Input
{
  "param1": "example value",
  "param2": 123
}

// Output
{
  "result": "example output",
  "metadata": { ... }
}
```

---

### Tool 2 _(Copy this section for additional tools)_

| Field | Description |
|-------|-------------|
| **Tool Name** | |
| **Title** | |
| **Description** | |
| **Category** | |

_(Continue with same fields as Tool 1)_

---

## 📋 Section 4: Business Justification

| Question | Your Answer |
|----------|-------------|
| **What problem does this solve?** | |
| **Who benefits?** (personas) | |
| **What's the customer impact if we don't ship this?** | |
| **Are there design partners or customers waiting?** | _(Yes/No, if yes list them)_ |

---

## 📋 Section 5: Technical Details

### For Path A (Remote MCP)

| Question | Your Answer |
|----------|-------------|
| **API Documentation Link** | |
| **Is API GA or Preview?** | |
| **Expected latency** | _(e.g., <500ms, 2-5s, >30s async)_ |
| **Rate limiting considerations** | |

### For Path B (Local MCP)

| Question | Your Answer |
|----------|-------------|
| **Have you reviewed contribution guidelines?** | Yes / No |
| **Estimated implementation effort** | _(days/weeks)_ |
| **Who will implement?** | |

### For Path C (Own MCP Server)

| Question | Your Answer |
|----------|-------------|
| **Why can't this be added to Remote MCP?** | |
| **Architecture proposal** | _(Attach or describe)_ |
| **SLA commitment** | _(uptime %, response time)_ |
| **Support model** | _(Who handles customer issues?)_ |
| **Hosting preference** | _(Azure region, scale requirements)_ |

---

## 📋 Section 6: Documentation Commitment

To appear in official Fabric MCP documentation, you must provide:

- [ ] Tool schema (JSON Schema format)
- [ ] At least 3 usage examples
- [ ] Error codes and remediation steps
- [ ] User-facing documentation (Learn article)

**Estimated documentation completion date:** _____________

---

## 📋 Section 7: Security & Compliance

| Question | Your Answer |
|----------|-------------|
| **Does your tool access user data?** | Yes / No |
| **Does your tool modify resources?** | Yes / No |
| **Have you completed threat modeling?** | Yes / No / In Progress |
| **Security review status** | Not Started / In Progress / Completed |

---

## ✅ Submission Checklist

Before submitting, confirm:

- [ ] All sections completed
- [ ] Tool names follow [naming conventions](02-TOOL-DESIGN-GUIDELINES.md)
- [ ] Descriptions follow [guidelines](02-TOOL-DESIGN-GUIDELINES.md)
- [ ] Reviewed [Quality Checklist](05-QUALITY-CHECKLIST.md)
- [ ] PM and Engineering contacts confirmed

---

## 📨 Submit

**Ready?** Submit this form via: [Microsoft Form Link](#link-tbd)

**What happens next:**
1. Platform team reviews within **5 business days**
2. We'll reach out to schedule a review meeting
3. Meeting outcome: Approved / Needs Changes / Declined with feedback

---

## 📞 Questions?

- **Teams:** `Fabric MCP Platform` channel
- **Office Hours:** Thursdays 10-11am PST
- **Email:** fabricmcp@microsoft.com
