# Fabric CLI Value by Persona

This document maps the value and impact of Microsoft Fabric CLI across different Azure Data personas, showing how CLI features address specific pain points and workflows for each role.

## Value Matrix

| **Persona** | **Primary CLI Value** | **Key Features** | **Impact** |
|-------------|----------------------|------------------|------------|
| **Jian (Developer)** | **App-to-Fabric integration automation** | • VS Code extension with IntelliSense<br>• AI integration (AGENTS.md) for accurate code gen<br>• API command for custom integrations<br>• Shell magic in notebooks | Embed Fabric in apps faster; reduce API learning curve; automate data pipeline integration |
| **Ren (Data Engineer)** | **Pipeline automation & deployment** | • Export/import for CI/CD<br>• Folder operations for bulk deployment<br>• `--query` for filtering large datasets<br>• Shell start for interactive exploration<br>• Job management commands | Automate environment promotion (dev→test→prod); reduce deployment from hours to minutes; script repetitive tasks |
| **Desi (Data Scientist)** | **Notebook-native resource management** | • Notebook integration (token auth)<br>• Export metadata to lakehouse<br>• Shell commands in analysis workflows<br>• OneLake file operations | Manage resources without leaving notebook; automate model deployment; combine analysis with infrastructure tasks |
| **Ash (Analyst)** | **Report backup & migration** | • Export/import reports<br>• Folder export for batch operations<br>• Simple syntax for basic tasks | Backup reports before changes; migrate content between workspaces; reduce reliance on IT for simple moves |
| **Binh (BI Engineer)** | **BI asset lifecycle management** | • Set command for bulk metadata updates<br>• ACL management for permissions<br>• Profile switching for multi-env work<br>• Export/import for version control | Update dataset descriptions in bulk; manage permissions programmatically; version control BI assets in Git |
| **Nat (BI Consumer)** | **Minimal direct value** | • Open command to launch items in browser | Limited—not a primary user; might use `open` command for quick access |
| **Ari (Data Architect)** | **Infrastructure-as-code & governance** | • Generic set command for config mgmt<br>• Capacity/gateway/domain management<br>• ACL for security automation<br>• Multi-tenant profiles for client work | Define infrastructure in code; automate security policies; manage multiple client tenants; enforce standards programmatically |
| **Vic (Insights Explorer)** | **Ad-hoc resource queries** | • `--query` for custom reports<br>• LS with filtering to find items<br>• Export for offline analysis | Generate custom inventory reports; find items without owners; export metadata for executive summaries |
| **Gael (DB Admin)** | **Operational monitoring & automation** | • Table commands for data management<br>• OneLake file operations<br>• Spark pool management<br>• Automated backup scripts | Automate database-like operations; monitor OneLake storage; manage Spark resources; schedule maintenance tasks |

## Cross-Persona Value

**Automation Benefits (All Technical Personas):**
- Scriptable CLI replaces manual portal clicks
- Repeatable workflows reduce human error
- Time savings: minutes vs. hours for bulk operations

**Multi-Environment Management:**
- **Ren, Binh, Ari** use profiles to manage dev/test/prod environments
- **Ari** manages multiple client tenants (consultants/ISVs)
- Instant switching eliminates repeated authentication

**CI/CD Integration:**
- **Ren, Ari, Jian** embed CLI in Azure DevOps/GitHub Actions
- Infrastructure-as-code enables GitOps workflows
- Automated deployments and rollback capabilities

**AI-Assisted Productivity:**
- AGENTS.md integration helps all personas generate correct commands
- GitHub Copilot suggests accurate Fabric CLI syntax
- Reduced learning curve for new users

## Primary Beneficiaries (Ranked by Impact)

1. **Ren (Data Engineer)** - Core automation and deployment user; primary target
2. **Ari (Data Architect)** - Infrastructure-as-code and multi-tenant governance
3. **Binh (BI Engineer)** - BI asset lifecycle and metadata management
4. **Desi (Data Scientist)** - Notebook integration for unified workflows
5. **Jian (Developer)** - App integration and VS Code experience
6. **Gael (DB Admin)** - Operational automation for data management
7. **Vic (Insights Explorer)** - Custom reporting and ad-hoc queries
8. **Ash (Analyst)** - Basic backup and migration tasks
9. **Nat (BI Consumer)** - Minimal value (not a target user)

