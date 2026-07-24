from pydantic import BaseModel, EmailStr


class Token(BaseModel):
    access_token: str
    token_type: str = "bearer"


class LoginRequest(BaseModel):
    email: EmailStr
    password: str
from pydantic import BaseModel, EmailStr


class RegisterRequest(BaseModel):
    full_name: str
    email: EmailStr
    password: str
    role: str
    company_name: str | None = None
    tenant_name: str


class LoginRequest(BaseModel):
    email: EmailStr
    password: str


class TokenResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"


class UserResponse(BaseModel):
    id: int
    full_name: str
    email: EmailStr
    role: str
    company_name: str | None = None

    class Config:
        from_attributes = True