from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database.database import get_db
from app.core.dependencies import (
    hospital_required,
    vendor_required,
)

from app.models.user import User
from app.services.dashboard_service import DashboardService

router = APIRouter(
    prefix="/dashboard",
    tags=["Dashboard"],
)


@router.get("/hospital")
def hospital_dashboard(
    current_user: User = Depends(hospital_required),
    db: Session = Depends(get_db),
):

    return DashboardService.hospital_dashboard(
        db,
        current_user.tenant_id,
    )


@router.get("/vendor")
def vendor_dashboard(
    current_user: User = Depends(vendor_required),
    db: Session = Depends(get_db),
):

    return DashboardService.vendor_dashboard(
        db,
        current_user.id,
    )