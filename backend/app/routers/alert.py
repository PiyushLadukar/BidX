from fastapi import APIRouter

router = APIRouter(prefix="/alerts", tags=["alerts"])


@router.get("")
def list_alerts() -> list[dict[str, str]]:
    return [{"message": "AI alert endpoint placeholder"}]
