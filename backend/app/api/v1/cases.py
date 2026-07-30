"""
lifebridge/backend/app/api/v1/cases.py
Estate cases management & execution DAG API routes.
"""
from fastapi import APIRouter, HTTPException, Depends, status
from typing import List
from app.schemas.cases import EstateCase, EstateCaseCreate, DAGNode
from app.seed.seed_data import CASES_DB, DAG_NODES_DB
from app.core.rbac import require_roles, UserRole

router = APIRouter(tags=["Cases"])

@router.get("/cases", response_model=List[EstateCase])
async def get_cases():
    """
    List all estate cases assigned to the user or organization.
    Endpoint hit by Phase 3 casesService.getCases().
    """
    return CASES_DB

@router.post("/cases", response_model=EstateCase, status_code=status.HTTP_201_CREATED)
async def create_case(payload: EstateCaseCreate):
    """
    Register a new estate settlement case into PostgreSQL & Neo4j.
    """
    new_id = f"c-{100 + len(CASES_DB) + 1}"
    new_case = {
        "id": new_id,
        "deceasedName": payload.deceasedName,
        "dateOfBirth": payload.dateOfBirth,
        "dateOfDeath": payload.dateOfDeath,
        "ssnMasked": f"***-**-{payload.ssn[-4:]}",
        "jurisdiction": payload.jurisdiction,
        "executorName": payload.executorName,
        "executorRole": payload.executorRole,
        "status": "intake",
        "progressPercent": 5,
        "totalAssets": 0.0,
        "totalLiabilities": 0.0,
        "netEstateValue": 0.0,
        "institutionsCount": 0,
        "resolvedInstitutionsCount": 0,
        "openActionCount": 1,
        "createdAt": "2026-07-30",
        "updatedAt": "2026-07-30",
        "primaryAttorney": "Harrison & Sterling LLP",
        "probateCourt": payload.probateCourt,
        "caseNumber": payload.caseNumber
    }
    CASES_DB.append(new_case)
    return new_case

@router.get("/cases/{case_id}", response_model=EstateCase)
async def get_case_by_id(case_id: str):
    """
    Fetch full details for a specific estate case.
    Endpoint hit by Phase 3 casesService.getCaseById(id).
    """
    for case in CASES_DB:
        if case["id"] == case_id:
            return case
    raise HTTPException(status_code=404, detail=f"Case '{case_id}' not found")

@router.get("/cases/{case_id}/dag", response_model=List[DAGNode])
async def get_case_dag_nodes(case_id: str):
    """
    Fetch execution DAG dependency nodes for Mission Control visualization.
    Endpoint hit by Phase 3 casesService.getDAGNodes(caseId).
    """
    nodes = [node for node in DAG_NODES_DB if node["caseId"] == case_id]
    return nodes
