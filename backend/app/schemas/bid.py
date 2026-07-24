from datetime import datetime
from pydantic import BaseModel


class BidCreate(BaseModel):
    auction_id: int
    bid_amount: float


class BidUpdate(BaseModel):
    bid_amount: float


class BidResponse(BaseModel):
    id: int
    auction_id: int
    vendor_id: int
    bid_amount: float
    created_at: datetime

    class Config:
        from_attributes = True