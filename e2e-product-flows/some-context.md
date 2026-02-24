# Automation/Embedded PMs w/Aviv — E2E Flows Preparation

## 1. Purpose of the Meeting
Based on the meeting description from [Automation/Embedded PMs w/Aviv - E2E flows]:
- Each PM should **present E2E scenarios**.
- Focus on **happy path**, **clear PM design**, and **storyboards** — even if not finalized.
- Goal: Show **cohesive flows** across your offerings and how they tie into **Fabric personas** and **Jobs To Be Done (JTBD)**.

---

# 2. Relevant Fabric Personas (Summarized)
These personas come from established Fabric archetypes:

### **1. Data Engineer**
- Builds data pipelines & transformations.
- Needs automation, CI/CD, environment consistency.

### **2. Data Scientist / ML Engineer**
- Needs local experimentation + cloud execution.
- Needs programmatic automation, agents, and iterative workflows.

### **3. Developer / App Builder**
- Builds internal tools; integrates with Fabric via APIs.
- Needs authentication, workspace/project automation.

### **4. Admin / Capacity Manager**
- Governs workspaces, permissions, tenants.
- Needs usage insights, posture checks, compliance automation.

### **5. AI Agent (system persona)**
- Operates fabric via MCP (remote) and supports automated flows.

---

# 3. Fabric Jobs To Be Done (JTBD)

Below are JTBD relevant to your areas (CLI + MCP):

### **JTBD‑1: “As a developer, I want to automate deployment of Fabric assets so I can reliably ship changes.”**

### **JTBD‑2: “As a developer or data engineer, I need to author and test Fabric logic locally before pushing to the cloud.”**

### **JTBD‑3: “As a platform admin, I need APIs/automation to understand my environment and enforce governance.”**

### **JTBD‑4: “As an AI agent, I need a stable, structured protocol to perform actions inside Fabric on behalf of the user.”**

### **JTBD‑5: “As an ISV / multi‑tenant SaaS builder, I need programmatic cross‑tenant operations through secure APIs.”**

### Potential **Missing JTBD**
You might articulate:
- **JTBD‑6: “As an org, I need unified automation across local, pipeline, and agent-driven scenarios with consistent abstractions.”**
- **JTBD‑7: “As a developer exploring Fabric, I need a guided experimentation workflow that blends local tools + AI agent support.”**

---

# 4. End-to-End Scenarios for Each Product

---

# 🟦 Fabric CLI — 3 Scenarios

## Scenario 1 — **Using Fabric CLI locally**
**Persona:** Developer / Data Engineer  
**JTBD:** JTBD‑1, JTBD‑2  

**E2E Flow:**
1. Developer installs `fabric-cli` locally.  
2. Authenticates using device code / PAT / service principal.  
3. Scaffolds or interacts with Fabric items (warehouse, notebooks, semantic model etc.).  
4. Runs commands to publish, test, or validate changes.  
5. Commits changes to source control.

**Happy Path Output:**  
- Local dev done, validated, and pushed upstream reliably.

---

## Scenario 2 — **Using CLI from a CI pipeline (GitHub Actions/Azure DevOps/etc.)**
**Persona:** Developer / DevOps Engineer  
**JTBD:** JTBD‑1  

**E2E Flow:**
1. GitHub Action triggers on push / PR.  
2. Pipeline installs/uses Fabric CLI.  
3. CLI validates assets, runs tests, checks schema, etc.  
4. Deploys to target workspaces.  
5. Reports results back to PR.

**Happy Path Output:**  
- Full automated CI/CD deployment with no manual steps.

---

## Scenario 3 — **Using CLI from a Fabric Notebook**
**Persona:** Data Scientist / ML Engineer  
**JTBD:** JTBD‑2  

**E2E Flow:**
1. User opens a Fabric Notebook.  
2. Runs `%fabric` magic or subprocess call to CLI.  
3. Creates Fabric resources or deploys assets inline.  
4. Automates environment setup or scaffolding from inside Fabric runtime.

**Happy Path Output:**  
- In‑notebook automation of workspace setup or asset creation.

---

# 🟩 Fabric Local MCP — 2 Scenarios

