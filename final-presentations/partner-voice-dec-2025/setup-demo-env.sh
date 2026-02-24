#!/bin/bash
# Partner Voice Demo Environment Setup Script
# Run this to prepare your demo environment for December 2, 2025 webcast
# Usage: ./setup-demo-env.sh

set -e

echo "🚀 Partner Voice Demo Environment Setup"
echo "========================================"
echo ""

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Step 1: Check CLI Installation
echo "📦 Step 1: Checking Fabric CLI installation..."
if command -v fab &> /dev/null; then
    VERSION=$(fab version 2>&1 | head -1)
    echo -e "${GREEN}✓ Fabric CLI installed: $VERSION${NC}"
else
    echo -e "${RED}✗ Fabric CLI not found${NC}"
    echo "  Install with: pip install fabric-cli"
    exit 1
fi
echo ""

# Step 2: Check Authentication
echo "🔐 Step 2: Checking authentication status..."
AUTH_STATUS=$(fab auth status 2>&1)
if echo "$AUTH_STATUS" | grep -q "Logged In"; then
    ACCOUNT=$(echo "$AUTH_STATUS" | grep "Account:" | cut -d: -f2 | xargs)
    echo -e "${GREEN}✓ Logged in as: $ACCOUNT${NC}"
else
    echo -e "${YELLOW}⚠ Not logged in. Starting authentication...${NC}"
    echo "  A browser window will open. Please sign in with your Microsoft account."
    fab auth login
    
    # Verify login succeeded
    AUTH_STATUS=$(fab auth status 2>&1)
    if echo "$AUTH_STATUS" | grep -q "Logged In"; then
        echo -e "${GREEN}✓ Authentication successful!${NC}"
    else
        echo -e "${RED}✗ Authentication failed. Please try again manually.${NC}"
       # exit 1
    fi
fi
echo ""

# Step 3: List Available Workspaces
echo "📂 Step 3: Listing available workspaces..."
echo "-------------------------------------------"
fab ls 2>&1 || echo -e "${RED}✗ Could not list workspaces${NC}"
echo ""

# Step 4: Check for Demo Workspaces
echo "🔍 Step 4: Checking for demo workspaces..."
DEMO_WS=$(fab ls 2>&1 | grep -i "demo" || echo "")
if [ -n "$DEMO_WS" ]; then
    echo -e "${GREEN}✓ Found demo workspaces:${NC}"
    echo "$DEMO_WS"
else
    echo -e "${YELLOW}⚠ No demo workspaces found. Creating demo workspaces...${NC}"
    
    # Create demo workspaces
    echo "  Creating Demo-Development..."
    fab mkdir "Demo-Development.Workspace" 2>&1 || echo "  (may already exist)"
    
    echo "  Creating Demo-Production..."
    fab mkdir "Demo-Production.Workspace" 2>&1 || echo "  (may already exist)"
    
    echo "  Creating Demo-Partner-Voice..."
    fab mkdir "Demo-Partner-Voice.Workspace" 2>&1 || echo "  (may already exist)"
    
    echo ""
    echo "Verifying created workspaces:"
    fab ls 2>&1 | grep -i "demo" || echo "  No demo workspaces visible"
fi
echo ""

# Step 5: Test Key Commands
echo "🧪 Step 5: Testing key demo commands..."
echo "-------------------------------------------"

echo "Test 1: fab ls (list workspaces)"
fab ls 2>&1 | head -10
echo ""

# Try to list contents of a demo workspace if one exists
FIRST_DEMO=$(fab ls 2>&1 | grep -i "demo" | head -1 | xargs)
if [ -n "$FIRST_DEMO" ]; then
    echo "Test 2: fab ls '$FIRST_DEMO' -l (list workspace contents)"
    fab ls "$FIRST_DEMO" -l 2>&1 | head -10 || echo "  (workspace may be empty)"
    echo ""
    
    echo "Test 3: fab get '$FIRST_DEMO' (get workspace details)"
    fab get "$FIRST_DEMO" 2>&1 | head -15 || echo "  (could not get details)"
fi
echo ""

# Step 6: Summary
echo "========================================"
echo "📋 Setup Summary"
echo "========================================"
echo ""
echo -e "CLI Version:     $(fab version 2>&1 | head -1)"
echo -e "Auth Status:     $(fab auth status 2>&1 | grep 'Logged In' | cut -d: -f2 | xargs)"
echo -e "Account:         $(fab auth status 2>&1 | grep 'Account' | cut -d: -f2 | xargs)"
echo ""

# Check remaining time estimates
echo "⏰ Remaining Prep Tasks:"
echo "  [✓] Backup folder structure created"
echo "  [✓] Demo 3 backup scripts created"
echo "  [✓] Setup automation script ready"
echo "  [ ] Create/verify demo workspaces with sample items"
echo "  [ ] Capture backup screenshots (~30 min)"
echo "  [ ] Do dry run practice (~45 min)"
echo "  [ ] Complete PowerPoint slides (~2 hours)"
echo ""
echo "Total remaining prep time: ~3 hours"
echo ""

echo "🎯 Quick Commands for Demo:"
echo "  fab ls                                    # List workspaces"
echo "  fab ls \"Demo-Partner-Voice.Workspace\" -l  # List workspace items"
echo "  fab get \"Demo-Partner-Voice.Workspace\"    # Get workspace details"
echo "  fab mkdir \"New.Workspace\"                 # Create workspace"
echo ""

echo -e "${GREEN}✅ Demo environment check complete!${NC}"
echo ""
echo "Next step: Run through the dry-run checklist at:"
echo "  partner-voice-dec-2025/dry-run-checklist.md"
