PYTHON_VENV := .venv
UVICORN := $(PYTHON_VENV)/bin/uvicorn

default: help

.PHONY: help setup dev-backend dev-frontend dev install-backend install-frontend

setup: ## Initial setup for both frontend and backend
	@make install-backend
	@make install-frontend
	@echo "Setup complete. Run 'make dev' to start."

install-backend: ## Set up Python virtual environment and dependencies
	@echo "--- Setting up Backend ---"
	cd backend && python3 -m venv .venv
	cd backend && .venv/bin/pip install --upgrade pip
	cd backend && .venv/bin/pip install -e ".[dev]"

install-frontend: ## Install Frontend dependencies
	@echo "Installing frontend dependencies..."
	cd frontend && npm install

up-backend: ## Start FastAPI server with hot-reload
	@echo "Running FastAPI server in http://localhost:8000 ..."
	@$(UVICORN) app.main:app --reload --port 8000 --app-dir backend

up-frontend: ## Start Vite development server
	cd frontend && npm run dev

gen-ts: ## Generate TypeScript client from OpenAPI/Pydantic models
	@echo "Generating TypeScript client from OpenAPI schema..."
	@cd frontend && npm run gen-client
	@echo "Done"

help: ## Show this help menu
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-20s\033[0m %s\n", $$1, $$2}'