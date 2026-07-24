from pydantic import BaseModel


class AuctionCreate(BaseModel):
    title: str
    description: str | None = None
    starting_price: float


class AuctionRead(AuctionCreate):
    id: int
    current_price: float
    status: str
