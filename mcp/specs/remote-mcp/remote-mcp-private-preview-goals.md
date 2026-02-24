# Remote MCP Private Preview Goals

**Last Updated:** December 3, 2025  
**Milestone:** M0 (January 2026)

---

## Purpose

Validate core platform with design partners. Gather feedback before public preview.

---

## What We Ship

| Category | Capability | Status |
|----------|------------|--------|
| Auth | User identity (delegated OAuth2) | ✅ |
| Auth | Service Principal (app-only) | ✅ |
| Auth | RBAC enforcement | ✅ |
| Workspace | Full CRUD | ✅ |
| Capacities | List, assign, unassign | ✅ |
| Items | Full CRUD (with/without definition) | ✅ |
| Permissions | Workspace role management | ✅ |
| VS Code | Auth-free connection | ✅ |
| Governance | Scheduled agent execution | ✅ |

---

## Topics to Learn During Private Preview

These are areas where we need customer validation or have open questions.

| Topic | Question | How We Learn |
|-------|----------|--------------|
| **Auditing** | Do customers need agent-initiated calls flagged in audit logs? Only admins see Fabric Audit Logs today. Is there an easy way to propagate that calls are agent-initiated? | Design partner interviews |
| **Identity Resolution** | How do customers expect fuzzy name matching to work? What happens on typos? Should we auto-disambiguate or prompt? | Design partner feedback |
| **Permissions by Name** | Is referring to users by name/email (vs user ID) a hard requirement for private preview, or can we start without it and add for public preview? | Design partner feedback |
| **Read-Only MCP** | Is there value in a read-only MCP option for risk-averse customers? | Design partner interviews |
| **Error Messages** | Are our error messages actionable enough for agents to self-correct? | Telemetry + feedback |

---

## Success Criteria

| Metric | Target |
|--------|--------|
| Design partners onboarded | 3-5 |
| Feedback sessions completed | 10+ |
| Critical bugs blocking M1 | 0 |
| P0 requirements validated | 100% |

---

## Timeline

```
Dec 2025:  Finalize requirements, speaker review
Jan 2026:  Private Preview launch (M0)
Jan-Feb:   Design partner validation
Mar 2026:  Public Preview (M1) @ FabCon
```
