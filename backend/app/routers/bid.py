from fastapi import APIRouter

router = APIRouter(prefix="/bids", tags=["bids"])


@router.get("")
def list_bids() -> list[dict[str, str]]:
    return [{"message": "Bid endpoint placeholder"}]
