import asyncio

from sqlalchemy.orm import Session

from app.core.websocket_manager import manager
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

        # -------------------------
        # Update Existing Bid
        # -------------------------
        if existing_bid:

            existing_bid.bid_amount = amount
            auction.current_lowest_bid = amount

            db.commit()
            db.refresh(existing_bid)

            AIService.analyze_bid(
                db=db,
                auction=auction,
                bid=existing_bid,
            )

            try:
                asyncio.create_task(
                    manager.broadcast(
                        auction.id,
                        {
                            "event": "new_bid",
                            "auction_id": auction.id,
                            "vendor_id": vendor_id,
                            "lowest_bid": amount,
                        },
                    )
                )
            except RuntimeError:
                pass

            return existing_bid, None

        # -------------------------
        # Create New Bid
        # -------------------------
        bid = Bid(
            auction_id=auction_id,
            vendor_id=vendor_id,
            bid_amount=amount,
        )

        db.add(bid)

        auction.current_lowest_bid = amount

        db.commit()
        db.refresh(bid)

        AIService.analyze_bid(
            db=db,
            auction=auction,
            bid=bid,
        )

        try:
            asyncio.create_task(
                manager.broadcast(
                    auction.id,
                    {
                        "event": "new_bid",
                        "auction_id": auction.id,
                        "vendor_id": vendor_id,
                        "lowest_bid": amount,
                    },
                )
            )
        except RuntimeError:
            pass

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