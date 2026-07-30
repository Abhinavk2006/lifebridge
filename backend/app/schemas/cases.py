"""
lifebridge/backend/app/schemas/cases.py
Pydantic schemas for Estate Cases and Execution DAG nodes matching Phase 3 Frontend.
"""
from pydantic import BaseModel, Field
from typing import List, Optional
from enum import Enum

class CaseStatus(str, Enum):
    INTAKE = "intake"
    DISCOVERY = "discovery"
    VERIFICATION = "verification"
    NEGOTIATION = "negotiation"
    SETTLED = "settled"
    CLOSED = "closed"

class ExecutorRole(str, Enum):
    EXECUTOR = "Executor"
    ADMINISTRATOR = "Administrator"
    LEGAL_REP = "Legal Rep"

class EstateCaseBase(BaseModel):
    deceasedName: str
    dateOfBirth: str
    dateOfDeath: str
    ssnMasked: str = "***-**-8492"
    jurisdiction: str
    executorName: str
    executorRole: ExecutorRole
    status: CaseStatus = CaseStatus.INTAKE
    progressPercent: int = Field(default=0, ge=0, le=100)
    totalAssets: float = 0.0
    totalLiabilities: float = 0.0
    netEstateValue: float = 0.0
    institutionsCount: int = 0
    resolvedInstitutionsCount: int = 0
    openActionCount: int = 0
    primaryAttorney: Optional[str] = None
    probateCourt: str
    caseNumber: str

class EstateCaseCreate(BaseModel):
    deceasedName: str
    dateOfBirth: str
    dateOfDeath: str
    ssn: str
    jurisdiction: str
    executorName: str
    executorRole: ExecutorRole
    probateCourt: str
    caseNumber: str

class EstateCase(EstateCaseBase):
    id: str
    createdAt: str
    updatedAt: str

    class Config:
        from_attributes = True

class DAGNode(BaseModel):
    id: str
    caseId: str
    title: str
    description: str
    assignedAgent: str
    status: str  # 'completed' | 'in_progress' | 'pending' | 'blocked' | 'action_required'
    dependencies: List[str]
    estimatedDays: int
    category: str  # 'Legal' | 'Financial' | 'Verification' | 'Disbursement' | 'Tax'
