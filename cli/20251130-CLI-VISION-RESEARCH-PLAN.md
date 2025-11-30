# CLI Vision: Research Plan

**Document Metadata:**

| Property | Value |
|----------|-------|
| **Version** | 1.0 |
| **Last Updated** | November 30, 2025 |
| **Document Type** | Research Plan |
| **Parent Document** | 20251130-FABRIC-CLI-VISION.md |
| **Document Owner** | Hasan Abo-Shally |
| **Purpose** | Systematic research to validate assumptions and gather evidence for the CLI Vision |

---

## Executive Summary

This document outlines a comprehensive research plan to validate the assumptions in the Fabric CLI Vision. It includes both **external research** (industry analysis, competitive intelligence, academic literature) and **internal research** (telemetry, customer interviews, engineering assessments).

**Research Categories:**
- A. CLI in Web Portals (Competitive Analysis)
- B. CLI Usage Patterns & Personas
- C. AI Agents & Code Execution
- D. MCP & API Execution Patterns
- E. Learning & Adoption
- F. Security & Compliance
- G. Business & ROI
- H. Internal Data Needs

---

## Research Topic Index

| ID | Topic | Priority | Type | Status |
|----|-------|----------|------|--------|
| A1 | Cloud platforms with embedded CLI | P0 | External | Not Started |
| A2 | IDE-embedded terminals | P1 | External | Not Started |
| A3 | SaaS products with CLI access | P1 | External | Not Started |
| B1 | Who uses CLI tools (personas) | P0 | External | Not Started |
| B2 | CLI adoption rates in data platforms | P0 | Internal | Not Started |
| B3 | CLI vs. GUI preference patterns | P1 | External | Not Started |
| C1 | Agents generating code vs. calling tools | P0 | External | Partial (Cloudflare, Anthropic) |
| C2 | Agent performance on sequential/bulk operations | P0 | External | Not Started |
| C3 | Code execution sandboxes for AI | P1 | External | Not Started |
| D1 | MCP servers wrapping public APIs | P0 | External | Not Started |
| D2 | CLI as MCP tool pattern | P1 | External | Not Started |
| D3 | Token efficiency comparisons | P1 | External | Not Started |
| E1 | Learning from generated code | P1 | External | Not Started |
| E2 | CLI adoption barriers | P0 | External/Internal | Not Started |
| E3 | Copilot + CLI learning studies | P1 | External | Not Started |
| F1 | CLI execution security models | P1 | External | Not Started |
| F2 | Enterprise CLI governance | P1 | External | Not Started |
| G1 | CLI automation ROI | P1 | External | Not Started |
| G2 | Developer productivity with CLI | P1 | External | Not Started |
| H1 | Fabric CLI telemetry | P0 | Internal | Not Started |
| H2 | Customer feedback on CLI | P0 | Internal | Not Started |
| H3 | Engineering feasibility assessments | P1 | Internal | Not Started |

---

## A. CLI in Web Portals (Competitive Analysis)

### A1. Cloud Platforms with Embedded CLI

**Research Question:** How do major cloud platforms integrate CLI into their web consoles, and what can we learn from their approaches?

**Hypothesis to Validate:**
> "Embedding CLI in web portals is an established pattern that pro developers value and adopt."

**Platforms to Research:**

| Platform | CLI Feature | Research Focus |
|----------|-------------|----------------|
| **AWS CloudShell** | Browser-based shell in AWS Console | UX patterns, authentication model, persistence, limitations |
| **Google Cloud Shell** | Integrated terminal in GCP Console | Editor integration, pre-installed tools, session management |
| **Azure Cloud Shell** | PowerShell/Bash in Azure Portal | File storage, identity integration, resource context |
| **Databricks SQL Editor** | CLI-like query interface | Hybrid GUI/CLI patterns, autocomplete, history |
| **Snowflake Snowsight** | Worksheets with SnowSQL | SQL + CLI hybrid, keyboard shortcuts, results handling |
| **GitHub Codespaces** | Full VS Code in browser | Terminal experience, extension support, persistence |
| **Vercel Dashboard** | CLI commands in UI | Showing CLI equivalents, copy-to-clipboard |

