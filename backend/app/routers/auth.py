from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database.database import get_db
from app.schemas.auth import RegisterRequest, LoginRequest
from app.services.auth_service import AuthService

router = APIRouter(
    prefix="/auth",
    tags=["Authentication"],
)


@router.post("/register")
def register(
    data: RegisterRequest,
    db: Session = Depends(get_db),
):
    user = AuthService.register(db, data)

    return {
        "message": "Registration successful",
        "user_id": user.id,
    }


@router.post("/login")
def login(
    data: LoginRequest,
    db: Session = Depends(get_db),
):
    token = AuthService.login(
        db,
        data.email,
        data.password,
    )

    if token is None:
        raise HTTPException(
            status_code=401,
            detail="Invalid email or password",
        )

    return {
        "access_token": token,
        "token_type": "bearer",
    }