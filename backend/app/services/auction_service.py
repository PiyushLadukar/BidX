from datetime import datetime, timezone

from sqlalchemy.orm import Session

from app.models.auction import Auction
from app.models.bid import Bid
from app.schemas.auction import AuctionCreate, AuctionUpdate


class AuctionService:

    @staticmethod
    def create(db: Session, tenant_id: int, data: AuctionCreate):

        auction = Auction(
            tenant_id=tenant_id,
            title=data.title,
            description=data.description,
            category=data.category,
            quantity=data.quantity,
            starting_price=data.starting_price,
            current_lowest_bid=data.starting_price,
            start_time=data.start_time,
            end_time=data.end_time,
        )

        db.add(auction)
        db.commit()
        db.refresh(auction)

        return auction

    @staticmethod
    def get_all(db: Session):

        return db.query(Auction).all()

    @staticmethod
    def get_by_id(db: Session, auction_id: int):

        return db.query(Auction).filter(
            Auction.id == auction_id
        ).first()

    @staticmethod
    def update(db: Session, auction: Auction, data: AuctionUpdate):

        update_data = data.model_dump(exclude_unset=True)

        for key, value in update_data.items():
            setattr(auction, key, value)

        db.commit()
        db.refresh(auction)

        return auction

    @staticmethod
    def delete(db: Session, auction: Auction):

        db.delete(auction)
        db.commit()

    @staticmethod
    def close(
        db: Session,
        auction: Auction,
    ):
        winning_bid = (
            db.query(Bid)
            .filter(Bid.auction_id == auction.id)
            .order_by(Bid.bid_amount.asc())
            .first()
        )

        auction.status = "closed"
        auction.closed_at = datetime.now(timezone.utc)

        if winning_bid is not None:
            auction.winner_vendor_id = winning_bid.vendor_id
            auction.winning_bid = winning_bid.bid_amount

        db.commit()
        db.refresh(auction)

        return auction