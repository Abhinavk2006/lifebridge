"""
lifebridge/backend/app/agents/state.py
LangGraph multi-agent state definitions for LifeBridge AI.
"""
from typing import Dict, Any, List, Optional
from pydantic import BaseModel, Field
from typing_extensions import TypedDict

class TaskNodeState(TypedDict):
    id: str
    caseId: str
    title: str
    assignedAgent: str
    status: str  # 'completed' | 'in_progress' | 'pending' | 'blocked' | 'action_required'
    dependencies: List[str]

class AgentState(TypedDict):
    case_id: str
    deceased_name: str
    current_stage: str
    active_agent: str
    progress_percent: int
    dag_nodes: List[TaskNodeState]
    discovered_institutions: List[Dict[str, Any]]
    verified_documents: List[Dict[str, Any]]
    pending_actions: List[Dict[str, Any]]
    audit_logs: List[Dict[str, Any]]
    human_approval_required: bool
    error: Optional[str]
