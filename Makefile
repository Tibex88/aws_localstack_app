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

# Install requirements into the virtual environment
install:
	$(VENV_DIR)/bin/pip install -r $(REQUIREMENTS)
	@echo "Dependencies installed from $(REQUIREMENTS)"

# Run localstack in the virtual  ind etacked mode
# this will pull localstack image from docker of not already present
localstack_start:
	localstack start -d \
	docker ps -a | grep localstack \

# Deploy the infrastructure
build:
		yarn && yarn build:backend;

bootstrap:
		yarn cdklocal bootstrap;

## Deploy the infrastructure
deploy:
		yarn cdklocal deploy;



.PHONY: activate create install localstack_start build bootstrap deploy