## Key Pain Points Addressed

### Ren (Data Engineer)
**Pain Points:**
- "Ingesting increasingly large amounts of data is costly and challenging to scale efficiently"
- "Creating and testing pipelines when we make a change to our architecture"
- "Dealing with clients changing their requirements mid-project"

**CLI Solutions:**
- Automate pipeline deployment with export/import
- Script environment promotion (dev→test→prod)
- Version control infrastructure configurations

### Ari (Data Architect)
**Pain Points:**
- "Constantly having to learn about and assess new tools and services"
- "Clients' requirements for data collection shift frequently"
- "Planning infrastructure for clients who have difficult hardware/software constraints"

**CLI Solutions:**
- Multi-tenant profiles for managing multiple clients
- Infrastructure-as-code with `set` command
- Automated security policy enforcement with ACL commands

### Binh (BI Engineer)
**Pain Points:**
- "Maintaining source control over BI assets"
- "End users often do not know exactly what they want from their data"
- "Identifying and correcting data errors and quality issues"

**CLI Solutions:**
- Version control BI assets in Git via export/import
- Bulk metadata updates with `set` command
- Query and filter operations to identify issues

### Desi (Data Scientist)
**Pain Points:**
- "Locating data in a decentralized organization"
- "Delayed adoption of novel tools and IDEs"
- "Wishes for a more seamless handoff between the data science team and development of apps/solutions"

**CLI Solutions:**
- Notebook integration eliminates tool switching
- Export metadata to lakehouse for analysis
- Seamless model deployment automation

### Gael (DB Admin)
**Pain Points:**
- "Managing alerts – currently receiving 4,000 alerts a day via email"
- "Unplanned weekend and on-call work"
- "Fixing problems caused by self-appointed Dev DBAs"

**CLI Solutions:**
- Automate routine maintenance tasks
- Script monitoring and backup operations
- Proactive resource management via scheduled scripts

## Feature-to-Persona Mapping

| **CLI Feature** | **Primary Personas** | **Use Cases** |
|-----------------|---------------------|---------------|
| Export/Import | Ren, Binh, Ash | CI/CD, backup, migration, version control |
| `fab set` command | Ren, Ari, Binh | Bulk updates, config management, environment promotion |
| `--query` parameter | Vic, Ren, Gael | Custom reports, filtering, data exploration |
| Notebook integration | Desi, Ren | Unified workflows, metadata analysis, automation |
| VS Code extension | Jian, Ren, Desi | Development efficiency, IntelliSense, deployment |
| Multi-tenant profiles | Ari, Binh | Client management, multi-environment work |
| ACL commands | Ari, Binh, Gael | Security automation, permission management |
| AI integration (AGENTS.md) | All technical | Faster onboarding, accurate code generation |
| Folder operations | Ren, Binh, Ash | Bulk deployment, organized backups |
| Shell start | Ren, Desi, Vic | Interactive exploration, learning |
| API command | Jian, Ari | Custom integrations, advanced automation |
| Job management | Ren, Gael | Pipeline monitoring, operational tasks |

## Adoption Strategy by Persona

### High-Priority Targets (Core Users)
**Ren (Data Engineer), Ari (Data Architect), Binh (BI Engineer)**
- Focus on automation ROI and time savings
- Highlight CI/CD integration and DevOps workflows
- Provide infrastructure-as-code examples
- Emphasize multi-environment management

### Secondary Targets (Power Users)
**Desi (Data Scientist), Jian (Developer), Gael (DB Admin)**
- Showcase notebook integration and VS Code extension
- Provide domain-specific examples (ML deployment, app integration)
- Highlight tool consolidation benefits

### Opportunistic Targets (Occasional Users)
**Vic (Insights Explorer), Ash (Analyst)**
- Simple use cases: backup, basic queries
- Quick wins: report migration, metadata export
- Portal complement, not replacement

### Non-Targets
**Nat (BI Consumer)**
- Portal remains primary interface
- CLI not designed for this persona's workflows

---

**Document Version**: 1.0  
**Last Updated**: November 18, 2025  
**Related Documents**: 
- [Fabric Personas](fabric-personas-nov2025.md)
- [CLI Features Summary](cli-kr-features-summary.md)
