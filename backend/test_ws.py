import asyncio
import websockets

async def main():
    uri = "ws://127.0.0.1:8000/ws/1"  # Change 1 to your auction ID

    async with websockets.connect(uri) as websocket:
        print("✅ Connected")

        while True:
            message = await websocket.recv()
            print("Received:", message)

asyncio.run(main())