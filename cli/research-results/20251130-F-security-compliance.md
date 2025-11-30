# Research: F. Security & Compliance

**Research Status:** ✅ Complete  
**Last Updated:** November 30, 2025  
**Priority:** P1 (Important for enterprise adoption)

---

## Executive Summary

Secure CLI execution in cloud environments requires **isolation, resource limits, and audit logging**. Major cloud platforms have mature security models for browser-based shells. Enterprises require approval workflows, audit trails, and command restrictions for CLI automation.

**Key Finding:** The security model for CLI Script Items and Remote MCP should mirror Azure Cloud Shell's approach with Fabric-specific enhancements.

---

## F1. CLI Execution Security Models

### Cloud Shell Security Patterns

#### AWS CloudShell

**Source:** [AWS CloudShell Security](https://docs.aws.amazon.com/cloudshell/latest/userguide/sec-auth-with-identities.html)

**Security Features:**
| Feature | Implementation |
|---------|----------------|
| Authentication | IAM identity inherited from console |
| Authorization | IAM policies apply to all commands |
| Isolation | Separate environment per user |
| Network | VPC access optional, controlled |
| Storage | 1GB persistent, auto-deleted after 120 days |
| Audit | CloudTrail integration |

**Key Pattern:** No separate credentials—inherits web session identity.

---

#### Azure Cloud Shell

**Source:** [Azure Cloud Shell Security](https://learn.microsoft.com/en-us/azure/cloud-shell/security-baseline)

**Security Features:**
| Feature | Implementation |
|---------|----------------|
| Authentication | Azure AD / Entra ID |
| Authorization | Azure RBAC applies |
| Isolation | Container per session |
| Storage | Azure Files mount (customer-controlled) |
| Network | Outbound allowed, no inbound |
| Audit | Azure Activity Log |
| Encryption | Storage encrypted at rest |

**Key Pattern:** Storage is customer-managed (brings accountability).

---

#### Google Cloud Shell

**Source:** [Cloud Shell Security](https://cloud.google.com/shell/docs/security)

**Security Features:**
| Feature | Implementation |
|---------|----------------|
| Authentication | Google Account |
| Authorization | IAM policies |
| Isolation | Per-user VM |
| Persistence | 5GB home, 120-day inactivity deletion |
| Network | Full outbound (can be restricted) |
| Ephemeral | VMs recycled frequently |

---

### Common Security Requirements

| Requirement | Description | Fabric Applicability |
|-------------|-------------|---------------------|
| **Identity inheritance** | Use existing session auth | ✅ Use Fabric identity |
| **RBAC enforcement** | Workspace/item permissions apply | ✅ Existing RBAC |
| **Container isolation** | Separate execution per user | ✅ Via Spark or dedicated service |
| **Resource limits** | CPU, memory, time caps | ✅ Prevent abuse |
| **Audit logging** | Log all commands | ✅ Required for enterprise |
| **No persistent root** | Unprivileged execution | ✅ Security best practice |

---

### Sandbox Isolation Options

For CLI Script Items and Remote MCP execution:

| Option | Pros | Cons | Best For |
|--------|------|------|----------|
| **Spark Context** | Already exists, Fabric-native | Heavy for simple commands | Complex data operations |
| **Container (Docker)** | Fast startup, isolated | Need to manage images | CLI Script Items |
| **Firecracker (microVM)** | Strong isolation, fast | Operational complexity | High-security scenarios |
| **Process isolation** | Simplest | Weakest isolation | Trusted environments |

**Recommendation:** Use Spark for data operations, lightweight containers for pure CLI execution.

---

## F2. Enterprise CLI Governance

### Compliance Framework Requirements

#### SOC 2 Type II

**Relevant Controls:**
- CC6.1: Logical access controls
- CC6.2: Authentication mechanisms
- CC6.6: Activity logging

**CLI Implications:**
- All CLI commands must be logged with user identity
- Role-based access must be enforced
- Session timeout required

---

#### ISO 27001

**Relevant Sections:**
- A.9: Access control
- A.12: Operations security
- A.14: System development security

**CLI Implications:**
- Change management for CLI scripts
- Segregation of duties (dev vs prod)
- Vulnerability management for CLI package

---

### Enterprise Governance Requirements

From customer research and industry patterns:

| Requirement | Description | Priority |
|-------------|-------------|----------|
| **Audit trail** | Log who ran what, when | P0 |
| **RBAC** | Role-based command access | P0 |
| **Approval workflows** | Require approval for destructive ops | P1 |
| **Command allowlist/blocklist** | Restrict dangerous commands | P1 |
| **Environment separation** | Dev/test/prod isolation | P1 |
| **Service principal support** | CI/CD without user credentials | P0 |
| **Session recording** | Full session replay for audit | P2 |
| **Dry-run mode** | Preview changes before apply | P1 |

---

### Privileged Access Management (PAM) Patterns

Enterprise PAM tools (CyberArk, BeyondTrust) handle CLI access:

| Pattern | Description | Fabric Relevance |
|---------|-------------|------------------|
| **Just-in-time access** | Request access, time-limited | Could integrate with PIM |
| **Session recording** | Record all terminal activity | Audit requirement |
| **Command filtering** | Block specific commands | Could implement allowlist |
| **Credential injection** | Never expose actual credentials | Service principal pattern |

---

## F3. Security for CLI Script Items

### Proposed Security Model

```
User → Create CLI Script → Review/Approve → Schedule → Execute in Sandbox → Log Results
```

**Security Gates:**

| Gate | Control |
|------|---------|
| **Creation** | Workspace contributor permission |
| **Approval** | Optional workflow for production |
| **Execution** | Service identity with scoped permissions |
| **Sandbox** | Isolated execution environment |
| **Logging** | Full command and output logging |

---

### Script Validation

Before execution, validate:

| Check | Purpose |
|-------|---------|
| **Syntax check** | Catch errors before run |
| **Permission check** | Ensure script has access |
| **Resource estimation** | Warn about expensive operations |
| **Blocklist check** | Block dangerous commands |

---

## F4. Security for Remote MCP

### MCP-Specific Security

**Source:** [MCP Security Considerations](https://modelcontextprotocol.io/docs/concepts/transports)

| Concern | Mitigation |
|---------|------------|
| **Tool abuse** | Rate limiting, permission checks |
| **Data exfiltration** | Network isolation, output filtering |
| **Privilege escalation** | Minimum necessary permissions |
| **Token exposure** | Don't log sensitive data |

---

### Remote MCP Security Model

From Fabric Remote MCP Spec:

| Layer | Security Control |
|-------|-----------------|
| **Transport** | HTTPS/TLS required |
| **Authentication** | Fabric identity (AAD/Entra) |
| **Authorization** | Workspace permissions |
| **Execution** | Sandboxed environment |
| **Audit** | All tool calls logged |

---

## Recommendations for Fabric

### Immediate (P0)

1. **Inherit Fabric identity** — No separate CLI auth
2. **Enforce RBAC** — Workspace permissions apply to CLI
3. **Audit logging** — Log all CLI commands
4. **Service principal support** — For CI/CD automation

### Short-term (P1)

1. **Dry-run mode** — Preview before execute
2. **Confirmation prompts** — For destructive commands
3. **Error messages** — Clear, non-sensitive

### Medium-term (P2)

1. **Approval workflows** — Optional for production
2. **Command allowlist** — Enterprise-configurable
3. **Session recording** — Full audit trail
4. **PIM integration** — Just-in-time access

---

## Source Index

| Topic | Source URL |
|-------|------------|
| AWS CloudShell Security | https://docs.aws.amazon.com/cloudshell/latest/userguide/sec-auth-with-identities.html |
| Azure Cloud Shell Security | https://learn.microsoft.com/en-us/azure/cloud-shell/security-baseline |
| Google Cloud Shell Security | https://cloud.google.com/shell/docs/security |
| MCP Transport Security | https://modelcontextprotocol.io/docs/concepts/transports |
| SOC 2 Framework | https://www.aicpa.org/soc-2 |
| ISO 27001 | https://www.iso.org/isoiec-27001-information-security.html |

---

**Research Status:** Complete | **Hypothesis Validated:** ✅ Enterprise requires audit, RBAC, and isolation
