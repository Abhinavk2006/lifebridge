"""
lifebridge/backend/app/api/v1/auth.py
Authentication & token management API routes.
"""
from fastapi import APIRouter, HTTPException, status
from app.schemas.auth import LoginRequest, TokenResponse, RefreshRequest, UserProfile
from app.core.security import create_access_token, create_refresh_token

router = APIRouter(prefix="/auth", tags=["Authentication"])

@router.post("/login", response_model=TokenResponse)
async def login(credentials: LoginRequest):
    """
    Authenticate user credentials and issue JWT access and refresh tokens.
    """
    # Demo credentials check
    if credentials.email == "eleanor@lifebridge.ai" and credentials.password == "demo1234":
        access_token = create_access_token(subject="usr-101")
        refresh_token = create_refresh_token(subject="usr-101")
        return TokenResponse(
            access_token=access_token,
            refresh_token=refresh_token,
            expires_in=900
        )
    raise HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Invalid email or password"
    )

@router.post("/refresh", response_model=TokenResponse)
async def refresh_tokens(request: RefreshRequest):
    """
    Issue new access token using a valid refresh token.
    """
    new_access_token = create_access_token(subject="usr-101")
    return TokenResponse(
        access_token=new_access_token,
        refresh_token=request.refresh_token,
        expires_in=900
    )

@router.get("/me", response_model=UserProfile)
async def get_current_user_profile():
    """
    Return currently authenticated user profile.
    """
    return UserProfile(
        id="usr-101",
        email="eleanor@lifebridge.ai",
        full_name="Eleanor Pendelton Vance",
        role="EXECUTOR",
        is_active=True
    )
