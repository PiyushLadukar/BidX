from collections import defaultdict
from fastapi import WebSocket
from typing import Dict, List


class ConnectionManager:

    def __init__(self):
        self.active_connections: Dict[int, List[WebSocket]] = defaultdict(list)

    async def connect(self, auction_id: int, websocket: WebSocket):
        await websocket.accept()
        self.active_connections[auction_id].append(websocket)

    def disconnect(self, auction_id: int, websocket: WebSocket):
        if websocket in self.active_connections[auction_id]:
            self.active_connections[auction_id].remove(websocket)

        if len(self.active_connections[auction_id]) == 0:
            del self.active_connections[auction_id]

    async def broadcast(self, auction_id: int, data: dict):

        if auction_id not in self.active_connections:
            return

        dead_connections = []

        for connection in self.active_connections[auction_id]:
            try:
                await connection.send_json(data)
            except Exception:
                dead_connections.append(connection)

        for connection in dead_connections:
            self.disconnect(auction_id, connection)


manager = ConnectionManager()