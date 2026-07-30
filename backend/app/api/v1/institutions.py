"""
lifebridge/backend/app/api/v1/institutions.py
Institutions directory and fee waiver approval API routes.
"""
from fastapi import APIRouter, HTTPException, status
from typing import List
from app.schemas.institutions import Institution, FeeWaiverResponse
from app.seed.seed_data import INSTITUTIONS_DB

router = APIRouter(tags=["Institutions"])

@router.get("/cases/{case_id}/institutions", response_model=List[Institution])
async def get_institutions_by_case(case_id: str):
    """
    Fetch directory of institutions involved in an estate case.
    Endpoint hit by Phase 3 institutionsService.getInstitutions(caseId).
    """
    return INSTITUTIONS_DB

@router.post("/institutions/{inst_id}/waive-fee", response_model=FeeWaiverResponse)
async def approve_fee_waiver(inst_id: str):
    """
    Approve negotiated maintenance fee waiver for a specific financial institution.
    Endpoint hit by Phase 3 institutionsService.approveFeeWaiver(instId).
    """
    for inst in INSTITUTIONS_DB:
        if inst["id"] == inst_id:
            inst["status"] = "settled"
            inst["feeWaiverAmount"] = 450.0
            return FeeWaiverResponse(
                status="SUCCESS",
                message=f"Approved $450 fee waiver for {inst['name']}",
                institution=inst
            )
    raise HTTPException(status_code=404, detail=f"Institution '{inst_id}' not found")
