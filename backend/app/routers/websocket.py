from fastapi import APIRouter, WebSocket, WebSocketDisconnect

from app.core.websocket_manager import manager

router = APIRouter(tags=["WebSocket"])


@router.websocket("/ws/{auction_id}")
async def websocket_endpoint(
    websocket: WebSocket,
    auction_id: int,
):

    await manager.connect(auction_id, websocket)

    try:
        while True:
            await websocket.receive_text()

    except WebSocketDisconnect:
        manager.disconnect(auction_id, websocket)

    except Exception:
        manager.disconnect(auction_id, websocket)