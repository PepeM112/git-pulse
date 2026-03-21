BACKEND_DIR := backend
FRONTEND_DIR := frontend
PYTHON_VENV := $(BACKEND_DIR)/.venv
UVICORN := $(PYTHON_VENV)/bin/uvicorn

default: help

.PHONY: help setup dev-backend dev-frontend dev install-backend install-frontend

setup: ## Initial setup for both frontend and backend
	@$(MAKE) install-backend
	@$(MAKE) install-frontend
	@echo "Setup complete. Run 'make dev' to start."

install-backend: ## Set up Python virtual environment and dependencies
	@echo "--- Setting up Backend ---"
	python3 -m venv $(PYTHON_VENV)
	$(PYTHON_VENV)/bin/pip install --upgrade pip
	$(PYTHON_VENV)/bin/pip install -e ./$(BACKEND_DIR)"[dev]"

install-frontend: ## Install Frontend dependencies
	@echo "Installing frontend dependencies..."
	cd $(FRONTEND_DIR) && npm install

up-backend: ## Start FastAPI server with hot-reload
	@echo "Running FastAPI server in http://localhost:8000 ..."
	@$(UVICORN) app.main:app --reload --port 8000 --app-dir $(BACKEND_DIR)

up-frontend: ## Start Vite development server
	cd $(FRONTEND_DIR) && npm run dev

gen-ts: ## Generate TypeScript client from OpenAPI/Pydantic models
	@echo "Generating TypeScript client from OpenAPI schema..."
	@cd $(FRONTEND_DIR) && npm run gen-client
	@echo "Done"

dev: ## Start both Backend and Frontend in parallel (interleaved logs)
	@echo "Starting full development environment (Press Ctrl+C to stop)..."
	@trap 'kill 0' SIGINT; \
	$(UVICORN) app.main:app --reload --port 8000 --app-dir $(BACKEND_DIR) & \
	cd $(FRONTEND_DIR) && npm run dev

help: ## Show this help menu
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-20s\033[0m %s\n", $$1, $$2}'