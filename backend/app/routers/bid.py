from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database.database import get_db
from app.schemas.bid import BidCreate
from app.services.bid_service import BidService

router = APIRouter(
    prefix="/bids",
    tags=["Bids"],
)


@router.post("/")
def place_bid(
    data: BidCreate,
    db: Session = Depends(get_db),
):
    # Temporary vendor_id until JWT is integrated
    bid, error = BidService.create(
        db,
        data.auction_id,
        vendor_id=1,
        amount=data.bid_amount,
    )

    if error:
        raise HTTPException(
            status_code=400,
            detail=error,
        )

    return bid


@router.get("/{auction_id}")
def get_bids(
    auction_id: int,
    db: Session = Depends(get_db),
):
    return BidService.get_bids(
        db,
        auction_id,
    )