**Research Methods:**
1. **Hands-on exploration:** Create accounts and use each platform's CLI feature
2. **Documentation review:** Official docs on CLI integration
3. **User reviews:** Search for user feedback (Reddit, Twitter, forums)
4. **Feature comparison matrix:** Build side-by-side comparison

**Sources to Consult:**
- Official documentation for each platform
- AWS re:Invent talks on CloudShell
- Google Cloud Next sessions
- Databricks blog posts
- Reddit: r/aws, r/googlecloud, r/azure, r/databricks

**Output:** Competitive analysis document with:
- Feature comparison matrix
- UX patterns to adopt/avoid
- Differentiators for Fabric

---

### A2. IDE-Embedded Terminals

**Research Question:** How do IDEs integrate terminals, and what makes them effective for developers?

**Hypothesis to Validate:**
> "The VS Code terminal model (side/bottom panel, integrated with editor) is the preferred pattern for CLI in productivity tools."

**Products to Research:**

| Product | Research Focus |
|---------|----------------|
| **VS Code** | Terminal panel UX, split terminals, shell integration, tasks |
| **JetBrains IDEs** | Terminal tool window, SSH terminals, run configurations |
| **Visual Studio** | Developer Command Prompt integration |
| **Jupyter Lab** | Terminal + notebook integration |
| **RStudio** | Console pane design |

**Research Methods:**
1. **UX analysis:** Screenshot and document terminal UX patterns
2. **User surveys:** Search for developer surveys on terminal usage
3. **Accessibility review:** How do IDEs handle terminal accessibility?

**Sources to Consult:**
- VS Code documentation and GitHub issues
- JetBrains blog
- Developer surveys (Stack Overflow, JetBrains)
- Accessibility guidelines (WCAG for terminals)

**Output:** UX best practices document for terminal integration

---

### A3. SaaS Products with CLI Access

**Research Question:** How do SaaS products (beyond cloud platforms) offer CLI capabilities?

**Products to Research:**

| Product | CLI Feature | Research Focus |
|---------|-------------|----------------|
| **Stripe** | Stripe CLI | How CLI complements dashboard, developer adoption |
| **Twilio** | Twilio CLI | CLI for testing, local development |
| **Netlify** | Netlify CLI | Deploy workflows, CI/CD integration |
| **Heroku** | Heroku CLI | Historical success, why developers loved it |
| **Supabase** | Supabase CLI | Modern approach, local development |
| **PlanetScale** | PScale CLI | Database branching via CLI |

**Research Methods:**
1. **Documentation review:** How is CLI positioned?
2. **GitHub analysis:** CLI repo activity, issues, adoption
3. **Community sentiment:** Developer forums, Hacker News

**Output:** Patterns for CLI positioning in SaaS products

---

## B. CLI Usage Patterns & Personas

### B1. Who Uses CLI Tools (Personas)

**Research Question:** What personas typically use CLI tools? Is it limited to developers, or broader?

**Hypothesis to Validate:**
> "CLI users extend beyond developers to include DevOps engineers, data engineers, IT admins, and power users."

**Research Methods:**
1. **Survey data:** Stack Overflow survey, JetBrains survey, GitHub surveys
2. **Job posting analysis:** Which roles mention CLI skills?
3. **Academic research:** HCI studies on CLI adoption

**Sources to Consult:**
- Stack Overflow Developer Survey 2024/2025
- JetBrains State of Developer Ecosystem
- ACM Digital Library (search: "command line interface" "user study")
- LinkedIn job postings analysis

**Key Questions to Answer:**
- What % of "citizen developers" use CLI?
- Is CLI usage growing or declining?
- What's the CLI adoption by industry?
- What's the age/experience correlation with CLI preference?

**Output:** Persona profile for CLI users with data backing

