from sqlalchemy.orm import Session

from app.models.user import User
from app.models.tenant import Tenant
from app.schemas.auth import RegisterRequest
from app.core.security import (
    hash_password,
    verify_password,
    create_access_token,
)


class AuthService:

    @staticmethod
    def register(db: Session, data: RegisterRequest):

        tenant = Tenant(
            name=data.tenant_name,
            organization_type=data.role,
        )

        db.add(tenant)
        db.flush()

        user = User(
            tenant_id=tenant.id,
            full_name=data.full_name,
            email=data.email,
            password_hash=hash_password(data.password),
            role=data.role,
            company_name=data.company_name,
        )

        db.add(user)
        db.commit()
        db.refresh(user)

        return user

    @staticmethod
    def login(db: Session, email: str, password: str):

        user = db.query(User).filter(
            User.email == email
        ).first()

        if not user:
            return None

        if not verify_password(
            password,
            user.password_hash,
        ):
            return None

        token = create_access_token(
            {
                "sub": str(user.id),
                "email": user.email,
                "role": user.role,
            }
        )

        return token