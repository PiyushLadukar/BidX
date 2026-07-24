from collections import defaultdict
from fastapi import WebSocket
from typing import Dict, List


class ConnectionManager:

    def __init__(self):
        self.active_connections: Dict[int, List[WebSocket]] = defaultdict(list)

    async def connect(self, auction_id: int, websocket: WebSocket):
        await websocket.accept()
        self.active_connections[auction_id].append(websocket)
        print(f"✅ Client connected to auction {auction_id}")
        print(f"Active connections: {len(self.active_connections[auction_id])}")

    def disconnect(self, auction_id: int, websocket: WebSocket):
        if websocket in self.active_connections[auction_id]:
            self.active_connections[auction_id].remove(websocket)

        if len(self.active_connections[auction_id]) == 0:
            del self.active_connections[auction_id]

        print(f"❌ Client disconnected from auction {auction_id}")

    async def broadcast(self, auction_id: int, data: dict):
        print(f"📢 Broadcast called for auction {auction_id}")

        if auction_id not in self.active_connections:
            print("❌ No active WebSocket connections")
            return

        print(f"👥 Connected clients: {len(self.active_connections[auction_id])}")

        dead_connections = []

        for connection in self.active_connections[auction_id]:
            try:
                print("➡️ Sending message:", data)
                await connection.send_json(data)
                print("✅ Message sent")
            except Exception as e:
                print("❌ Send failed:", e)
                dead_connections.append(connection)

        for connection in dead_connections:
            self.disconnect(auction_id, connection)


manager = ConnectionManager()