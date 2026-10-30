"""
lifebridge/backend/app/api/v1/deactivation.py
Deceased Identity & Credential Deactivation API Endpoint Module.
Handles status tracking and official surrender letter generation for Aadhaar, PAN, DL, Voter ID, Passport.
"""
from typing import List, Dict, Any
from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
import time

router = APIRouter(prefix="/deactivation", tags=["Identity Deactivation"])

# In-memory mock database for credential deactivations
DEACTIVATION_DB: Dict[str, List[Dict[str, Any]]] = {
    "case-101": [
        {
            "id": "deact-aadhaar-101",
            "credentialType": "Aadhaar Card",
            "identifier": "XXXX-XXXX-8912",
            "authority": "UIDAI (Unique Identification Authority of India)",
            "status": "IN_PROGRESS",
            "initiatedDate": "2026-07-28",
            "completedDate": None,
            "formRequired": "UIDAI Deactivation Request / Death Notification",
            "auditHash": "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
            "notes": "Death certificate submitted to UIDAI regional portal. Awaiting biometric locking confirmation."
        },
        {
            "id": "deact-pan-101",
            "credentialType": "PAN Card",
            "identifier": "ABCDE1234F",
            "authority": "Income Tax Department (Assessing Officer)",
            "status": "PENDING_SURRENDER",
            "initiatedDate": None,
            "completedDate": None,
            "formRequired": "PAN Surrender Application to AO post final tax return",
            "auditHash": "8f434346648f6b96df89dda901c5176b10a6d83961dd3c1ac88b59b2dc327aa4",
            "notes": "Ready for surrender after filing the deceased's final ITR for Assessment Year 2026-27."
        },
        {
            "id": "deact-dl-101",
            "credentialType": "Driving License",
            "identifier": "DL-0420110098765",
            "authority": "Regional Transport Office (RTO Delhi)",
            "status": "COMPLETED",
            "initiatedDate": "2026-07-20",
            "completedDate": "2026-07-29",
            "formRequired": "RTO Form for DL Cancellation on Death",
            "auditHash": "11a547796d8e20253d7f02d41b65e96a40d65b16131c778fa023e3e09886d396",
            "notes": "DL marked as CANCELLED in Parivahan portal records. Acknowledgement receipt issued."
        },
        {
            "id": "deact-voter-101",
            "credentialType": "Voter ID (EPIC)",
            "identifier": "XYZ9876543",
            "authority": "Election Commission of India (ERO)",
            "status": "IN_PROGRESS",
            "initiatedDate": "2026-07-25",
            "completedDate": None,
            "formRequired": "Form 7 (Application for Seeking Deletion of Name in Electoral Roll)",
            "auditHash": "579173d18e87498c471f4502d7fb2e20b33230a3f65df962f913d0a28f41334f",
            "notes": "Form 7 submitted to Electoral Registration Officer (ERO). Field verification scheduled."
        },
        {
            "id": "deact-passport-101",
            "credentialType": "Passport",
            "identifier": "Z1234567",
            "authority": "Passport Seva Kendra (Ministry of External Affairs)",
            "status": "PENDING_SURRENDER",
            "initiatedDate": None,
            "completedDate": None,
            "formRequired": "Passport Surrender & Impounding Form",
            "auditHash": "d4735e3a265e16eee03f59718b9b5d03019c07d8b6c51f90da3a666eec13ab35",
            "notes": "Physical passport book ready for cancellation punch at local PSK."
        }
    ]
}

@router.get("/{case_id}")
def get_case_deactivations(case_id: str):
    """Retrieve identity credential deactivation statuses for a given case."""
    if case_id not in DEACTIVATION_DB:
        DEACTIVATION_DB[case_id] = [
            {
                "id": f"deact-aadhaar-{case_id}",
                "credentialType": "Aadhaar Card",
                "identifier": "XXXX-XXXX-1234",
                "authority": "UIDAI (Unique Identification Authority of India)",
                "status": "PENDING_SURRENDER",
                "initiatedDate": None,
                "completedDate": None,
                "formRequired": "UIDAI Deactivation Request",
                "auditHash": "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
                "notes": "Pending initiation by legal heir."
            },
            {
                "id": f"deact-pan-{case_id}",
                "credentialType": "PAN Card",
                "identifier": "ABCDE5678G",
                "authority": "Income Tax Department",
                "status": "PENDING_SURRENDER",
                "initiatedDate": None,
                "completedDate": None,
                "formRequired": "PAN Surrender Application to AO",
                "auditHash": "8f434346648f6b96df89dda901c5176b10a6d83961dd3c1ac88b59b2dc327aa4",
                "notes": "Pending initiation."
            },
            {
                "id": f"deact-dl-{case_id}",
                "credentialType": "Driving License",
                "identifier": "DL-0120150012345",
                "authority": "Regional Transport Office (RTO)",
                "status": "PENDING_SURRENDER",
                "initiatedDate": None,
                "completedDate": None,
                "formRequired": "RTO Form for DL Cancellation",
                "auditHash": "11a547796d8e20253d7f02d41b65e96a40d65b16131c778fa023e3e09886d396",
                "notes": "Pending initiation."
            },
            {
                "id": f"deact-voter-{case_id}",
                "credentialType": "Voter ID (EPIC)",
                "identifier": "ABC1234567",
                "authority": "Election Commission of India",
                "status": "PENDING_SURRENDER",
                "initiatedDate": None,
                "completedDate": None,
                "formRequired": "Form 7 (Electoral Roll Deletion)",
                "auditHash": "579173d18e87498c471f4502d7fb2e20b33230a3f65df962f913d0a28f41334f",
                "notes": "Pending initiation."
            },
            {
                "id": f"deact-passport-{case_id}",
                "credentialType": "Passport",
                "identifier": "A9876543",
                "authority": "Passport Seva Kendra",
                "status": "PENDING_SURRENDER",
                "initiatedDate": None,
                "completedDate": None,
                "formRequired": "Passport Cancellation Form",
                "auditHash": "d4735e3a265e16eee03f59718b9b5d03019c07d8b6c51f90da3a666eec13ab35",
                "notes": "Pending initiation."
            }
        ]
    return {
        "status": "SUCCESS",
        "caseId": case_id,
        "deactivations": DEACTIVATION_DB[case_id]
    }

