"""
lifebridge/backend/app/api/v1/router.py
Master API Router aggregating domain endpoint modules.
"""
from fastapi import APIRouter
from app.api.v1 import auth, cases, documents, institutions, agents, audit, deactivation

api_router = APIRouter()

api_router.include_router(auth.router)
api_router.include_router(cases.router)
api_router.include_router(documents.router)
api_router.include_router(institutions.router)
api_router.include_router(agents.router)
api_router.include_router(audit.router)
api_router.include_router(deactivation.router)
