from fastapi import APIRouter

router = APIRouter(prefix="/auctions", tags=["auctions"])


@router.get("")
def list_auctions() -> list[dict[str, str]]:
    return [{"message": "Auction endpoint placeholder"}]
