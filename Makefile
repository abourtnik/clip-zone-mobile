.PHONY: help, start, deploy
.DEFAULT_GOAL=help

help: ## Show help options
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}'

start: ## Start dev server
	bunx expo start --go --offline

deploy:
	eas build --non-interactive --platform android --profile production --auto-submit