# Cascading Usage Analytics: A Proposal for Developer Platform Metrics

**Author:** Hasan  
**Date:** November 26, 2025  
**Status:** Draft / Discussion

---

## The Problem

Our current analytics approach has two fundamental gaps:

1. **Definition Gap:** We lack a clear framework for measuring success as a platform team with dual accountability—both as enablers (platform) and as owners of the pro-developer experience.

2. **Attribution Gap:** Our tools form a hierarchy where usage cascades through layers, but we only measure direct usage—missing the full picture of each component's value.

---

## The Insight: Cascading Usage Patterns

Our developer tools stack forms a dependency hierarchy:

```
┌─────────────────────────────────────────────────┐
│            End-User Integrations                │
│   (ADO Extension, VS Code Extension, etc.)      │
├─────────────────────────────────────────────────┤
│              Fabric CLI                         │
├─────────────────────────────────────────────────┤
│            Python SDK                           │
├─────────────────────────────────────────────────┤
│         Public APIs (Foundation)                │
└─────────────────────────────────────────────────┘
```

**Example flow:** When a user runs an ADO Extension command:
- ADO Extension → CLI → Python SDK → Public API

Each layer processes the request, but **only the top layer gets credit** in our current metrics.

---

## The Proposal: Direct + Indirect Usage Metrics

For each component in our developer tools ecosystem, measure and visualize:

| Metric Type | Definition | Why It Matters |
|-------------|------------|----------------|
| **Direct Usage** | Users/requests interacting with the tool directly | Shows end-user adoption |
| **Indirect Usage** | Requests flowing through from higher-level tools | Shows platform/enablement value |
| **Total Impact** | Direct + Indirect | Shows true reach and criticality |

### Example Visualization

```
┌─────────────────────────────────────────────────────────────┐
│  Component        │  Direct Users  │  Indirect Users  │  Total  │
├───────────────────┼────────────────┼──────────────────┼─────────┤
│  ADO Extension    │     1,000      │        0         │  1,000  │
│  Fabric CLI       │     2,000      │      1,000       │  3,000  │
│  Python SDK       │     3,000      │      3,000       │  6,000  │
│  Public APIs      │     5,000      │      6,000       │ 11,000  │
└─────────────────────────────────────────────────────────────┘
```

---

## Why This Matters

### 1. **Reveals Hidden Value**
A component with low direct usage but high indirect usage is a critical **enabler**—not a failure. Without this view, we might underinvest in foundational components.

### 2. **Informs Investment Decisions**
Understanding the cascade helps answer:
- Where should we improve reliability? (High indirect usage = many dependents)
- Where should we focus UX? (High direct usage = end-user facing)
- What's the blast radius of a breaking change?

### 3. **Aligns with Dual Accountability**
- **Platform metrics:** Indirect usage shows how well we enable other tools/teams
- **Pro-developer metrics:** Direct usage shows end-user adoption and satisfaction

### 4. **Improves Executive Communication**
A single diagram that shows both dimensions gives leadership a complete view of our impact, not just surface-level adoption numbers.

---

## Proposed Components to Track

| Layer | Components |
|-------|------------|
| Integrations | ADO Extension, VS Code Extension, Terraform Provider |
| CLI | Fabric CLI |
| SDKs | Python SDK, (future: .NET SDK, etc.) |
| Foundation | Public REST APIs |

---

## Implementation Considerations

1. **Request Tagging:** Each layer should pass a header/identifier indicating the calling tool
2. **Telemetry Aggregation:** Build dashboards that aggregate by source chain
3. **Visualization:** Create a living diagram updated with real data for exec reviews

---

## Next Steps

1. Validate this concept with the team
2. Identify technical requirements for request tagging
3. Build a prototype dashboard with sample/mock data
4. Present in an upcoming execution review for feedback

---

## Open Questions

- How do we handle requests where the source chain is unknown/untagged?
- Should we differentiate between internal (Microsoft) and external indirect usage?
- What's the right cadence for reviewing these metrics?

---

*This is a conversation starter—feedback welcome.*
