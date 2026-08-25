"""
Application configuration, loaded from environment variables.

This module only defines generic app-level settings (name, environment,
API metadata). Database, authentication, and third-party service
configuration are intentionally not defined here yet — those integrations
are unresolved/undecided per the RoomieSync requirements documents and
will be added once clarified.
"""

from functools import lru_cache

from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    app_name: str = "RoomieSync API"
    app_version: str = "0.1.0"
    environment: str = "development"
    debug: bool = True

    model_config = SettingsConfigDict(
        env_file=".env",
        env_file_encoding="utf-8",
        extra="ignore",
    )


@lru_cache
def get_settings() -> Settings:
    """Return a cached Settings instance so env vars are read once."""
    return Settings()
