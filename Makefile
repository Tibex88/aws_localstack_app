# Name of the virtual environment directory
VENV_DIR := .venv

# Python executable to use (you can specify a version, e.g., python3.8)
PYTHON := python

# Requirements file
REQUIREMENTS := requirements.txt

# create:
# # Rule to create the virtual environment
# 	$(PYTHON) -m venv $(VENV_DIR)
# 	. $(VENV_DIR)/bin/activate
# 	$(VENV_DIR)/bin/pip install --upgrade pip
# 	@if [ -f $(REQUIREMENTS) ]; then \
# 		$(VENV_DIR)/bin/pip install -r $(REQUIREMENTS); \
# 	fi
# 	@echo "Virtual environment created in $(VENV_DIR)"



# Clean up the virtual environment directory
# clean:
# 	rm -rf $(VENV_DIR)
# 	@echo "Virtual environment removed"


####Virtual Environment
# Install requirements into the virtual environment
install:
	$(VENV_DIR)/bin/pip install -r $(REQUIREMENTS)
	@echo "Dependencies installed from $(REQUIREMENTS)"

# Run localstack in the virtual  ind etacked mode
# this will pull localstack image from docker of not already present
localstack_start:
	localstack start
	docker ps -a | grep localstack 

localstack_stop:
	localstack stop


####Infrastructure & Backend
# Build the backend
build:
		cd packages/backend && yarn && yarn build;
# Bootstrap the infrastructure
bootstrap:
		cd packages/infra && yarn && yarn cdklocal bootstrap;

## Deploy the infrastructure
deploy:
		cd packages/infra && yarn && yarn cdklocal deploy;

# ####Frontend
# Run the frontend
run_frontend:
		cd packages/frontend && yarn && yarn dev;
# ## Build the frontend
# build_frontend:
# 	cd packages/frontend && yarn && yarn build

# ## Bootstrap frontend
# bootstrap_frontend:
# 	cd packages/frontend && yarn cdklocal bootstrap --app="node dist/assets/*.js";

# ## Deploy the frontend
# deploy_frontend:
# 		yarn cdklocal deploy --app="node dist/aws-sdk-js-notes-app-frontend.js";



.PHONY: activate create install localstack_start build bootstrap deploy
