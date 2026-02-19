# =============================================================================
# Fabric Data Engineering CI/CD Demo — Makefile
# =============================================================================
# Convenience targets for the full provisioning workflow.
#
# Usage:
#   make setup       Extract templates from the workshop repo
#   make infra       Create workspace + lakehouses (Terraform)
#   make provision   Import items + run data pipeline (fabric-cli)
#   make all         Full end-to-end provisioning
#   make destroy     Tear down everything
#   make help        Show all available targets
# =============================================================================

.PHONY: all setup infra provision pipeline varlib open destroy clean help

SHELL := /bin/bash
TERRAFORM_DIR := terraform
SCRIPTS_DIR := scripts

# Terraform binary — use ~/bin/terraform if available (>= 1.8), else fall back to PATH
TERRAFORM := $(shell [[ -x "$(HOME)/bin/terraform" ]] && echo "$(HOME)/bin/terraform" || echo "terraform")

# Colors for terminal output
GREEN  := \033[0;32m
YELLOW := \033[0;33m
CYAN   := \033[0;36m
RESET  := \033[0m

# =============================================================================
# Main Targets
# =============================================================================

## Run the full provisioning workflow (setup → infra → provision)
all: setup infra provision
	@echo -e "$(GREEN)✅ Full provisioning complete!$(RESET)"

## Extract templates from the DaniBunny workshop repo
setup:
	@echo -e "$(CYAN)📦 Setting up templates...$(RESET)"
	@chmod +x $(SCRIPTS_DIR)/*.sh $(SCRIPTS_DIR)/lib/*.sh
	@$(SCRIPTS_DIR)/setup.sh

## Create workspace + lakehouses with Terraform
infra:
	@echo -e "$(CYAN)🏗️  Provisioning infrastructure...$(RESET)"
	@cd $(TERRAFORM_DIR) && $(TERRAFORM) init -input=false
	@cd $(TERRAFORM_DIR) && $(TERRAFORM) apply -auto-approve
	@echo -e "$(GREEN)✅ Infrastructure ready$(RESET)"

## Plan Terraform changes (dry run)
plan:
	@cd $(TERRAFORM_DIR) && $(TERRAFORM) init -input=false
	@cd $(TERRAFORM_DIR) && $(TERRAFORM) plan

## Import all items and run data pipeline
provision:
	@echo -e "$(CYAN)🚀 Provisioning Fabric items...$(RESET)"
	@chmod +x $(SCRIPTS_DIR)/*.sh $(SCRIPTS_DIR)/lib/*.sh
	@$(SCRIPTS_DIR)/provision-items.sh

## Import items only (skip data pipeline)
provision-no-data:
	@echo -e "$(CYAN)🚀 Provisioning Fabric items (no data)...$(RESET)"
	@chmod +x $(SCRIPTS_DIR)/*.sh $(SCRIPTS_DIR)/lib/*.sh
	@$(SCRIPTS_DIR)/provision-items.sh --skip-data

## Run the data pipeline (copy jobs + notebooks)
pipeline:
	@echo -e "$(CYAN)📊 Running data pipeline...$(RESET)"
	@chmod +x $(SCRIPTS_DIR)/*.sh $(SCRIPTS_DIR)/lib/*.sh
	@$(SCRIPTS_DIR)/run-data-pipeline.sh

## Create the Variable Library (optional, Module 5)
varlib:
	@echo -e "$(CYAN)📋 Creating Variable Library...$(RESET)"
	@chmod +x $(SCRIPTS_DIR)/*.sh $(SCRIPTS_DIR)/lib/*.sh
	@$(SCRIPTS_DIR)/create-variable-library.sh

## Open the workspace in your browser
open:
	@source .terraform-outputs.env 2>/dev/null && fab open /$${WORKSPACE_NAME}.Workspace \
		|| echo "Run 'make infra' first"

# =============================================================================
# Cleanup Targets
# =============================================================================

## Destroy workspace + Terraform state
destroy:
	@echo -e "$(YELLOW)⚠️  Destroying demo environment...$(RESET)"
	@chmod +x $(SCRIPTS_DIR)/*.sh $(SCRIPTS_DIR)/lib/*.sh
	@$(SCRIPTS_DIR)/teardown.sh

## Clean generated files (keep templates)
clean:
	@rm -f .terraform-outputs.env
	@rm -rf $(TERRAFORM_DIR)/.terraform
	@rm -f $(TERRAFORM_DIR)/terraform.tfstate*
	@rm -f $(TERRAFORM_DIR)/.terraform.lock.hcl
	@echo -e "$(GREEN)🧹 Cleaned generated files$(RESET)"

## Clean everything including templates
clean-all: clean
	@find templates -mindepth 1 -not -name '.gitkeep' -exec rm -rf {} + 2>/dev/null || true
	@echo -e "$(GREEN)🧹 Cleaned all (including templates)$(RESET)"

# =============================================================================
# Help
# =============================================================================

## Show this help message
help:
	@echo ""
	@echo "Fabric DE CI/CD — Provisioning Targets"
	@echo "======================================="
	@echo ""
	@echo "  make setup            Extract templates from the workshop repo"
	@echo "  make infra            Create workspace + lakehouses (Terraform)"
	@echo "  make plan             Preview Terraform changes (dry run)"
	@echo "  make provision        Import all items + run data pipeline"
	@echo "  make provision-no-data  Import items only (skip data pipeline)"
	@echo "  make pipeline         Run data pipeline (copy jobs + notebooks)"
	@echo "  make varlib           Create Variable Library (Module 5)"
	@echo "  make open             Open workspace in browser"
	@echo "  make destroy          Destroy workspace + Terraform state"
	@echo "  make clean            Clean generated files (keep templates)"
	@echo "  make clean-all        Clean everything including templates"
	@echo ""
	@echo "Workflow:"
	@echo "  make setup      → Extract templates"
	@echo "  make infra      → Terraform (workspace + lakehouses)"
	@echo "  make provision  → fabric-cli (items + data)"
	@echo ""
	@echo "  Or: make all    → Full end-to-end"
	@echo ""

.DEFAULT_GOAL := help