---

### B2. CLI Adoption Rates in Data Platforms

**Research Question:** How widely is CLI adopted in data/analytics platforms?

**Hypothesis to Validate:**
> "CLI adoption in data platforms is significant among pro users but underutilized due to discoverability issues."

**Internal Data Needed:**
- [ ] Fabric CLI download/install numbers
- [ ] Fabric CLI MAU (monthly active users)
- [ ] Most used CLI commands
- [ ] CLI usage by customer segment (enterprise vs. SMB)
- [ ] CLI usage correlation with Power BI / Data Engineering workload usage

**External Benchmarks:**
- Databricks CLI usage (search for public statements)
- Snowflake SnowSQL adoption
- BigQuery bq CLI usage

**Output:** Adoption benchmark with internal/external comparison

---

### B3. CLI vs. GUI Preference Patterns

**Research Question:** When do users prefer CLI over GUI, and vice versa?

**Hypothesis to Validate:**
> "CLI is preferred for repetitive, bulk, and scriptable tasks; GUI is preferred for exploration, visualization, and one-off tasks."

**Research Methods:**
1. **Academic literature:** Search for preference studies
2. **User forums:** Reddit discussions on CLI vs. GUI
3. **Our user research:** Add questions to CLI study

**Sources to Consult:**
- ACM/IEEE papers on CLI vs. GUI
- Reddit: r/programming, r/devops, r/sysadmin
- UX research publications

**Output:** Framework for when to recommend CLI vs. GUI

---

## C. AI Agents & Code Execution

### C1. Agents Generating Code vs. Calling Tools

**Research Question:** What's the industry direction on agents writing code vs. using function calling?

**Hypothesis to Validate:**
> "The industry is moving toward agents generating and executing code rather than calling predefined tools, for efficiency and flexibility reasons."

**Current Evidence:**
- ✅ Cloudflare "Code Mode" blog post (September 2025)
- ✅ Anthropic "Code Execution with MCP" (November 2025)

**Additional Research Needed:**
- OpenAI's position on code execution vs. function calling
- Google DeepMind research on agent architectures
- LangChain/LangGraph documentation on code execution
- AutoGPT, CrewAI, and other agent framework approaches

**Sources to Consult:**
- OpenAI developer documentation and blog
- Google AI blog
- LangChain documentation
- Agent framework GitHub repos
- arXiv papers on LLM agents

**Output:** Industry trend analysis with multiple sources

---

### C2. Agent Performance on Sequential/Bulk Operations

**Research Question:** How well do AI agents handle sequential and bulk operations compared to scripts?

**Hypothesis to Validate:**
> "AI agents struggle with bulk operations due to context window limits, token costs, and non-determinism. Scripts are more reliable for scale."

**Research Methods:**
1. **Benchmark studies:** Search for agent benchmarks on repetitive tasks
2. **Community experiences:** Reddit, Hacker News discussions
3. **Our own testing:** Test Copilot on bulk Fabric operations

**Key Questions to Answer:**
- At what scale do agents start failing (10 items? 100? 1000?)?
- What's the error rate for agents on repetitive tasks?
- How does token consumption scale with operation count?
- What's the time comparison (agent vs. script)?

**Sources to Consult:**
- AI agent benchmark papers
- r/ChatGPT, r/LocalLLaMA discussions
- Engineering blogs on production agent deployments

**Output:** Performance comparison framework for agents vs. scripts

---

### C3. Code Execution Sandboxes for AI

**Research Question:** How are other platforms implementing secure code execution for AI agents?

**Hypothesis to Validate:**
> "Secure sandboxed code execution is becoming a standard pattern for AI agents."

**Platforms to Research:**

| Platform | Sandbox Approach | Research Focus |
|----------|-----------------|----------------|
| **Cloudflare Workers** | V8 isolates | Lightweight, fast startup, limitations |
| **Modal** | Container sandboxes | Python execution, GPU support |
| **E2B** | Sandboxed environments | Open source, AI-focused |
| **Replit** | Workspace containers | Full development environment |
| **OpenAI Code Interpreter** | Sandboxed Python | What's allowed/blocked |
| **Anthropic Claude** | Computer use sandbox | Full OS simulation |

