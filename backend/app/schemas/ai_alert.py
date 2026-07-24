from pydantic import BaseModel


class AIAlertRead(BaseModel):
    id: int
    auction_id: int
    alert_type: str
    severity: str
    message: str
