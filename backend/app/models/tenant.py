from sqlalchemy import Column, Integer, String
from sqlalchemy.orm import relationship

from app.database.database import Base


class Tenant(Base):
    __tablename__ = "tenants"

    id = Column(Integer, primary_key=True, index=True)

    name = Column(String(255), nullable=False)

    organization_type = Column(String(50), nullable=False)

    users = relationship("User", back_populates="tenant")

    auctions = relationship("Auction", back_populates="tenant")