**Research Methods:**
1. **Documentation review:** How is sandboxing implemented?
2. **Security analysis:** What are the security models?
3. **Limitation analysis:** What can't you do in each sandbox?

**Output:** Sandbox options analysis for Remote MCP

---

## D. MCP & API Execution Patterns

### D1. MCP Servers Wrapping Public APIs

**Research Question:** How are MCP servers being built today? Are they simple API wrappers or something more?

**Hypothesis to Validate:**
> "Most MCP servers today are thin wrappers around public APIs, creating maintenance burden and limited value-add."

**Research Methods:**
1. **MCP server registry:** Analyze official and community MCP servers
2. **GitHub analysis:** Look at MCP server implementations
3. **Developer feedback:** What pain points exist?

**Sources to Consult:**
- [MCP Server Registry](https://github.com/modelcontextprotocol/servers)
- MCP Discord community
- GitHub: MCP server implementations
- Hacker News discussions on MCP

**Key Questions to Answer:**
- What % are just API wrappers?
- What value-add do the best ones provide?
- What's the maintenance burden for API-wrapper MCPs?
- Are there examples of "code execution" MCPs?

**Output:** MCP server patterns analysis

---

### D2. CLI as MCP Tool Pattern

**Research Question:** Are other platforms using CLI as an MCP tool? What are the patterns?

**Hypothesis to Validate:**
> "Using CLI as an agent tool is an emerging pattern that reduces development effort and increases capability surface."

**Research Methods:**
1. **MCP registry search:** Look for CLI-based MCP servers
2. **GitHub search:** "MCP" + "CLI" implementations
3. **Community discussions:** MCP Discord, forums

**Examples to Find:**
- MCP servers that wrap kubectl
- MCP servers that wrap AWS CLI
- MCP servers that wrap git

**Output:** Examples and patterns for CLI-based MCP servers

---

### D3. Token Efficiency Comparisons

**Research Question:** What's the actual token efficiency gain from code execution vs. tool calling?

**Hypothesis to Validate:**
> "Code execution reduces token consumption by 50-90% for multi-step operations."

**Research Methods:**
1. **Anthropic data:** Extract specific numbers from their blog
2. **Cloudflare data:** Extract their efficiency claims
3. **Our own benchmarks:** Test with Fabric scenarios

**Specific Metrics to Find:**
- Token count for tool definitions vs. code API
- Token count for tool calls vs. code execution
- End-to-end comparison for real scenarios

**Output:** Token efficiency benchmark data

---

## E. Learning & Adoption

### E1. Learning from Generated Code

**Research Question:** Do users actually learn from AI-generated code?

**Hypothesis to Validate:**
> "Users can learn programming concepts from AI-generated code, but learning is not automatic—it requires intentional design."

**Research Methods:**
1. **Academic research:** Educational studies on Copilot
2. **GitHub Copilot research:** Any published studies
3. **User surveys:** Self-reported learning

**Sources to Consult:**
- Google Scholar: "GitHub Copilot" + "learning"
- ACM: "AI code generation" + "education"
- GitHub blog: Copilot research
- CS education conferences

**Key Questions to Answer:**
- Under what conditions do users learn from generated code?
- What design elements promote learning?
- What are the risks of copy-paste without understanding?

**Output:** Design recommendations for learning-oriented CLI generation

---

### E2. CLI Adoption Barriers

**Research Question:** What prevents users from adopting CLI tools?

**Hypothesis to Validate:**
> "Primary barriers are discoverability, fear of mistakes, and perceived complexity—not capability."

**Research Methods:**
1. **User research data:** From our CLI study
2. **Industry surveys:** Developer experience surveys
3. **Forum analysis:** Why people avoid CLI

**Internal Data Needed:**
- [ ] CLI study findings on barriers
- [ ] Customer support tickets related to CLI
- [ ] CLI documentation analytics (what do people search for?)

**Output:** Prioritized list of adoption barriers with mitigation strategies

---

### E3. Copilot + CLI Learning Studies

**Research Question:** Is there research on AI assistants helping users learn CLI?

**Hypothesis to Validate:**
> "AI assistants can accelerate CLI learning by providing contextual explanations and examples."

**Research Methods:**
1. **Academic search:** AI tutoring + command line
2. **Product examples:** Tools that teach CLI (Warp, Fig)
3. **Educational technology research**

**Sources to Consult:**
- CHI conference papers
- Warp (AI-native terminal) approach
- Fig (acquired by AWS) approach

**Output:** Evidence-based recommendations for CLI + AI learning design

---

## F. Security & Compliance

### F1. CLI Execution Security Models

**Research Question:** How do platforms secure CLI/script execution in multi-tenant environments?

**Hypothesis to Validate:**
> "Secure CLI execution in cloud environments requires isolation, resource limits, and audit logging."

**Research Methods:**
1. **Cloud platform analysis:** AWS CloudShell, Azure Cloud Shell security docs
2. **Academic research:** Container security, sandboxing
3. **Security frameworks:** What do compliance standards say?

**Output:** Security requirements for CLI Script Item and Remote MCP

---

### F2. Enterprise CLI Governance

**Research Question:** How do enterprises govern CLI usage? What controls do they need?

**Hypothesis to Validate:**
> "Enterprises require approval workflows, audit trails, and command restrictions for CLI automation."

**Research Methods:**
1. **Customer interviews:** Ask about CLI governance needs
2. **Compliance frameworks:** SOC 2, ISO 27001 requirements
3. **Enterprise tools:** How do PAM (Privileged Access Management) tools handle CLI?

**Internal Data Needed:**
- [ ] Enterprise customer feedback on CLI governance
- [ ] Compliance requirements from regulated industries

**Output:** Enterprise governance requirements for CLI features

---

## G. Business & ROI

### G1. CLI Automation ROI

**Research Question:** What's the measurable ROI of CLI automation vs. manual operations?

**Hypothesis to Validate:**
> "CLI automation reduces operational time by 80%+ for repetitive tasks."

**Research Methods:**
1. **Case studies:** Published automation ROI studies
2. **Customer data:** Time savings from CLI adoption
3. **Industry benchmarks:** DevOps automation metrics

**Sources to Consult:**
- DevOps Research and Assessment (DORA) reports
- Puppet State of DevOps
- Customer case studies from AWS, Azure

**Output:** ROI framework with quantified benefits

---

### G2. Developer Productivity with CLI

**Research Question:** How much does CLI improve developer productivity vs. GUI?

**Hypothesis to Validate:**
> "CLI operations are 2-5x faster than equivalent GUI operations for experienced users."

**Research Methods:**
1. **Time-motion studies:** Academic research on CLI vs. GUI speed
2. **User testing:** Measure time for equivalent tasks
3. **Self-reported data:** Developer surveys

**Output:** Productivity metrics for CLI vs. GUI

---

## H. Internal Data Needs

### H1. Fabric CLI Telemetry

**Data Points Needed:**

| Metric | Purpose | Priority |
|--------|---------|----------|
| Total CLI installs | Adoption baseline | P0 |
| MAU (Monthly Active Users) | Active adoption | P0 |
| DAU / MAU ratio | Engagement depth | P1 |
| Most used commands (top 20) | Feature prioritization | P0 |
| Command error rates | Usability issues | P1 |
| Session duration | Usage patterns | P2 |
| User segments (by license/tenant size) | Targeting | P1 |
| Geographic distribution | Regional priorities | P2 |
| CLI version distribution | Update adoption | P2 |

**Owner to Contact:** Engineering team / telemetry owner

---

### H2. Customer Feedback on CLI

**Data Points Needed:**

| Source | Data Needed | Priority |
|--------|-------------|----------|
| UserVoice | CLI-related feature requests | P0 |
| Support tickets | CLI issues and complaints | P0 |
| NPS comments | CLI sentiment | P1 |
| Design partner feedback | Detailed CLI feedback | P0 |
| Community forums | CLI discussions | P1 |

**Owner to Contact:** Customer feedback team, design partner managers

---

### H3. Engineering Feasibility Assessments

**Questions for Engineering:**

| Question | Purpose | Priority |
|----------|---------|----------|
| CLI execution latency in Spark? | Performance feasibility | P0 |
| CLI package size for Spark image? | Infrastructure impact | P1 |
| Sandbox isolation options? | Security architecture | P0 |
| CLI versioning in remote execution? | Compatibility planning | P1 |
| Estimated effort for CLI Script Item? | Roadmap planning | P1 |

**Owner to Contact:** Mahir Diab, Platform Engineering

---

## Research Timeline

### Phase 1: Quick Wins (Next 2 weeks)

| Task | Owner | Deadline |
|------|-------|----------|
| Gather CLI telemetry (H1) | Hasan + Eng | Dec 7 |
| Read Cloudflare/Anthropic articles in detail (C1) | Hasan | Dec 3 |
| Survey AWS/GCP/Azure CloudShell (A1) | Hasan | Dec 10 |
| Collect customer feedback summary (H2) | Hasan | Dec 10 |

### Phase 2: Deep Dives (December 2025)

| Task | Owner | Deadline |
|------|-------|----------|
| Complete competitive analysis (A1-A3) | Hasan | Dec 20 |
| MCP server patterns analysis (D1-D2) | Hasan | Dec 20 |
| Agent code execution research (C1-C3) | Hasan | Dec 20 |
| Synthesize user research findings | Research team | Dec 22 |

### Phase 3: Synthesis (January 2026)

| Task | Owner | Deadline |
|------|-------|----------|
| Complete research synthesis | Hasan | Jan 10 |
| Update vision document with evidence | Hasan | Jan 15 |
| Present findings to stakeholders | Hasan | Jan 20 |

---

## Research Output Deliverables

1. **Competitive Analysis Document** (A1-A3)
   - CLI-in-portal feature comparison
   - UX best practices
   - Differentiation opportunities

2. **Agent Code Execution Report** (C1-C3, D1-D3)
   - Industry direction summary
   - Token efficiency data
   - Sandbox options analysis

3. **CLI Persona & Adoption Report** (B1-B3, E1-E3)
   - Who uses CLI (with data)
   - Adoption barriers and solutions
   - Learning design recommendations

4. **Internal Data Summary** (H1-H3)
   - Telemetry dashboard
   - Customer feedback themes
   - Engineering feasibility notes

5. **Updated Vision Document**
   - Evidence-backed claims
   - Validated/invalidated hypotheses
   - Refined value propositions

---

## Appendix: Research Source Library

### Websites to Monitor

- [MCP Official Site](https://modelcontextprotocol.io/)
- [Cloudflare Blog](https://blog.cloudflare.com/tag/ai/)
- [Anthropic Engineering Blog](https://www.anthropic.com/engineering)
- [LangChain Blog](https://blog.langchain.dev/)
- [AI News Aggregators](https://www.aisafety.com/)

### Academic Databases

- ACM Digital Library
- IEEE Xplore
- arXiv (cs.HC, cs.SE, cs.AI)
- Google Scholar

### Community Sources

- Reddit: r/programming, r/devops, r/MachineLearning, r/LocalLLaMA
- Hacker News (search: CLI, MCP, AI agents)
- Discord: MCP community, LangChain community
- Twitter/X: AI developer accounts

### Internal Sources

- Fabric telemetry dashboards
- UserVoice feedback portal
- Support ticket system
- Design partner meeting notes
- Customer advisory board feedback

---

**Document End** | Version: 1.0 | Last Updated: November 30, 2025
