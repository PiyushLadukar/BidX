from sqlalchemy.orm import Session

from app.models.auction import Auction
from app.models.bid import Bid
from app.services.ai_service import AIService


class BidService:

    @staticmethod
    def create(
        db: Session,
        auction_id: int,
        vendor_id: int,
        amount: float,
    ):

        auction = (
            db.query(Auction)
            .filter(Auction.id == auction_id)
            .first()
        )

        if not auction:
            return None, "Auction not found"

        if auction.status.lower() != "active":
            return None, "Auction is closed"

        if (
            auction.current_lowest_bid is not None
            and amount >= auction.current_lowest_bid
        ):
            return None, "Bid must be lower than current lowest bid"

        existing_bid = (
            db.query(Bid)
            .filter(
                Bid.auction_id == auction_id,
                Bid.vendor_id == vendor_id,
            )
            .first()
        )

        if existing_bid:
            existing_bid.bid_amount = amount
            db.commit()
            db.refresh(existing_bid)

            auction.current_lowest_bid = amount
            db.commit()

            return existing_bid, None

        bid = Bid(
            auction_id=auction_id,
            vendor_id=vendor_id,
            bid_amount=amount,
        )

        db.add(bid)

        auction.current_lowest_bid = amount

        db.commit()
        db.refresh(bid)

        return bid, None

    @staticmethod
    def get_bids(
        db: Session,
        auction_id: int,
    ):

        return (
            db.query(Bid)
            .filter(Bid.auction_id == auction_id)
            .order_by(Bid.bid_amount.asc())
            .all()
        )

    @staticmethod
    def get_lowest_bid(
        db: Session,
        auction_id: int,
    ):

        return (
            db.query(Bid)
            .filter(Bid.auction_id == auction_id)
            .order_by(Bid.bid_amount.asc())
            .first()
        )


    