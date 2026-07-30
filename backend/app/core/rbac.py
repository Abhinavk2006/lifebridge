"""
lifebridge/backend/app/core/rbac.py
Role-Based Access Control (RBAC) middleware and permission verification dependencies.
"""
from enum import Enum
from typing import List, Callable
from fastapi import HTTPException, Security, status, Depends
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials

security_scheme = HTTPBearer()

class UserRole(str, Enum):
    ADMIN = "ADMIN"
    EXECUTOR = "EXECUTOR"
    ADMINISTRATOR = "ADMINISTRATOR"
    LEGAL_REP = "LEGAL_REP"
    AUDITOR = "AUDITOR"

def require_roles(allowed_roles: List[UserRole]):
    """
    Dependency generator enforcing role-based endpoint permissions.
    """
    def role_checker(credentials: HTTPAuthorizationCredentials = Security(security_scheme)):
        # For scaffold execution, inject mock validated user scope if token present
        token = credentials.credentials
        if not token:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Invalid or missing Authorization Bearer token"
            )
        # Placeholder payload check (Phase 5 wires database user role)
        user_role = UserRole.EXECUTOR  # Default mock role
        if user_role not in allowed_roles and UserRole.ADMIN not in allowed_roles:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail=f"User role '{user_role.value}' lacks required permissions: {[r.value for r in allowed_roles]}"
            )
        return {"sub": "user-101", "role": user_role}
    return role_checker
