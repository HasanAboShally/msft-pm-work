# MCP tool names and descriptions
**Status: DRAFT**

### AI tools used:
- Manual research and ChatGPT Deep Research on industry standards and best practices  
- VS Code, GitHub Copilot  
- Model: Claude Sonnet 4.5  
- Custom content-writing agent (style guide and writing principles)  
- Custom rule based on research and the output pattern outlined below.

### Main changes following best practices and industry standards:
- Removed redundant `mcp_fabric_mcp` from tool names – only needed for MCP name  
- Moved action to front of tool name for clarity  
- Expanded descriptions with consistent pattern including action, usage condition, and constraints.  
- Followed Microsoft Fabric style guide and writing principles.

### Open questions:
- Should we include examples or links to examples in docs?  
- Technical review needed for accuracy and improvements.  
- How can we test/track changes' impact on LLM accuracy and reliability?

### Output pattern template:
**Title:** <verb><object>  
**Description:** Performs _<primary action>_. Use this when _<condition or intent>_. _Optional: constraints or non-goals._

---

# Microsoft/Azure Documentation & Code Samples

| Current title | Current description | Proposed title | Proposed description |
|---------------|--------------------|----------------|----------------------|
| mcp_fabric_mcp_microsoft_docs_search | Search official Microsoft/Azure docs (Learn, etc.). | search_microsoft_docs | Searches official Microsoft and Azure documentation for relevant content. Use this when the user needs information about Microsoft products, services, or Azure resources. Returns up to 10 content chunks with titles, URLs, and excerpts. |
| mcp_fabric_mcp_microsoft_docs_fetch | Fetch full content of a specific Microsoft doc page. | get_microsoft_docs | Retrieves the complete content of a specific Microsoft documentation page in markdown format. Use this when search results identify a high‑value page that needs full detail. Provides comprehensive guides, tutorials, and reference material. |
| mcp_fabric_mcp_microsoft_code_sample_search | Search official Microsoft/Azure code samples by topic/service. | search_microsoft_code_samples | Searches official Microsoft and Azure code samples by topic, service, or SDK name. Use this when generating code or providing implementation examples for Microsoft products. Can filter by programming language. |

---

# Subscriptions & Resource Groups

| Current title | Current description | Proposed title | Proposed description |
|---------------|--------------------|----------------|----------------------|
| mcp_fabric_mcp_subscription_list | List Azure subscriptions for the current account. | list_azure_subscriptions | Lists all Azure subscriptions accessible to the current account. Use this when the user needs to select a subscription or view available Azure environments. Returns subscription IDs, names, states, and tenant information. |
| mcp_fabric_mcp_group_list | List Azure resource groups in a subscription. | list_resource_groups | Lists all resource groups in an Azure subscription. Use this when the user needs to view Azure resource organization or select a resource group. Returns resource group names and IDs. |

---

# OneLake Storage & Items

| Current title | Current description | Proposed title | Proposed description |
|---------------|--------------------|----------------|----------------------|
| mcp_fabric_mcp_onelake_workspace_list | List Fabric workspaces via OneLake data plane. | list_onelake_workspaces | Lists all Fabric workspaces accessible via OneLake data plane API. Use this when the user needs to view available workspaces or select a workspace for data operations. Returns workspace names and IDs. |
| mcp_fabric_mcp_onelake_item_list | List OneLake items in a workspace (high-level). | list_onelake_items | Lists OneLake items in a Fabric workspace using the high-level OneLake API. Use this when the user needs to see what items exist in a workspace. Returns item names, types, and metadata. |
| mcp_fabric_mcp_onelake_item_list-data | List OneLake items via DFS-style data API. | list_onelake_items_dfs | Lists items in a Fabric workspace using the DFS-style data API. Use this when detailed filesystem‑level access is needed for workspace items. Provides lower‑level data plane view. |
| mcp_fabric_mcp_onelake_item_create | Create a new Fabric item (Lakehouse, Notebook, etc.) in a workspace. | create_fabric_item | Creates a new item in a Fabric workspace. Use this when the user wants to create a Lakehouse, Notebook, or other Fabric item type. Requires workspace ID, item name, and item type. |
| mcp_fabric_mcp_onelake_file_list | List files/directories in OneLake (hierarchical/DFS style). | list_onelake_files | Lists files and directories in OneLake storage using hierarchical DFS-style view. Use this when the user needs to explore OneLake content in a filesystem structure. Supports path filtering and recursive traversal. |
| mcp_fabric_mcp_onelake_directory_create | Create a directory in OneLake. | create_onelake_directory | Creates a directory in OneLake storage. Use this when the user needs to organize files or prepare folder structures. Supports nested path creation. |
| mcp_fabric_mcp_onelake_directory_delete | Delete a directory in OneLake. | delete_onelake_directory | Deletes a directory from OneLake storage. Use this when the user needs to remove a folder. Use recursive flag to delete non‑empty directories. |
| mcp_fabric_mcp_onelake_upload_file | Upload a file (inline or from local path) to OneLake. | upload_onelake_file | Uploads a file to OneLake storage from inline content or local path. Use this when the user needs to store data in OneLake. Supports overwrite control and content type specification. |
| mcp_fabric_mcp_onelake_download_file | Download a file from OneLake (metadata + content). | download_onelake_file | Downloads a file from OneLake storage. Use this when the user needs to retrieve file content or metadata. Returns base64 content, metadata, and text when applicable. |
| mcp_fabric_mcp_onelake_file_delete | Delete a file from OneLake. | delete_onelake_file | Deletes a file from OneLake storage. Use this when the user wants to remove a specific file. This action permanently removes the file. |

---

# Fabric Public APIs (OpenAPI specs & Best Practices)

| Current title | Current description | Proposed title | Proposed description |
|---------------|--------------------|----------------|----------------------|
| mcp_fabric_mcp_publicapis_list | List Fabric workload types that have public APIs (e.g., notebook, report). | list_fabric_api_workloads | Lists Fabric workload types that have public API specifications available. Use this when the user needs to discover what APIs exist for Fabric workloads. Returns workload names like notebook, report, or platform. |
| mcp_fabric_mcp_publicapis_get | Get full OpenAPI spec for a specific Fabric workload. | get_fabric_api_spec | Retrieves the complete OpenAPI specification for a specific Fabric workload. Use this when the user needs detailed API documentation. Returns the full spec in JSON format. |
| mcp_fabric_mcp_publicapis_platform_get | Get OpenAPI spec for core Fabric platform APIs. | get_fabric_platform_api_spec | Retrieves the OpenAPI specification for core Fabric platform APIs. Use this when the user needs documentation for cross‑workload APIs (workspace management, etc.). Returns complete platform API spec. |
| mcp_fabric_mcp_publicapis_itemdefinition_get | Get JSON schema/item definitions for a workload’s API. | get_fabric_item_schema | Retrieves JSON schema definitions for a Fabric workload API. Use this when the user needs to understand item structure or validate definitions. |
| mcp_fabric_mcp_publicapis_bestpractices_get | Get embedded best‑practice guidance for a Fabric topic. | get_fabric_best_practices | Retrieves embedded best‑practice documentation for a specific Fabric topic. Use this when the user needs guidance or implementation patterns. |
