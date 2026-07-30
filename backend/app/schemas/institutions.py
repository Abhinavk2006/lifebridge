"""
lifebridge/backend/app/schemas/institutions.py
Pydantic schemas for institutions, claims, and fee waivers matching Phase 3 Frontend.
"""
from pydantic import BaseModel
from typing import List, Optional
from enum import Enum

class InstitutionSector(str, Enum):
    BANKING = "Banking"
    INSURANCE = "Insurance"
    GOVERNMENT = "Government"
    PROPERTY = "Property"
    UTILITIES = "Utilities"
    SUBSCRIPTIONS = "Subscriptions"
    PENSION = "Pension"
    LOANS = "Loans"

class InstitutionStatus(str, Enum):
    DISCOVERED = "discovered"
    NOTIFIED = "notified"
    IN_NEGOTIATION = "in_negotiation"
    SETTLED = "settled"
    DISPUTED = "disputed"

class Institution(BaseModel):
    id: str
    name: str
    sector: InstitutionSector
    accountNumberMasked: str
    estimatedValue: float
    accountType: str
    status: InstitutionStatus
    contactPerson: Optional[str] = None
    lastContactDate: str
    feeWaiverAmount: float = 0.0
    sopRequirements: List[str] = []
    claimId: str

class FeeWaiverResponse(BaseModel):
    status: str
    message: str
    institution: Optional[Institution] = None
