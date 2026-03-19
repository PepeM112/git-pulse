PYTHON_VENV := backend/.venv
PYTHON := $(PYTHON_VENV)/bin/python
UVICORN := $(PYTHON_VENV)/bin/uvicorn

default: help

.PHONY: help setup dev-backend dev-frontend dev install-backend install-frontend

setup: ## Initial setup for both frontend and backend
	@make install-backend
	@make install-frontend
	@echo "✅ Setup complete. Run 'make dev' to start."

install-backend: ## Set up Python virtual environment and dependencies
	@echo "--- Setting up Backend ---"
	cd backend && python3 -m venv .venv
	cd backend && .venv/bin/pip install --upgrade pip
	cd backend && .venv/bin/pip install -e ".[dev]"

install-frontend: ## Install React dependencies
	@echo "--- Setting up Frontend ---"
	cd frontend && npm install

dev-backend: ## Run FastAPI server with hot-reload
	cd backend && $(UVICORN) app.main:app --reload --port 8000

dev-frontend: ## Run Vite server
	cd frontend && npm run dev

dev: ## Run both Frontend and Backend in parallel
	@npx npm-run-all --parallel dev-frontend dev-backend

help: ## Show this help menu
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-20s\033[0m %s\n", $$1, $$2}'