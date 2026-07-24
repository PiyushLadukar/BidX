from sqlalchemy import Column, Integer, String, Float, DateTime
from sqlalchemy.sql import func

from app.database.base import Base


class Auction(Base):
    __tablename__ = "auctions"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, nullable=False)
    description = Column(String, nullable=True)
    starting_price = Column(Float, nullable=False)
    current_price = Column(Float, nullable=False)
    status = Column(String, default="active")
    created_at = Column(DateTime(timezone=True), server_default=func.now())
