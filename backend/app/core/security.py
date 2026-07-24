from datetime import datetime, timedelta
from typing import Any

import jwt

from app.core.config import settings


def create_access_token(subject: str, expires_delta: int | None = None) -> str:
    if expires_delta is None:
        expires_delta = 60 * 60 * 24

    expire = datetime.utcnow() + timedelta(seconds=expires_delta)
    payload = {"sub": subject, "exp": expire}
    return jwt.encode(payload, settings.SECRET_KEY, algorithm="HS256")
