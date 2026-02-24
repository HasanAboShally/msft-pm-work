# Quality Checklist

**Purpose:** Self-assessment before requesting platform team review.

> Complete this checklist before final review. Items marked 🔴 are blockers.

---

## 1. Tool Design Quality

### Naming & Description

| # | Check | Severity | ✓ |
|---|-------|----------|---|
| 1.1 | Tool name follows `verb_noun` pattern in `snake_case` | 🟠 Strong | ☐ |
| 1.2 | Tool name is unique (no conflicts with existing tools) | 🔴 Required | ☐ |
| 1.3 | Title is human-readable Title Case | 🟠 Strong | ☐ |
| 1.4 | Description is 2-4 sentences, starts with verb | 🟠 Strong | ☐ |
| 1.5 | Description explains what tool returns | 🟠 Strong | ☐ |
| 1.6 | Description mentions constraints/permissions if any | 🟡 Recommended | ☐ |

### Parameters

| # | Check | Severity | ✓ |
|---|-------|----------|---|
| 2.1 | All parameters use `snake_case` | 🟠 Strong | ☐ |
| 2.2 | Every parameter has a description | 🔴 Required | ☐ |
| 2.3 | Required vs optional clearly marked | 🔴 Required | ☐ |
| 2.4 | Optional parameters have sensible defaults | 🟡 Recommended | ☐ |
| 2.5 | Parameter types are correct (string, integer, etc.) | 🔴 Required | ☐ |
| 2.6 | Enum values documented where applicable | 🟠 Strong | ☐ |

### Output Schema

| # | Check | Severity | ✓ |
|---|-------|----------|---|
| 3.1 | Output schema is defined | 🟠 Strong | ☐ |
| 3.2 | All output fields have descriptions | 🟠 Strong | ☐ |
| 3.3 | Consistent field naming (matches input conventions) | 🟠 Strong | ☐ |
| 3.4 | Pagination uses standard pattern (items, continuation_token) | 🟠 Strong | ☐ |

---

## 2. Documentation Quality

| # | Check | Severity | ✓ |
|---|-------|----------|---|
| 4.1 | JSON Schema complete and valid | 🔴 Required | ☐ |
| 4.2 | At least 3 usage examples provided | 🟠 Strong | ☐ |
| 4.3 | Examples show realistic scenarios | 🟡 Recommended | ☐ |
| 4.4 | Error codes documented | 🟠 Strong | ☐ |
| 4.5 | Error messages include remediation hints | 🟡 Recommended | ☐ |
| 4.6 | Permission requirements documented | 🟠 Strong | ☐ |
| 4.7 | Rate limits documented (if different from default) | 🟡 Recommended | ☐ |

---

## 3. Behavioral Quality

### Error Handling

| # | Check | Severity | ✓ |
|---|-------|----------|---|
| 5.1 | Invalid input returns clear error message | 🔴 Required | ☐ |
| 5.2 | Missing required params return specific error | 🔴 Required | ☐ |
| 5.3 | Auth failures return 401/403 appropriately | 🔴 Required | ☐ |
| 5.4 | Not found returns 404 with helpful message | 🟠 Strong | ☐ |
| 5.5 | Server errors don't leak sensitive info | 🔴 Required | ☐ |

### Async Operations (if applicable)

| # | Check | Severity | ✓ |
|---|-------|----------|---|
| 6.1 | Long operations (>5s) use async pattern | 🔴 Required | ☐ |
| 6.2 | Returns operation_id immediately | 🔴 Required | ☐ |
| 6.3 | Status polling endpoint works | 🔴 Required | ☐ |
| 6.4 | Final result retrievable via operation_id | 🔴 Required | ☐ |
| 6.5 | Timeout behavior documented | 🟠 Strong | ☐ |

### Performance

| # | Check | Severity | ✓ |
|---|-------|----------|---|
| 7.1 | Typical response time < 5 seconds (or async) | 🟠 Strong | ☐ |
| 7.2 | List operations paginate (max 1000 items) | 🟠 Strong | ☐ |
| 7.3 | No unbounded queries | 🔴 Required | ☐ |

---

## 4. Security Quality

| # | Check | Severity | ✓ |
|---|-------|----------|---|
| 8.1 | Uses shared OAuth2 authentication (no custom auth) | 🔴 Required | ☐ |
| 8.2 | Relies on Fabric API RBAC (double-check pattern) | 🔴 Required | ☐ |
| 8.3 | No hardcoded credentials | 🔴 Required | ☐ |
| 8.4 | No sensitive data in logs | 🔴 Required | ☐ |
| 8.5 | Input validation prevents injection | 🔴 Required | ☐ |
| 8.6 | Security review completed (Path C only) | 🔴 Required | ☐ |
| 8.7 | Threat model documented (Path C only) | 🟠 Strong | ☐ |

---

## 5. Operational Quality (Path C Only)

| # | Check | Severity | ✓ |
|---|-------|----------|---|
| 9.1 | Audit logging integrated (using platform SDK) | 🔴 Required | ☐ |
| 9.2 | Health endpoint implemented | 🟠 Strong | ☐ |
| 9.3 | Monitoring/alerting configured | 🟠 Strong | ☐ |
| 9.4 | SLA documented and committed | 🟠 Strong | ☐ |
| 9.5 | Support escalation path defined | 🟠 Strong | ☐ |
| 9.6 | Runbook for common issues created | 🟡 Recommended | ☐ |

---

## 6. Testing Quality

| # | Check | Severity | ✓ |
|---|-------|----------|---|
| 10.1 | Unit tests cover core logic | 🟠 Strong | ☐ |
| 10.2 | Integration tests verify end-to-end | 🟠 Strong | ☐ |
| 10.3 | Error scenarios tested | 🟠 Strong | ☐ |
| 10.4 | Tested with actual AI agent/client | 🟠 Strong | ☐ |
| 10.5 | Load testing completed (Path C only) | 🟡 Recommended | ☐ |

---

## Summary Scorecard

| Category | Required (🔴) | Strong (🟠) | Recommended (🟡) |
|----------|---------------|-------------|------------------|
| Tool Design | /3 | /11 | /2 |
| Documentation | /1 | /5 | /2 |
| Behavior | /7 | /4 | /1 |
| Security | /5 | /1 | /0 |
| Operations (C) | /1 | /4 | /1 |
| Testing | /0 | /4 | /1 |

**Submission Requirements:**
- ✅ All 🔴 Required items must be checked
- ✅ At least 80% of 🟠 Strong items checked
- ℹ️ 🟡 Recommended items are advisory

---

## Ready to Submit?

1. Complete this checklist
2. Save a copy with your responses
3. Submit via [Microsoft Form](#link-tbd)
4. Attach your completed checklist

**Questions before submitting?**
- Teams: `Fabric MCP Platform` channel
- Office Hours: Thursdays 10-11am PST
