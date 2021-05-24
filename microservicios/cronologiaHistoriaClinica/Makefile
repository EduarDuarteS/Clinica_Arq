.PHONY: build
build:
	sam build --template-file sam-template.yaml

deploy:
	sam deploy --template-file sam-template.yaml --guided

start-locally:
	sam local start-lambda
