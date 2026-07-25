from typing import List

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.core.dependencies import vendor_required
from app.database.database import get_db
from app.models.user import User
from app.schemas.bid import BidCreate, BidResponse
from app.services.bid_service import BidService

router = APIRouter(
    prefix="/bids",
    tags=["Bids"],
)


@router.post(
    "/",
    response_model=BidResponse,
    status_code=status.HTTP_201_CREATED,
    summary="Place a reverse bid",
    description="Allows a vendor to place or update a bid for an active auction.",
)
def place_bid(
    data: BidCreate,
    current_user: User = Depends(vendor_required),
    db: Session = Depends(get_db),
):
    """
    Create or update a vendor's bid for an auction.
    """

    bid, error = BidService.create(
        db=db,
        auction_id=data.auction_id,
        vendor_id=current_user.id,
        amount=data.bid_amount,
    )

    if error:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=error,
        )

    return bid


@router.get(
    "/{auction_id}",
    response_model=List[BidResponse],
    summary="Get all bids",
    description="Returns all bids submitted for a specific auction.",
)
def get_bids(
    auction_id: int,
    db: Session = Depends(get_db),
):
    """
    Retrieve all bids for an auction.
    """
    return BidService.get_bids(
        db=db,
        auction_id=auction_id,
    )


@router.get(
    "/{auction_id}/lowest",
    response_model=BidResponse,
    summary="Get lowest bid",
    description="Returns the current lowest bid for a specific auction.",
)
def lowest_bid(
    auction_id: int,
    db: Session = Depends(get_db),
):
    """
    Retrieve the current lowest bid for an auction.
    """

    bid = BidService.get_lowest_bid(
        db=db,
        auction_id=auction_id,
    )

    if not bid:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="No bids found for this auction.",
        )

    return bid