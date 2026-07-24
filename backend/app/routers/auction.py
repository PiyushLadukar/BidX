from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database.database import get_db
from app.schemas.auction import AuctionCreate, AuctionUpdate
from app.services.auction_service import AuctionService

router = APIRouter(
    prefix="/auctions",
    tags=["Auctions"],
)


@router.post("/")
def create_auction(
    data: AuctionCreate,
    db: Session = Depends(get_db),
):
    # Temporary tenant_id until JWT authentication is integrated
    auction = AuctionService.create(db, tenant_id=1, data=data)
    return auction


@router.get("/")
def get_all_auctions(
    db: Session = Depends(get_db),
):
    return AuctionService.get_all(db)


@router.get("/{auction_id}")
def get_auction(
    auction_id: int,
    db: Session = Depends(get_db),
):
    auction = AuctionService.get_by_id(db, auction_id)

    if not auction:
        raise HTTPException(
            status_code=404,
            detail="Auction not found",
        )

    return auction


@router.put("/{auction_id}")
def update_auction(
    auction_id: int,
    data: AuctionUpdate,
    db: Session = Depends(get_db),
):
    auction = AuctionService.get_by_id(db, auction_id)

    if not auction:
        raise HTTPException(
            status_code=404,
            detail="Auction not found",
        )

    return AuctionService.update(db, auction, data)


@router.delete("/{auction_id}")
def delete_auction(
    auction_id: int,
    db: Session = Depends(get_db),
):
    auction = AuctionService.get_by_id(db, auction_id)

    if not auction:
        raise HTTPException(
            status_code=404,
            detail="Auction not found",
        )

    AuctionService.delete(db, auction)

    return {
        "message": "Auction deleted successfully"
    }