# Research: A. CLI in Web Portals (Competitive Analysis)

**Research Status:** ✅ Complete  
**Last Updated:** November 30, 2025  
**Priority:** P0 (Critical)

---

## Executive Summary

Embedding CLI in web portals is an **established pattern** across major cloud platforms. All major providers (AWS, GCP, Azure) offer browser-based shells with pre-authentication, persistent storage, and pre-installed tools. This validates the Fabric CLI-in-portal vision.

**Key Insight:** The pattern has matured from "nice to have" to "expected feature" for developer platforms.

---

## A1. Cloud Platforms with Embedded CLI

### Feature Comparison Matrix

| Platform | CLI Access | Persistent Storage | Pre-Auth | Key Differentiator |
|----------|-----------|-------------------|----------|-------------------|
| **AWS CloudShell** | Header icon → bottom panel | 1 GB/region | ✅ | Safe Paste, VPC environments |
| **Google Cloud Shell** | Header icon → bottom panel | 5 GB | ✅ | Boost Mode, built-in editor |
| **Azure Cloud Shell** | Header icon → panel | Azure Files mount | ✅ | Mobile app, AI IntelliSense |
| **Databricks** | Notebooks + SQL editor | Cluster-tied | ✅ | Spark driver access |
| **Snowflake Snowsight** | Worksheets | N/A | ✅ | Collaborative editing |

---

### AWS CloudShell

**Official Documentation:** https://docs.aws.amazon.com/cloudshell/latest/userguide/welcome.html

**Key Features:**
- Browser-based shell pre-authenticated with console credentials
- 1 GB persistent storage per region (survives sessions)
- Pre-installed: AWS CLI, Python, Node.js, PowerShell, Git, Docker, ECS CLI
- **Safe Paste**: Warning before pasting multi-line commands (security feature)
- Available in 15+ AWS regions

**UX Pattern:**
- Accessed via terminal icon in AWS Console header
- Opens as resizable bottom panel
- Can maximize to full screen
- Supports multiple concurrent tabs

**Limitations:**
- Sessions timeout after 20 minutes of inactivity
- No GPU access
- No root access (sudo limited)
- Storage auto-deleted after 120 days of no usage

