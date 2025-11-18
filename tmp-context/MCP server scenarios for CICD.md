// ### From Nimrod, I added the scenarios below to our specs - 20251118


# MCP Server Scenarios for CI/CD – High Level Thinking

## Assumptions

- **Relevant persona:** Data engineers that are already familiar with Fabric, and want to use familiar coding tools they are working with.
- **Potential clients:** VSCode, Fabric service

## Relevant Value-Add Scenarios

- **Authoring Fabric items:** Code generation
- **Generating Scripts:** Using Fabric APIs, CLI, YAML, TF, Raw REST API – Code generation
- **Running operations per or post authoring:** Code generation + Execution

## Example Scenarios

1. **Authoring items and test them:**  
   *VS Code/data engineer*
2. **Download an item from the Fabric WS:**  
   *Execution*
3. **In the Notebook definition file, suggest the change and view the definition with the new code sample:**  
   *Code generation*
4. **Import back to the WS:**  
   *Execution*
5. **Run the item and verify run results:**  
   *Execution*
6. **Commit to git from the workspace:**  
   *Execution*
7. **OR, push changes directly to remote repo, and create a PR:**  
   *Execution with GitHub MCP server?*

### Adding Variable Library Variables

- **Download variable library item:** Execution
- **Add a new Variable with relevant value sets (default LakeHouse):** Execution + code generation, definition aware
- **Download all items that use that LakeHouse:** Execution
- **Change all relevant places where the reference is static:** Code generation, definition aware
- **Upload back to the workspace:** Execution
- **Run relevant code items to verify changes are successful:** Execution
- **Commit to Git:** Execution

### Building a Deployment Plan

For a given workspace/set of items, what is the order of deployment needed so all items appear in target with their changes and proper dependencies?

1. Download all items
2. Go through the definition, and find the proper relationships
3. Understand the semantics of LogicalID, or static object ID/WS ID
4. Create a graph of dependencies
5. Generate code that knows the order of deployment
6. Generate it written in Python/CLI/YAML, based on Public APIs
7. Push it to relevant product through Git

---

## Appendix

- [ADO MCP](https://github.com/microsoft/azure-devops-mcp)  
  Local MCP server  
  Mostly List/Get, shares operations mainly for non-CI/CD operations (boards, projects, tickets, PRs etc)

- [GitHub MCP](https://github.com/github/github-mcp-server)  
  Remote MCP server  
  Built mostly for VSCode, but can work with any remote-compatible MCP host  
  Looks much more broader and well-funded than ADO  
  Dynamic tool discovery (follows the pattern of minimal info/tools for the LLM).

#### Repos

- Create/update file
- Push commit
- Branching: fork repo, create branch

#### Workflows

- Run workflow
- Re-run workflow
- Scanning and validations

---

## Relevant CI/CD Operations

### Git integration

- Get Workspace connection details
- Get MyConnection details
- Update WS connection
- Update MyConnection
- Commit items to git
- Update WS with items from git
- Branch out (multiple operations through API)

### Deployment pipelines

- Get pipelines/stages/items in a stage
- Create a pipeline
- Assign a workspace
- Manage access
- Deploy
- Selective deploy

### General / Other

- VSCode: Import and Commit items
- **Definition aware:** Make changes on an item and import back
- Copy from one to another
- Manage relations with LogicalIds
- Find and replace relations
- Create new items
- Swap static configurations with Variables
- Post deployment actions: run jobs
- Error analysis and taking actions to fix (requires good error for agents)
- **Code generation:**
  - Generate a YAML to deploy with DP / Git/Public APIs
  - Same, but with CLI
  - Compare versions on code level?
```
[1](https://microsofteur.sharepoint.com/teams/PBIALM/_layouts/15/Doc.aspx?sourcedoc=%7BB12623C1-750E-494E-B9DB-F2D794ED1A9D%7D&file=MCP%20server%20scenarios%20for%20CICD.docx&action=default&mobileredirect=true&nav=eyJoIjoiMTY2Mzg4MzExOCJ9)