@router.post("/{case_id}/initiate/{deact_id}")
def initiate_deactivation(case_id: str, deact_id: str):
    """Update status of a specific credential deactivation to IN_PROGRESS."""
    items = DEACTIVATION_DB.get(case_id, [])
    for item in items:
        if item["id"] == deact_id:
            item["status"] = "IN_PROGRESS"
            item["initiatedDate"] = time.strftime("%Y-%m-%d")
            item["notes"] = f"Deactivation process initiated by legal heir on {item['initiatedDate']}. Verification pending with authority."
            return {"status": "SUCCESS", "message": f"Initiated {item['credentialType']} deactivation", "item": item}
    raise HTTPException(status_code=404, detail="Deactivation record not found")

@router.post("/{case_id}/complete/{deact_id}")
def complete_deactivation(case_id: str, deact_id: str):
    """Mark a credential deactivation as COMPLETED."""
    items = DEACTIVATION_DB.get(case_id, [])
    for item in items:
        if item["id"] == deact_id:
            item["status"] = "COMPLETED"
            item["completedDate"] = time.strftime("%Y-%m-%d")
            item["notes"] = f"Deactivation confirmed & cancelled by {item['authority']}."
            return {"status": "SUCCESS", "message": f"Completed {item['credentialType']} deactivation", "item": item}
    raise HTTPException(status_code=404, detail="Deactivation record not found")

@router.post("/{case_id}/purge-details")
def purge_deceased_details(case_id: str):
    """Irrevocably redact and purge sensitive deceased PII credentials (Aadhaar, PAN, DL) from active database records."""
    items = DEACTIVATION_DB.get(case_id, [])
    purged_count = 0
    timestamp = time.strftime("%Y-%m-%d %H:%M:%S")
    for item in items:
        item["identifier"] = f"[REDACTED-{item['credentialType'].upper().replace(' ', '_')}-HASH]"
        item["notes"] = f"Sensitive detail purged & redacted on {timestamp} per DPDP Act compliance."
        purged_count += 1
    
    return {
        "status": "SUCCESS",
        "message": f"Successfully redacted {purged_count} identity credentials for case {case_id}.",
        "purgedAt": timestamp,
        "auditHash": "c5f1a9b2d8e34f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0a",
        "complianceRef": "DPDP-ACT-2023-SEC-12 / IT-ACT-2000"
    }

@router.get("/{case_id}/surrender-letter/{deact_id}")
def get_surrender_letter(case_id: str, deact_id: str):
    """Generate official pre-filled surrender and deactivation application letter template."""
    items = DEACTIVATION_DB.get(case_id, [])
    target = next((item for item in items if item["id"] == deact_id), None)
    if not target:
        raise HTTPException(status_code=404, detail="Deactivation record not found")
    
    letter_text = f"""OFFICIAL APPLICATION FOR SURRENDER & DEACTIVATION OF DECEASED CREDENTIAL

To,
The Competent Authority,
{target['authority']}

Subject: Formal Intimation of Death & Application for Surrender/Deactivation of {target['credentialType']} (ID Ref: {target['identifier']})

Respected Sir/Madam,

I am writing in my capacity as the verified Legal Heir / Administrator of the deceased individual specified below:

1. Deceased Individual Name: [Deceased Name]
2. Document/Credential Type: {target['credentialType']}
3. Identity Number / Ref: {target['identifier']}
4. Date of Demise: [Date of Death]
5. Death Certificate Registration No: DC-MH-2026-88492
6. Statutory Form Reference: {target['formRequired']}

As per applicable statutory regulations and governing instructions, I hereby request the immediate deactivation, biometric locking, or cancellation of the aforementioned credential in your official registry to prevent any unauthorized misuse or identity theft.

Enclosures Attached:
- Certified Copy of Death Certificate
- Legal Heir / Succession Certificate
- Verified Identity Proof of Legal Heir Applicant

Yours faithfully,

_______________________
[Signature of Verified Legal Heir]
Date: {time.strftime('%Y-%m-%d')}
Place: [Jurisdiction Court District]
"""
    return {
        "status": "SUCCESS",
        "caseId": case_id,
        "deactId": deact_id,
        "credentialType": target["credentialType"],
        "authority": target["authority"],
        "formRequired": target["formRequired"],
        "letterContent": letter_text
    }