## Scenario 1 — **Developer building & experimenting locally with Fabric-connected agents**
**Persona:** Developer / Data Scientist  
**JTBD:** JTBD‑2, JTBD‑7  

**E2E Flow:**
1. Developer uses local MCP agent.  
2. Works with local files (e.g., CSM models, notebooks).  
3. Agent simulates or calls Fabric APIs in a structured workflow.  
4. Local → Cloud sync ensures quick iteration loops.  
5. User pushes final version to Fabric.

**Example:** Local CSM → upload → run in Fabric (e.g., in Spark or Data Engineering pipeline).

---

## Scenario 2 — **Building organizational/internal apps using public Fabric APIs**
**Persona:** Internal Developer / Admin Tool Builder / ISV  
**JTBD:** JTBD‑3, JTBD‑5  

**E2E Flow:**
1. Developer sets up local agent with authentication.  
2. Agent/CLI calls Fabric REST APIs.  
3. App implements security posture dashboards, admin utilities, workspace admins viewer, etc.  
4. (For ISVs) agent cycles between tenants with secure credential flows.

**Happy Path Output:**  
- Internal fabric management app or ISV SaaS integration is built smoothly.

---

# 🟥 Fabric Remote MCP — 3 Scenarios

## Scenario 1 — **Unified Copilot using Fabric MCP remotely**
**Persona:** AI Agent  
**JTBD:** JTBD‑4  

**E2E Flow:**
1. User asks unified copilot: “Create a workspace called X”.  
2. Copilot uses remote MCP to connect to Fabric.  
3. Agent executes Fabric action.  
4. Response returned to user.

**Happy Path Output:**  
- Agent completes Fabric operations safely and reliably.

---

## Scenario 2 — **Custom agent built in Copilot Studio connected to Fabric MCP**
**Persona:** Citizen Developer / Internal App Builder  
**JTBD:** JTBD‑3, JTBD‑4  

**E2E Flow:**
1. User opens Copilot Studio.  
2. Creates a custom agent.  
3. Connects agent to Fabric MCP (plus other MCPs).  
4. Defines agent instructions & behaviors.  
5. User interacts with the agent to perform Fabric tasks.

**Happy Path Output:**  
- Multi-system agent that orchestrates Fabric behavior.

---

## Scenario 3 — **Local developer connecting their coding agent to Remote MCP for experimentation**
**Persona:** Developer / ML Engineer  
**JTBD:** JTBD‑7  

**E2E Flow:**
1. Developer launches local coding agent (Cursor, VS Code agent, etc.).  
2. Configures remote MCP connection.  
3. Agent helps generate Fabric scripts, artifacts, or workflow ideas.  
4. Developer iterates quickly with Fabric-aware auto‑completion and actions.

**Happy Path Output:**  
- Accelerated experimentation and exploration of Fabric.

---

# 5. Cross-Product Summary Table

| Product | Scenario | Persona | JTBD |
|--------|----------|---------|------|
| CLI | Local development | Developer / DE | JTBD‑1, JTBD‑2 |
| CLI | CI pipeline | Developer / DevOps | JTBD‑1 |
| CLI | Notebook integration | ML Engineer | JTBD‑2 |
| Local MCP | Local-to-cloud dev | Developer / Scientist | JTBD‑2, JTBD‑7 |
| Local MCP | Internal apps & public APIs | App Builder / ISV / Admin | JTBD‑3, JTBD‑5 |
| Remote MCP | Unified Copilot | AI Agent | JTBD‑4 |
| Remote MCP | Copilot Studio agents | Citizen Dev / Admin | JTBD‑3, JTBD‑4 |
| Remote MCP | Coding agent experimentation | Developer | JTBD‑7 |

---

# 6. Potential Storyboard Template (For All Scenarios)

### **1. Persona**
Who is performing the flow?

### **2. Trigger**
What starts this workflow?

### **3. Tools Involved**
CLI / Local MCP / Remote MCP / Notebook / Pipeline / Copilot Studio.

### **4. Step-by-Step E2E**
Clear numbered steps.

### **5. Happy Path Outcome**
What success looks like.

### **6. JTBD Alignment**
Which core job is being solved?

### **7. Open Questions / Missing JTBD**
What gaps should the team consider?

``