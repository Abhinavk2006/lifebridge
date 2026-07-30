"""
lifebridge/backend/app/schemas/agents.py
Pydantic schemas for AI Agent activities, ticker feeds, and dispatch requests.
"""
from pydantic import BaseModel, Field
from typing import Optional
from enum import Enum

class AgentRole(str, Enum):
    DISCOVERY = "Discovery"
    VERIFICATION = "Verification"
    NEGOTIATION = "Negotiation"
    COMPLIANCE = "Compliance"
    SIMULATION = "Simulation"
    ORCHESTRATOR = "Orchestrator"

class AgentStatus(str, Enum):
    RUNNING = "running"
    COMPLETED = "completed"
    ACTION_NEEDED = "action_needed"
    ESCALATED = "escalated"

class AgentActivity(BaseModel):
    id: str
    agentId: str
    agentName: str
    agentRole: AgentRole
    action: str
    institutionName: Optional[str] = None
    caseId: str
    timestamp: str
    status: AgentStatus
    confidenceScore: float = Field(ge=0.0, le=1.0)
    explanation: str

class AgentDispatchRequest(BaseModel):
    agentRole: AgentRole
    targetInstitutionId: Optional[str] = None
    customPrompt: Optional[str] = None

class AgentDispatchResponse(BaseModel):
    dispatchId: str
    status: str = "DISPATCHED"
    caseId: str
    agentRole: AgentRole
    message: str = "Agent task queued for execution in LangGraph orchestrator."
