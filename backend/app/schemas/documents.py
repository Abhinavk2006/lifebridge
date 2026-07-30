"""
lifebridge/backend/app/schemas/documents.py
Pydantic schemas for document vault items and asynchronous ingestion responses.
"""
from pydantic import BaseModel, Field
from typing import Optional, List
from enum import Enum

class DocumentType(str, Enum):
    PDF = "PDF"
    IMAGE = "IMAGE"
    DOCX = "DOCX"

class DocumentCategory(str, Enum):
    IDENTITY = "Identity"
    LEGAL = "Legal"
    FINANCIAL = "Financial"
    TAX = "Tax"
    PROPERTY = "Property"
    COURT = "Court"

class TamperStatus(str, Enum):
    PASSED = "PASSED"
    WARNING = "WARNING"
    FAILED = "FAILED"

class DocumentItem(BaseModel):
    id: str
    caseId: str
    fileName: str
    fileType: DocumentType
    category: DocumentCategory
    uploadedAt: str
    authenticityScore: float = Field(ge=0.0, le=100.0)
    tamperStatus: TamperStatus
    issuingAuthority: str
    extractedEntitiesCount: int
    summary: str
    fileUrl: Optional[str] = None

class DocumentUploadResponse(BaseModel):
    jobId: str
    status: str = "QUEUED"
    message: str = "Document uploaded successfully. Async OCR & forgery detection pipeline triggered."
    websocketChannel: str

class DocumentJobStatus(BaseModel):
    jobId: str
    status: str  # 'QUEUED' | 'PROCESSING' | 'COMPLETED' | 'FAILED'
    progress: int = 0
    result: Optional[DocumentItem] = None
    errorMessage: Optional[str] = None
