from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.core.dependencies import get_current_user
from app.database.database import get_db
from app.schemas.auth import (
    LoginRequest,
    RegisterRequest,
    TokenResponse,
    UserResponse,
)
from app.services.auth_service import AuthService

router = APIRouter(
    prefix="/auth",
    tags=["Authentication"],
)


@router.post(
    "/register",
    status_code=status.HTTP_201_CREATED,
    summary="Register a new user",
    description="Creates a new hospital or vendor account.",
)
def register(
    data: RegisterRequest,
    db: Session = Depends(get_db),
):
    user = AuthService.register(db, data)

    return {
        "message": "Registration successful",
        "user_id": user.id,
    }


@router.post(
    "/login",
    response_model=TokenResponse,
    summary="Login",
    description="Authenticate a user and return a JWT access token.",
)
def login(
    data: LoginRequest,
    db: Session = Depends(get_db),
):
    token = AuthService.login(
        db=db,
        email=data.email,
        password=data.password,
    )

    if token is None:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid email or password.",
        )

    return TokenResponse(
        access_token=token,
        token_type="bearer",
    )


@router.get(
    "/me",
    response_model=UserResponse,
    summary="Get current user",
    description="Returns the authenticated user's profile.",
)
def me(current_user=Depends(get_current_user)):
    return current_user