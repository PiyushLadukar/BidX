from sqlalchemy import Column, Integer, String, Text, ForeignKey, DateTime
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func

from app.database.database import Base


class AIAlert(Base):
    __tablename__ = "ai_alerts"

    id = Column(Integer, primary_key=True, index=True)

    auction_id = Column(Integer, ForeignKey("auctions.id"), nullable=False)

    alert_type = Column(String(100), nullable=False)

    severity = Column(String(20), nullable=False)  # LOW, MEDIUM, HIGH

    description = Column(Text, nullable=False)

    created_at = Column(DateTime(timezone=True), server_default=func.now())

    auction = relationship("Auction", back_populates="ai_alerts")