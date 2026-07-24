from sqlalchemy import Column, Integer, Float, ForeignKey, DateTime
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func

from app.database.database import Base


class Bid(Base):
    __tablename__ = "bids"

    id = Column(Integer, primary_key=True, index=True)

    auction_id = Column(Integer, ForeignKey("auctions.id"), nullable=False)

    vendor_id = Column(Integer, ForeignKey("users.id"), nullable=False)

    bid_amount = Column(Float, nullable=False)

    created_at = Column(DateTime(timezone=True), server_default=func.now())

    auction = relationship("Auction", back_populates="bids")

    vendor = relationship("User", back_populates="bids")