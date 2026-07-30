"""
lifebridge/backend/app/core/config.py
Pydantic environment and app configuration settings.
"""
from pydantic_settings import BaseSettings
from typing import List

class Settings(BaseSettings):
    PROJECT_NAME: str = "LifeBridge AI Backend"
    API_V1_STR: str = "/api"
    VERSION: str = "2.4.0"
    
    # CORS
    ALLOWED_ORIGINS: List[str] = ["http://localhost:3000", "http://localhost:8000", "*"]
    
    # Security
    SECRET_KEY: str = "lifebridge-super-secret-jwt-key-change-in-production"
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 15
    REFRESH_TOKEN_EXPIRE_DAYS: int = 7
    
    # Database URIs
    POSTGRES_URI: str = "postgresql+asyncpg://lifebridge:password@localhost:5432/lifebridge_db"
    NEO4J_URI: str = "bolt://localhost:7687"
    NEO4J_USER: str = "neo4j"
    NEO4J_PASSWORD: str = "password"
    REDIS_URI: str = "redis://localhost:6379/0"

    class Config:
        case_sensitive = True

settings = Settings()
