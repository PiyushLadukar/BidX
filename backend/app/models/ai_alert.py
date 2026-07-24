from sqlalchemy import Column, Integer, String, DateTime
from sqlalchemy.sql import func

from app.database.base import Base


class AIAlert(Base):
    __tablename__ = "ai_alerts"

    id = Column(Integer, primary_key=True, index=True)
    auction_id = Column(Integer, nullable=False)
    alert_type = Column(String, nullable=False)
    severity = Column(String, default="medium")
    message = Column(String, nullable=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
