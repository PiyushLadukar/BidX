from datetime import datetime, timezone

from sqlalchemy.orm import Session

from app.models.ai_alert import AIAlert
from app.models.auction import Auction
from app.models.bid import Bid


class AIService:

    @staticmethod
    def analyze_bid(
        db: Session,
        auction: Auction,
        bid: Bid,
    ):

        alerts = []

        # Rule 1: Very Low Bid
        if bid.bid_amount < auction.starting_price * 0.70:

            alerts.append(
                AIAlert(
                    auction_id=auction.id,
                    alert_type="LOW_BID",
                    severity="HIGH",
                    description="Bid is more than 30% below the starting price.",
                )
            )

        # Rule 2: Last Minute Bid
        remaining = (
            auction.end_time -
            datetime.now(timezone.utc)
        ).total_seconds()

        if remaining <= 300:

            alerts.append(
                AIAlert(
                    auction_id=auction.id,
                    alert_type="LAST_MINUTE_BID",
                    severity="MEDIUM",
                    description="Vendor placed a bid within the last 5 minutes.",
                )
            )

        for alert in alerts:
            db.add(alert)

        db.commit()

        return alerts