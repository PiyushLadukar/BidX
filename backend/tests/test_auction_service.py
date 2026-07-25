import os
from datetime import datetime, timezone

import pytest
from sqlalchemy import create_engine
from sqlalchemy.orm import Session

os.environ.setdefault("DATABASE_URL", "sqlite:///:memory:")
os.environ.setdefault("SECRET_KEY", "test-secret")

from app.database.database import Base
from app.models.auction import Auction
from app.models.bid import Bid
from app.models.user import User
from app.models.tenant import Tenant
from app.services.auction_service import AuctionService


@pytest.fixture()
def db_session():
    engine = create_engine("sqlite:///:memory:")
    Base.metadata.create_all(bind=engine)
    session = Session(bind=engine)
    try:
        yield session
    finally:
        session.close()


def test_close_sets_winner_and_closure_metadata(db_session):
    tenant = Tenant(name="Test Tenant", organization_type="hospital")
    db_session.add(tenant)
    db_session.flush()

    vendor = User(
        tenant_id=tenant.id,
        full_name="Vendor One",
        email="vendor@example.com",
        password_hash="hash",
        role="vendor",
        company_name="Vendor Co",
    )
    db_session.add(vendor)
    db_session.flush()

    auction = Auction(
        tenant_id=tenant.id,
        title="Test auction",
        description="Test",
        category="IT",
        quantity=1,
        starting_price=100.0,
        current_lowest_bid=45.0,
        status="active",
        start_time=datetime.now(timezone.utc),
        end_time=datetime.now(timezone.utc),
    )
    db_session.add(auction)
    db_session.flush()

    bid = Bid(auction_id=auction.id, vendor_id=vendor.id, bid_amount=45.0)
    db_session.add(bid)
    db_session.commit()
    db_session.refresh(auction)

    closed_auction = AuctionService.close(db_session, auction)

    assert closed_auction.status == "closed"
    assert closed_auction.closed_at is not None
    assert closed_auction.winner_vendor_id == vendor.id
    assert closed_auction.winning_bid == 45.0
