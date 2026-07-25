from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.core.dependencies import get_current_user
from app.database.database import get_db
from app.schemas.auth import (
    LoginRequest,
    LoginResponse,
    RegisterRequest,
    RegisterResponse,
    UserResponse,
)
from app.services.auth_service import AuthService

router = APIRouter(
    prefix="/auth",
    tags=["Authentication"],
)


@router.post(
    "/register",
    response_model=RegisterResponse,
    status_code=status.HTTP_201_CREATED,
    summary="Register a new user",
    description="Creates a new hospital or vendor account.",
)
def register(
    data: RegisterRequest,
    db: Session = Depends(get_db),
):
    """
    Register a new user.
    """
    user = AuthService.register(db, data)

    return RegisterResponse(
        message="Registration successful",
        user_id=user.id,
    )


@router.post(
    "/login",
    response_model=LoginResponse,
    summary="Login",
    description="Authenticate a user and return a JWT access token.",
)
def login(
    data: LoginRequest,
    db: Session = Depends(get_db),
):
    """
    Authenticate user credentials.
    """

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

    return LoginResponse(
        access_token=token,
        token_type="bearer",
    )


@router.get(
    "/me",
    response_model=UserResponse,
    summary="Get current user",
    description="Returns the authenticated user's profile.",
)
def me(
    current_user=Depends(get_current_user),
):
    """
    Get details of the currently authenticated user.
    """

    return UserResponse(
        id=current_user.id,
        full_name=current_user.full_name,
        email=current_user.email,
        role=current_user.role,
        tenant_id=current_user.tenant_id,
        company_name=current_user.company_name,
    )