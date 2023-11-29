install:
	poetry install

lint:
	-cd backend/ && poetry run ruff .
	-cd backend/ && poetry run black .
	-cd backend/ && poetry run mypy --strict --explicit-package-bases .

.PHONY: backend
backend:
	cd backend/ && poetry run uvicorn services:app --reload

.PHONY: frontend
frontend: 
	cd frontend/ && npm run start