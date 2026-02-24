# Demo 3: AI Agent + CLI Integration - Sample Chat Transcript
# Use this as backup if live AI interaction has issues

---

## Scenario 1: Workspace Naming Standardization

### User Prompt:
```
I need to rename all my workspaces to follow our new naming convention: 
[Environment]-[Domain]-[Project]

For example: Prod-Sales-Dashboard

Can you help me create a script to do this?
```

### AI Agent Response:
```
I'll help you standardize your workspace naming! Let me first analyze your current 
workspaces to understand what needs to be renamed.

Looking at your Fabric environment, I can see the following workspaces that don't 
follow the [Environment]-[Domain]-[Project] pattern:

**Current Workspaces:**
| Current Name        | Issue                           |
|--------------------|---------------------------------|
| Sales-Prod         | Environment at end, not start   |
| Dev-Analytics      | Missing project identifier      |
| Finance_Reports    | Uses underscore, missing env    |
| Marketing Dashboard| Uses space, missing env prefix  |
| Test_DataPipeline  | Inconsistent casing, underscore |

**Proposed Renames:**
| Current Name           | New Name                    |
|-----------------------|----------------------------|
| Sales-Prod            | Prod-Sales-Main            |
| Dev-Analytics         | Dev-Analytics-Main         |
| Finance_Reports       | Prod-Finance-Reports       |
| Marketing Dashboard   | Prod-Marketing-Dashboard   |
| Test_DataPipeline     | Dev-Data-Pipeline          |

I've generated a script that will perform these renames. The script includes:
- Dry-run mode (enabled by default) so you can preview changes
- Detailed logging of each rename operation
- Error handling if any rename fails

Would you like me to:
1. Show you the generated script for review?
2. Execute the dry-run to verify the proposed changes?
3. Apply the changes after your approval?
```

### User Follow-up:
```
Yes, please run the dry-run first
```

### AI Agent Response:
```
Running dry-run of workspace renames...

🔄 Starting Workspace Rename Operation
======================================

Pattern: [Environment]-[Domain]-[Project]
Example: Prod-Sales-Dashboard

⚠️  DRY RUN MODE - No changes will be made

Starting renames...

📝 Renaming: Sales-Prod → Prod-Sales-Main
   [DRY RUN] Would execute: fab set "Sales-Prod.Workspace" -q displayName -i "Prod-Sales-Main"

📝 Renaming: Dev-Analytics → Dev-Analytics-Main
   [DRY RUN] Would execute: fab set "Dev-Analytics.Workspace" -q displayName -i "Dev-Analytics-Main"

📝 Renaming: Finance_Reports → Prod-Finance-Reports
   [DRY RUN] Would execute: fab set "Finance_Reports.Workspace" -q displayName -i "Prod-Finance-Reports"

📝 Renaming: Marketing Dashboard → Prod-Marketing-Dashboard
   [DRY RUN] Would execute: fab set "Marketing Dashboard.Workspace" -q displayName -i "Prod-Marketing-Dashboard"

📝 Renaming: Test_DataPipeline → Dev-Data-Pipeline
   [DRY RUN] Would execute: fab set "Test_DataPipeline.Workspace" -q displayName -i "Dev-Data-Pipeline"

======================================
📊 Rename Operation Summary
======================================

Total workspaces processed: 5
Naming pattern applied: [Environment]-[Domain]-[Project]

⚠️  This was a DRY RUN - no changes were made

The script looks good! If you approve, I can execute the actual renames.
Do you want me to proceed with the changes?
```

---

## Scenario 2: PII Column Detection

### User Prompt:
```
Can you scan all my semantic models for PII columns and recommend sensitivity labels?
```

### AI Agent Response:
```
I'll scan your semantic models for potentially sensitive data. Let me analyze the 
column names and patterns across your datasets.

🔍 PII Detection & Sensitivity Labeling
========================================

**Scanning datasets...**

Found 2 datasets with potential PII:

**Dataset: Customer_Analytics**
| Column           | PII Type   | Confidence |
|-----------------|------------|------------|
| CustomerEmail   | Email      | HIGH       |
| PhoneNumber     | Phone      | HIGH       |
| SSN             | SSN        | HIGH       |
| CustomerName    | Name       | MEDIUM     |
| StreetAddress   | Address    | MEDIUM     |
| CreditCardNum   | Financial  | HIGH       |
| DateOfBirth     | DOB        | MEDIUM     |

**Dataset: HR_Data**
| Column           | PII Type   | Confidence |
|-----------------|------------|------------|
| EmployeeSSN     | SSN        | HIGH       |
| Salary          | Financial  | MEDIUM     |
| HomeAddress     | Address    | MEDIUM     |
| EmergencyContact| Phone      | MEDIUM     |

**Recommendations:**
Both datasets contain highly sensitive PII and should have "Highly Confidential" 
sensitivity labels applied.

I've generated a script that will:
1. Apply sensitivity labels to both datasets
2. Create an audit log of the changes
3. Run in dry-run mode first for your review

Would you like me to proceed with applying the sensitivity labels?
```

---

## Scenario 3: Quick Governance Check

### User Prompt:
```
Give me a quick governance summary of my Fabric tenant
```

### AI Agent Response:
```
Let me analyze your Fabric environment for governance insights...

📊 **Governance Summary - Partner Voice Demo Tenant**

**Workspace Overview:**
- Total Workspaces: 12
- Production: 5 (42%)
- Development: 4 (33%)
- Test: 3 (25%)

**Item Inventory:**
| Item Type        | Count | With Labels | Orphaned |
|-----------------|-------|-------------|----------|
| Semantic Models | 23    | 18 (78%)    | 2        |
| Reports         | 47    | 35 (74%)    | 5        |
| Pipelines       | 12    | 8 (67%)     | 1        |
| Lakehouses      | 6     | 6 (100%)    | 0        |

**Key Findings:**
⚠️ 8 items missing sensitivity labels
⚠️ 8 orphaned items (no owner assigned)
✓ All lakehouses properly labeled
✓ No capacity overages detected

**Top Recommendations:**
1. Apply sensitivity labels to 8 unlabeled items
2. Reassign ownership for 8 orphaned items
3. Consider consolidating 3 low-usage workspaces

Would you like me to generate remediation scripts for any of these findings?
```

---

## Key Demo Talking Points

When presenting this demo, emphasize:

1. **Natural Language Interface**: Users describe what they want in plain English
2. **Script Generation**: AI creates executable scripts, not just advice
3. **Review-Before-Execute**: Dry-run mode enables human oversight
4. **Pattern Recognition**: AI identifies PII, naming issues, governance gaps
5. **Actionable Output**: Results in working scripts that can be saved and reused

---

*This transcript can be displayed if live AI interaction experiences delays or issues*
