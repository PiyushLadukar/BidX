from datetime import datetime
from pydantic import BaseModel


class AuctionCreate(BaseModel):
    title: str
    description: str | None = None
    category: str
    quantity: int
    starting_price: float
    start_time: datetime
    end_time: datetime


class AuctionUpdate(BaseModel):
    title: str | None = None
    description: str | None = None
    category: str | None = None
    quantity: int | None = None
    starting_price: float | None = None
    end_time: datetime | None = None
    status: str | None = None


class AuctionResponse(BaseModel):
    id: int
    title: str
    description: str | None
    category: str
    quantity: int
    starting_price: float
    current_lowest_bid: float | None
    status: str

    class Config:
        from_attributes = True