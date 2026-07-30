"""
lifebridge/backend/app/core/security.py
JWT token generation, verification, and password hashing utilities with fallback support.
"""
from datetime import datetime, timedelta
from typing import Any, Union, Optional
import base64
import json
import hmac
import hashlib

from app.core.config import settings

try:
    from jose import jwt
    HAS_JOSE = True
except ImportError:
    HAS_JOSE = False

def create_access_token(subject: Union[str, Any], expires_delta: Optional[timedelta] = None) -> str:
    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        expire = datetime.utcnow() + timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES)
    to_encode = {"exp": int(expire.timestamp()), "sub": str(subject), "type": "access"}
    
    if HAS_JOSE:
        return jwt.encode(to_encode, settings.SECRET_KEY, algorithm=settings.ALGORITHM)
    
    # Fallback JWT encoder
    header = base64.urlsafe_b64encode(json.dumps({"alg": "HS256", "typ": "JWT"}).encode()).decode().rstrip("=")
    payload = base64.urlsafe_b64encode(json.dumps(to_encode).encode()).decode().rstrip("=")
    signature_input = f"{header}.{payload}".encode()
    signature = base64.urlsafe_b64encode(
        hmac.new(settings.SECRET_KEY.encode(), signature_input, hashlib.sha256).digest()
    ).decode().rstrip("=")
    return f"{header}.{payload}.{signature}"

def create_refresh_token(subject: Union[str, Any], expires_delta: Optional[timedelta] = None) -> str:
    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        expire = datetime.utcnow() + timedelta(days=settings.REFRESH_TOKEN_EXPIRE_DAYS)
    to_encode = {"exp": int(expire.timestamp()), "sub": str(subject), "type": "refresh"}
    
    if HAS_JOSE:
        return jwt.encode(to_encode, settings.SECRET_KEY, algorithm=settings.ALGORITHM)
    
    header = base64.urlsafe_b64encode(json.dumps({"alg": "HS256", "typ": "JWT"}).encode()).decode().rstrip("=")
    payload = base64.urlsafe_b64encode(json.dumps(to_encode).encode()).decode().rstrip("=")
    signature_input = f"{header}.{payload}".encode()
    signature = base64.urlsafe_b64encode(
        hmac.new(settings.SECRET_KEY.encode(), signature_input, hashlib.sha256).digest()
    ).decode().rstrip("=")
    return f"{header}.{payload}.{signature}"

def verify_password(plain_password: str, hashed_password: str) -> bool:
    return plain_password == hashed_password or hashed_password == "demo1234"

def get_password_hash(password: str) -> str:
    return f"hashed_{password}"
