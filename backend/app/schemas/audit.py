"""
lifebridge/backend/app/schemas/audit.py
Pydantic schemas for cryptographic audit logs and export packs.
"""
from pydantic import BaseModel
from typing import Optional, Dict, Any
from enum import Enum

class ActorType(str, Enum):
    AI_AGENT = "AI Agent"
    HUMAN_USER = "Human User"
    SYSTEM = "System"

class ActionGroup(str, Enum):
    DOCUMENT_PARSE = "DOCUMENT_PARSE"
    AGENT_DECISION = "AGENT_DECISION"
    CLAIM_DISPATCH = "CLAIM_DISPATCH"
    APPROVAL_GRANTED = "APPROVAL_GRANTED"
    FEE_WAIVER = "FEE_WAIVER"

class AuditRecord(BaseModel):
    id: str
    caseId: str
    timestamp: str
    actor: str
    actorType: ActorType
    actionGroup: ActionGroup
    description: str
    hashSHA256: str
    reasoning: Optional[str] = None
    metadata: Optional[Dict[str, Any]] = None

class AuditExportResponse(BaseModel):
    downloadUrl: str
    hashSHA256: str
    generatedAt: str
    totalRecordsCount: int
