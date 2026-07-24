from pydantic import BaseModel


class BidCreate(BaseModel):
    auction_id: int
    amount: float


class BidRead(BidCreate):
    id: int
    user_id: int
