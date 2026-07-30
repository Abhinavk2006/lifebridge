"""
lifebridge/backend/app/api/v1/agents.py
Agent Orchestration interface & activity feed routes.
"""
from fastapi import APIRouter, HTTPException, status
from typing import List
import uuid
from app.schemas.agents import AgentActivity, AgentDispatchRequest, AgentDispatchResponse
from app.seed.seed_data import ACTIVITIES_DB

router = APIRouter(tags=["AI Agents"])

@router.get("/cases/{case_id}/agents/activity", response_model=List[AgentActivity])
async def get_agent_activities(case_id: str):
    """
    Fetch history of agent activities for a given case.
    """
    return [act for act in ACTIVITIES_DB if act["caseId"] == case_id]

@router.post("/cases/{case_id}/agents/dispatch", response_model=AgentDispatchResponse)
async def dispatch_agent(case_id: str, request: AgentDispatchRequest):
    """
    Interface endpoint to trigger Phase 5 multi-agent orchestrator execution.
    """
    dispatch_id = f"dsp-{uuid.uuid4().hex[:8]}"
    return AgentDispatchResponse(
        dispatchId=dispatch_id,
        status="DISPATCHED",
        caseId=case_id,
        agentRole=request.agentRole,
        message=f"Dispatched '{request.agentRole.value}' agent for execution in LangGraph mesh."
    )

@router.get("/agents/ticker", response_model=List[AgentActivity])
async def get_ticker_feed_polling_fallback():
    """
    Polling fallback for agent ticker events.
    """
    return ACTIVITIES_DB
