"""
RoomieSync FastAPI application entry point.

This is the backend foundation only. Authentication, database integration,
the AI/ML matching engine, chat, and expense-tracking endpoints are
intentionally not implemented yet — they depend on architecture decisions
(database/auth provider, ML approach) that are currently unresolved per
the RoomieSync requirements documents.
"""

from fastapi import FastAPI

from app.config import get_settings
from app.routers import health

settings = get_settings()

app = FastAPI(
    title=settings.app_name,
    version=settings.app_version,
)

app.include_router(health.router)


@app.get("/")
def root() -> dict:
    """Root endpoint confirming the API is reachable."""
    return {"message": "RoomieSync API is running", "docs": "/docs"}
