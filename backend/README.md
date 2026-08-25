# RoomieSync Backend

FastAPI backend foundation for RoomieSync.

## Scope of this foundation

This sets up the basic application skeleton only:
- FastAPI app entry point
- Configuration/environment handling
- A `GET /health` endpoint
- Test setup

**Not included yet** (pending architecture decisions on currently unresolved
requirements — see project `docs/`): authentication, database integration,
the AI/ML matching engine, chat, and expense-tracking endpoints.

## Requirements

- Python 3.11+

## Local Setup

```bash
cd backend
python -m venv venv
source venv/bin/activate   # Windows: venv\Scripts\activate
pip install -r requirements.txt
cp .env.example .env
```

## Run the server

```bash
uvicorn app.main:app --reload
```

The API will be available at `http://localhost:8000`.
Interactive docs: `http://localhost:8000/docs`
Health check: `http://localhost:8000/health`

## Run tests

```bash
pytest
```

## Run with Docker

```bash
docker build -t roomiesync-backend .
docker run -p 8000:8000 roomiesync-backend
```

## Structure

```
backend/
├── app/
│   ├── main.py            # FastAPI app entry point
│   ├── config.py          # Environment/settings handling
│   └── routers/
│       └── health.py      # GET /health
├── tests/
│   └── test_health.py
├── requirements.txt
├── .env.example
├── Dockerfile
└── pytest.ini
```