**Source:** [AWS CloudShell Features](https://aws.amazon.com/cloudshell/features/)

---

### Google Cloud Shell

**Official Documentation:** https://cloud.google.com/shell/docs

**Key Features:**
- 5 GB persistent home directory
- Pre-installed: gcloud CLI, kubectl, terraform, Docker, Git, Python, Node.js
- **Cloud Shell Editor**: VS Code-based web IDE integrated with shell
- **Boost Mode**: Temporarily upgrade to more powerful machine
- **Web Preview**: Expose ports 8080-8084 for testing web apps

**UX Pattern:**
- Activate from header icon → opens bottom panel
- Editor can be opened in new tab (full IDE experience)
- Terminal split support

**Unique Innovation:**
- "Open in Cloud Shell" buttons in documentation - one-click to launch with repo cloned
- Tutorials run directly in shell with guided steps

**Limitations:**
- 50 hours/week usage limit (free tier)
- Sessions timeout after 20 minutes idle
- No GPU

**Source:** [Google Cloud Shell Documentation](https://cloud.google.com/shell/docs/features)

---

### Azure Cloud Shell

**Official Documentation:** https://learn.microsoft.com/en-us/azure/cloud-shell/overview

**Key Features:**
- Choice of Bash or PowerShell
- Persistent storage via Azure Files (mounted as $HOME/clouddrive)
- Pre-installed: Azure CLI, Azure PowerShell, Terraform, kubectl, Git
- **Predictive IntelliSense**: AI-powered command suggestions
- **Mobile app access**: Run Cloud Shell from Azure mobile app

**UX Pattern:**
- Terminal icon in Azure Portal header
- Opens in bottom panel (resizable)
- Can open in separate browser tab

**Unique Innovation:**
- Integration with Monaco editor (VS Code web)
- `code .` command opens integrated file editor
- Cross-session PowerShell modules persist

**Limitations:**
- Requires Azure subscription for storage account
- Sessions timeout after 20 minutes idle
- 4 GB RAM / 2 vCPU machine

**Source:** [Azure Cloud Shell Overview](https://learn.microsoft.com/en-us/azure/cloud-shell/overview)

---

### Databricks

**Official Documentation:** https://docs.databricks.com/aws/dev-tools/cli/index.html

**Key Features:**
- Databricks CLI can run from notebooks (magic commands)
- SQL Editor provides CLI-like query interface
- Web terminal available on clusters

**UX Pattern:**
- Not a dedicated "shell" but CLI integrated into notebooks
- `%sh` magic for shell commands
- SQL worksheets with autocomplete

**Unique Approach:**
- CLI is primarily for local development / CI-CD
- Web experience is worksheet-based, not terminal-based

**Source:** [Databricks CLI Documentation](https://docs.databricks.com/aws/dev-tools/cli/index.html)

---

### Snowflake Snowsight

**Official Documentation:** https://docs.snowflake.com/en/user-guide/ui-snowsight

**Key Features:**
- SQL worksheets with rich editing
- SnowSQL CLI for local use (not embedded in web)
- Keyboard shortcuts for power users
- Query history and results caching

**UX Pattern:**
- Worksheet-centric (not full shell)
- Autocomplete for SQL
- Results render as tables, charts

**Source:** [Snowsight Documentation](https://docs.snowflake.com/en/user-guide/ui-snowsight)

---

## A2. IDE-Embedded Terminals

### VS Code Integrated Terminal

**Official Documentation:** https://code.visualstudio.com/docs/terminal/basics

**Key Features:**
- Multiple shell support (bash, zsh, PowerShell, CMD)
- Split terminals
- Shell integration (command detection, navigation)
- Tasks integration (run npm scripts, make, etc.)
- Profile support (switch between shells)

**UX Pattern:**
- Bottom panel (resizable)
- Ctrl+` to toggle
- Terminal tabs for multiple sessions

**Best Practices for Fabric:**
- Shell integration for command detection
- Quick actions based on detected commands
- Links detection in terminal output

---

### GitHub Codespaces

**Official Documentation:** https://docs.github.com/en/codespaces

**Key Features:**
- Full VS Code in browser with terminal
- Dev Containers support (reproducible environments)
- Port forwarding for web apps
- Persistent between sessions
- Prebuilds for faster startup

**UX Pattern:**
- Complete IDE experience
- Terminal identical to VS Code desktop
- Supports extensions

**Relevance to Fabric:**
- Shows full IDE-in-browser is viable
- Dev Containers concept could apply to "CLI Script Items"

**Source:** [GitHub Codespaces Overview](https://docs.github.com/en/codespaces/overview)

---

## A3. SaaS Products with CLI Access

### Stripe CLI

**Official Documentation:** https://stripe.com/docs/stripe-cli

**Key Features:**
- Local webhook testing
- Log tailing from live environment
- Resource management commands

**Positioning:**
- CLI is for developers, dashboard for everyone
- CLI commands shown alongside dashboard actions ("Copy as CLI command")
- Strong documentation with CLI examples

**Source:** [Stripe CLI Documentation](https://stripe.com/docs/stripe-cli)

---

### Heroku CLI

**Official Documentation:** https://devcenter.heroku.com/articles/heroku-cli

**Key Features:**
- Full platform management via CLI
- Plugin architecture (extensible)
- `heroku ps:exec` for SSH access
- Git-based deployment workflow

**Why Developers Loved It:**
- Simple, memorable commands (`heroku create`, `git push heroku main`)
- Everything in dashboard also possible via CLI
- Great for automation and scripting

**Source:** [Heroku CLI Getting Started](https://devcenter.heroku.com/articles/heroku-cli)

---

### Netlify CLI

**Official Documentation:** https://docs.netlify.com/cli/get-started/

**Key Features:**
- Local development server (`netlify dev`)
- Edge function emulation
- Deploy previews from CLI
- Environment variable management

**Source:** [Netlify CLI Docs](https://docs.netlify.com/cli/get-started/)

---

### Vercel CLI

**Official Documentation:** https://vercel.com/docs/cli

**Key Features:**
- Framework detection
- Preview deployments
- Environment variable management
- Local development

**UX Innovation:**
- Dashboard shows "Deploy from CLI" command to copy
- Seamless transition between GUI and CLI workflows

**Source:** [Vercel CLI Reference](https://vercel.com/docs/cli)

---

## Common UX Patterns Across Platforms

### 1. Access Pattern
All cloud shells follow the same pattern:
```
Header Icon → Click → Bottom Panel Opens → Resize/Maximize Option
```

### 2. Authentication
- Inherit web session credentials automatically
- No separate login required
- Role/permission inheritance

### 3. Persistence
- Home directory persists across sessions
- Auto-deletion after extended inactivity (90-120 days)
- Some storage limits apply

### 4. Pre-installed Tools
Standard tools across all platforms:
- Git
- Docker (where applicable)
- Cloud-specific CLI (aws, gcloud, az)
- Python, Node.js
- Terraform, kubectl

### 5. Session Management
- 20-minute idle timeout (standard)
- Reconnection supported
- Multiple concurrent sessions (tabs)

---

## Innovative Features to Consider for Fabric

| Feature | Platform | Description | Priority for Fabric |
|---------|----------|-------------|---------------------|
| **Safe Paste** | AWS | Warning before multi-line paste | High - security |
| **Boost Mode** | GCP | Temporary compute upgrade | Medium |
| **Mobile App** | Azure | Shell from mobile | Low |
| **AI IntelliSense** | Azure | Predictive commands | High - differentiation |
| **Open in Shell** | GCP | One-click from docs | High - adoption |
| **Dev Containers** | GitHub | Reproducible environments | High - CLI Script Item |

---

## Recommendations for Fabric CLI in Portal

1. **Follow established pattern**: Bottom panel, resizable, header icon access
2. **Pre-authenticate**: Inherit Fabric identity automatically
3. **Pre-install CLI**: No setup required, ready to use
4. **Persistent home**: Allow scripts and history to persist
5. **Copy command pattern**: Show CLI equivalents in GUI actions
6. **AI integration**: Copilot suggestions in terminal (unique differentiator)

---

## Source Index

| Platform | Documentation URL |
|----------|-------------------|
| AWS CloudShell | https://docs.aws.amazon.com/cloudshell/latest/userguide/welcome.html |
| Google Cloud Shell | https://cloud.google.com/shell/docs |
| Azure Cloud Shell | https://learn.microsoft.com/en-us/azure/cloud-shell/overview |
| Databricks CLI | https://docs.databricks.com/aws/dev-tools/cli/index.html |
| Snowflake Snowsight | https://docs.snowflake.com/en/user-guide/ui-snowsight |
| VS Code Terminal | https://code.visualstudio.com/docs/terminal/basics |
| GitHub Codespaces | https://docs.github.com/en/codespaces/overview |
| Stripe CLI | https://stripe.com/docs/stripe-cli |
| Heroku CLI | https://devcenter.heroku.com/articles/heroku-cli |
| Netlify CLI | https://docs.netlify.com/cli/get-started/ |
| Vercel CLI | https://vercel.com/docs/cli |

---

**Research Status:** Complete | **Hypothesis Validated:** ✅ CLI-in-portal is established pattern
