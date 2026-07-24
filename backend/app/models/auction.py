from sqlalchemy import Column, Integer, String, Text, DateTime, ForeignKey, Float
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func

from app.database.database import Base


class Auction(Base):
    __tablename__ = "auctions"

    id = Column(Integer, primary_key=True, index=True)

    tenant_id = Column(
        Integer,
        ForeignKey("tenants.id"),
        nullable=False
    )

    title = Column(
        String(255),
        nullable=False
    )

    description = Column(
        Text,
        nullable=True
    )

    category = Column(
        String(100),
        nullable=False
    )

    quantity = Column(
        Integer,
        nullable=False
    )

    starting_price = Column(
        Float,
        nullable=False
    )

    current_lowest_bid = Column(
        Float,
        nullable=True
    )

    # active | closed | cancelled
    status = Column(
        String(20),
        default="active",
        nullable=False
    )

    start_time = Column(
        DateTime(timezone=True),
        nullable=False
    )

    end_time = Column(
        DateTime(timezone=True),
        nullable=False
    )

    created_at = Column(
        DateTime(timezone=True),
        server_default=func.now()
    )

    closed_at = Column(
        DateTime(timezone=True),
        nullable=True
    )

    winner_vendor_id = Column(
        Integer,
        ForeignKey("users.id"),
        nullable=True
    )

    winning_bid = Column(
        Float,
        nullable=True
    )

    tenant = relationship(
        "Tenant",
        back_populates="auctions"
    )

    bids = relationship(
        "Bid",
        back_populates="auction",
        cascade="all, delete-orphan"
    )

    ai_alerts = relationship(
        "AIAlert",
        back_populates="auction",
        cascade="all, delete-orphan"
    )

    winner = relationship(
        "User",
        foreign_keys=[winner_vendor_id]
    )