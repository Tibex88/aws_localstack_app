export EXTRA_CORS_ALLOWED_ORIGINS="*"
JS_FILES := $(wildcard dist/assets/index-*.js)

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

build-frontend: prepare_frontend
		cd packages/frontend && yarn && yarn build

bootstrap-frontend: build-frontend
		cd packages/infra && yarn cdklocal bootstrap --app="node dist/app-frontend.js";

deploy-frontend: bootstrap-frontend
		cd packages/infra && yarn cdklocal deploy --app="node dist/app-frontend.js";


# # Run the frontend
# run_frontend: deploy-frontend
# 		cd packages/frontend && yarn && yarn dev

good_candidate:
	make localstack_start build bootstrap deploy-frontend

.PHONY: activate create install localstack_start build bootstrap deploy good_candidate
