# Research: H. Internal Data Summary

**Research Status:** ✅ Complete (with your provided data)  
**Last Updated:** November 30, 2025  
**Priority:** P0 (Critical for decision-making)

---

## Executive Summary

Fabric CLI has a growing but modest user base: **~1,400 MAU** across **~1,000 tenants**. The **35% DAU/MAU ratio** indicates strong engagement among active users (power users). Key feedback themes are around authentication friction, feature completeness, and reliability. Engineering feasibility for CLI-in-Spark is confirmed viable.

**Key Insight:** The CLI has validated product-market fit with power users. The next phase is expanding reach and closing feature gaps.

---

## H1. Fabric CLI Telemetry

**Source:** Internal telemetry (November 2025)

### Key Metrics

| Metric | Value | Notes |
|--------|-------|-------|
| **Total Downloads** | 190,000 | Cumulative pip installs |
| **Monthly Active Users** | ~1,412 | Active in past month |
| **Active Tenants** | ~1,012 | Distinct organizations |
| **DAU/MAU Ratio** | ~35% | High stickiness (power users) |

### Interpretation

**Adoption Funnel:**
```
190,000 downloads → 1,412 MAU = 0.7% conversion to active use
```

**Why low conversion?**
- Many downloads are from CI/CD environments (not unique users)
- Trial installs that didn't stick
- Preview status limits awareness

**Why high DAU/MAU?**
- Power users use CLI daily
- Integrated into workflows
- DevOps automation scenarios

---

### Telemetry Gaps (TBD)

| Metric | Status | Owner |
|--------|--------|-------|
| Most used commands (top 20) | Pending | Engineering |
| Command error rates | Pending | Engineering |
| Session duration | Pending | Engineering |
| User segments (by license) | Pending | Engineering |
| Geographic distribution | Pending | Engineering |
| CLI version distribution | Pending | Engineering |

**Recommendation:** Prioritize command usage telemetry to inform roadmap.

---

## H2. Customer Feedback on CLI

### UserVoice & Feature Requests

**Top Requests:**

| Request | Status | Priority |
|---------|--------|----------|
| Auto-completion support | ✅ Delivered (Sept 2025) | Completed |
| Azure CLI credential integration | Planned | P0 |
| JSON/machine-readable output | Planned | P0 |
| Standalone binary distribution | Evaluating | P1 |
| Better in-line help | In progress | P1 |

---

### Support Tickets & Issues

**Most Frequent Issues:**

| Issue | Frequency | Status |
|-------|-----------|--------|
| Authentication friction (repeated prompts) | High | Active fix |
| Notebook import failures | Medium | Active fix |
| Folder structure not preserved | Medium | Active fix |
| .py export missing content | Medium | Active fix |
| Feature gaps (gateway, SQL) | Ongoing | Backlog |

---

### Design Partner Feedback

**From ~25 private preview customers:**

**Positive:**
> "Our engineers prefer command line tools over clicking in the UI."

> "Lots of excitement around CLI for automation and CI/CD."

**Areas for Improvement:**
- Request for dry-run mode (safety)
- Need for scheduled script execution
- Extension/plugin support desired
- Better error messages needed

---

### Community Feedback

**Sources:** LinkedIn, Reddit, GitHub Issues

| Channel | Sentiment | Key Themes |
|---------|-----------|------------|
| LinkedIn | Positive | Excitement for automation |
| Reddit (r/PowerBI) | Cautious | Concerns about auth, completeness |
| GitHub Issues | Constructive | Feature requests, bug reports |

**GitHub Issues:** ~10 open (6 feature requests, ~4 bugs)

**Notable Request:**
> "Help me keep my fabric-cli updated" — Request for `fab upgrade` command

---

### Sentiment Summary

| Dimension | Rating | Notes |
|-----------|--------|-------|
| **Core value** | ✅ Validated | Users love CLI for automation |
| **UX/Polish** | ⚠️ Needs work | Auth, errors, completeness |
| **Feature coverage** | ⚠️ Gaps | Not all operations supported |
| **Reliability** | ⚠️ Issues | Import/export bugs |
| **Future potential** | ✅ Strong | High demand for roadmap items |

---

## H3. Engineering Feasibility

### CLI in Spark Assessment

| Question | Assessment |
|----------|------------|
| **CLI execution latency in Spark?** | ~2-3 seconds overhead (acceptable) |
| **CLI package size?** | ~30MB (negligible vs GB container) |
| **Already embedded?** | ✅ Yes, CLI pre-installed in notebooks |

**Verdict:** ✅ Feasible and implemented

---

### Sandbox Isolation Options

| Option | Status | Notes |
|--------|--------|-------|
| Spark context reuse | ✅ Available | Already works |
| Dedicated container | Under evaluation | For CLI Script Items |
| Firecracker microVM | Not planned | Overkill for current needs |

**Current approach:** Use Spark for execution, investigate lighter container for pure CLI.

---

### CLI Versioning

**Challenge:** How to handle CLI updates for hosted scenarios?

**Options:**
1. Tie to Fabric service version
2. Allow user to select version
3. Backwards-compatible syntax (preferred)

**Current:** Pre-installed CLI kept updated to latest stable.

---

### CLI Script Item Effort

**Rough Estimate:** 3-4 months for a team

**Components:**
- New Fabric item type (backend)
- UI for script creation/editing
- Execution service (sandbox)
- Monitoring/logging integration
- Scheduling integration

**Team:** Hasan Abo-Shally, Alon Yeshurun (scoping in progress)

---

## H4. Internal Data Requests

### Priority Data Needs

| Data | Purpose | Owner | Status |
|------|---------|-------|--------|
| Top 20 CLI commands | Feature prioritization | Engineering | Requested |
| Error rates by command | Quality improvement | Engineering | Requested |
| Usage by tenant size | Segmentation | Telemetry | Requested |
| Customer support ticket themes | Pain points | Support | Available |
| NPS for CLI users | Satisfaction | Customer Voice | In progress |

---

### Engineering Questions for Follow-up

| Question | Purpose | Priority |
|----------|---------|----------|
| Spark cold start latency for CLI | Performance optimization | P1 |
| Cost model for CLI Script Item | Pricing planning | P1 |
| Security review timeline | GA readiness | P0 |
| Integration with Fabric DI/DE | Feature expansion | P2 |

---

## Key Takeaways

### What We Know

1. **Product-market fit exists** — Power users love CLI
2. **Stickiness is high** — 35% DAU/MAU is excellent
3. **Technical feasibility confirmed** — CLI in Spark works
4. **Clear pain points** — Auth, reliability, completeness

### What We Need

1. **Command usage data** — Which commands matter most?
2. **Error analytics** — Where are users failing?
3. **Segment analysis** — Who are our power users?
4. **NPS baseline** — Current satisfaction level

### Next Steps

1. **Instrument telemetry** — Capture command usage
2. **Fix top issues** — Auth, import/export
3. **Complete CLI Script Item spec** — Enable scheduling
4. **Track NPS** — Measure satisfaction improvement

---

**Research Status:** Complete | **Data Status:** Partial (telemetry gaps identified)
