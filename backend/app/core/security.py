from datetime import datetime, timedelta, timezone

import bcrypt
from jose import JWTError, jwt

from app.core.config import settings

# bcrypt only uses the first 72 bytes; newer bcrypt versions raise instead of truncating.
BCRYPT_MAX_BYTES = 72


def _encode_password(password: str) -> bytes:
    return password.encode("utf-8")[:BCRYPT_MAX_BYTES]


def hash_password(password: str) -> str:
    return bcrypt.hashpw(
        _encode_password(password),
        bcrypt.gensalt()
    ).decode("utf-8")


def verify_password(
    plain_password: str,
    hashed_password: str
) -> bool:
    try:
        return bcrypt.checkpw(
            _encode_password(plain_password),
            hashed_password.encode("utf-8")
        )
    except ValueError:
        # Malformed or non-bcrypt hash stored for this user.
        return False


def create_access_token(
    data: dict,
    expires_delta: timedelta | None = None,
):
    to_encode = data.copy()

    expire = datetime.now(timezone.utc) + (
        expires_delta
        or timedelta(
            minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES
        )
    )

    to_encode.update({"exp": expire})

    return jwt.encode(
        to_encode,
        settings.SECRET_KEY,
        algorithm=settings.ALGORITHM,
    )


def decode_token(token: str):
    try:
        payload = jwt.decode(
            token,
            settings.SECRET_KEY,
            algorithms=[settings.ALGORITHM],
        )

        return payload

    except JWTError:
        return None