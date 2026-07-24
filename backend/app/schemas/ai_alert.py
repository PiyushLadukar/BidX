from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database.database import get_db
from app.models.ai_alert import AIAlert

router = APIRouter(
    prefix="/ai-alerts",
    tags=["AI Alerts"],
)


@router.get("/")
def get_alerts(
    db: Session = Depends(get_db),
):

    return (
        db.query(AIAlert)
        .order_by(AIAlert.id.desc())
        .all()
    )