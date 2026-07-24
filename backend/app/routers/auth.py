from fastapi import APIRouter

router = APIRouter(prefix="/auth", tags=["auth"])


@router.post("/login")
def login() -> dict[str, str]:
    return {"message": "Auth endpoint placeholder"}
