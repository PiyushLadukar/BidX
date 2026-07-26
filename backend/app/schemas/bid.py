from datetime import datetime
from pydantic import BaseModel, field_serializer


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
    vendor_name: str | None = None
    company_name: str | None = None

    class Config:
        from_attributes = True

    @field_serializer('vendor_name', 'company_name', mode='before')
    def serialize_vendor_info(self, value):
        # These will be populated by the service before schema conversion
        return value