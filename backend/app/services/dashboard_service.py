from sqlalchemy import func
from sqlalchemy.orm import Session

from app.models.auction import Auction
from app.models.bid import Bid
from app.models.ai_alert import AIAlert


class DashboardService:

    @staticmethod
    def hospital_dashboard(db: Session, tenant_id: int):

        total_auctions = (
            db.query(Auction)
            .filter(Auction.tenant_id == tenant_id)
            .count()
        )

        active_auctions = (
            db.query(Auction)
            .filter(
                Auction.tenant_id == tenant_id,
                Auction.status == "active",
            )
            .count()
        )

        closed_auctions = (
            db.query(Auction)
            .filter(
                Auction.tenant_id == tenant_id,
                Auction.status == "closed",
            )
            .count()
        )

        total_bids = (
            db.query(Bid)
            .join(Auction)
            .filter(Auction.tenant_id == tenant_id)
            .count()
        )

        total_alerts = (
            db.query(AIAlert)
            .join(Auction)
            .filter(Auction.tenant_id == tenant_id)
            .count()
        )

        return {
            "total_auctions": total_auctions,
            "active_auctions": active_auctions,
            "closed_auctions": closed_auctions,
            "total_bids": total_bids,
            "ai_alerts": total_alerts,
        }

    @staticmethod
    def vendor_dashboard(db: Session, vendor_id: int):

        my_bids = (
            db.query(Bid)
            .filter(Bid.vendor_id == vendor_id)
            .count()
        )

        lowest_bid = (
            db.query(func.min(Bid.bid_amount))
            .filter(Bid.vendor_id == vendor_id)
            .scalar()
        )

        return {
            "my_bids": my_bids,
            "lowest_bid": lowest_bid,
        }