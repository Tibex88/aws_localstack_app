export EXTRA_CORS_ALLOWED_ORIGINS="*"

# # Name of the virtual environment directory
# VENV_DIR := .venv
# # Requirements file
# REQUIREMENTS := requirements.txt
# # Python executable to use (you can specify a version, e.g., python3.8)
# # Determine the Python executable
# PYTHON := $(shell command -v python3 2>/dev/null || command -v python || where python 2>NUL)

# # Check if Python is available
# ifeq ($(PYTHON),)
# $(error "Python is not installed")
# endif


# # Target to set up a virtual environment
# $(VENV_DIR)/bin/activate:  ## Create virtual environment if it doesn't exist
# 	$(PYTHON) -m venv $(VENV_DIR);

# # Install dependencies within the virtual environment
# install-dependencies: $(VENV_DIR)/bin/activate
# 	@echo "Installing dependencies..."
# 	$(VENV_DIR)/bin/pip install -r requirements.txt
# 	@echo "Dependencies installed."

# # Target to activate the virtual environment and start LocalStack
# run-localstack: install-dependencies
# 	@echo "Starting LocalStack..."
# ifeq ($(OS),Windows_NT)
# 	$(VENV_DIR)/Scripts/python -m localstack.cli.main start -d
# else
# 	source $(VENV_DIR)/bin/activate && localstack start -d
# endif
# 	@echo "LocalStack is running in detached mode."


# Clean up the virtual environment directory
# clean:
# 	rm -rf $(VENV_DIR)
# 	@echo "Virtual environment removed"


####Virtual Environment
# Install requirements into the virtual environment
# install:
# 	$(VENV_DIR)/Scripts/pip install -r $(REQUIREMENTS)
# 	@echo "Dependencies installed from $(REQUIREMENTS)"


# docker run -d -p 4566:4566 --name localstack-main -e LAMBDA_EXECUTOR=docker -e EXTRA_CORS_ALLOWED_ORIGINS='*' localstack/localstack
# Run localstack in the virtual  ind etacked mode
# this will pull localstack image from docker of not already present
localstack_start:
	localstack start -d
	docker ps -a | grep localstack 

localstack_stop:
	localstack stop

####Infrastructure & Backend
# Build the backend
build:
		cd packages/backend && yarn && yarn build
# Bootstrap the infrastructure
bootstrap:
		cd packages/infra && yarn && yarn cdklocal bootstrap

## Deploy the infrastructure
deploy:
		cd packages/infra && yarn && yarn cdklocal deploy -V

# ####Frontend
# prepare the config file with the newly generated url
prepare_frontend:
		node packages/scripts/prepare-frontend.js --local

# Run the frontend
run_frontend:prepare_frontend
		cd packages/frontend && yarn && yarn dev

### Build the frontend
# build_frontend:
# 	cd packages/frontend && yarn && yarn build

# ## Bootstrap frontend
# bootstrap_frontend:
# 	cd packages/frontend && yarn cdklocal bootstrap --app="node dist/assets/*.js";

# ## Deploy the frontend
# deploy_frontend:
# 		yarn cdklocal deploy --app="node dist/aws-sdk-js-notes-app-frontend.js";

good_candidate:
	make localstack_start build bootstrap run_frontend

.PHONY: activate create install localstack_start build bootstrap deploy good_candidate
