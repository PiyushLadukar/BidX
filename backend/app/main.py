from contextlib import asynccontextmanager
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.core.config import settings
from app.database.database import Base, engine

from app.routers.auth import router as auth_router
from app.routers.auction import router as auction_router
from app.routers.bid import router as bid_router

from app.routers.ai_alert import router as ai_router
from app.routers.websocket import router as websocket_router
from app.models import *


@asynccontextmanager
async def lifespan(app: FastAPI):
    Base.metadata.create_all(bind=engine)
    print("✅ Database tables created successfully!")
    yield


app = FastAPI(
    title=settings.PROJECT_NAME,
    version="1.0.0",
    lifespan=lifespan,
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173",
        "https://bidx-e0wt.onrender.com",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def root():
    return {
        "message": "Welcome to BidX API",
        "status": "running",
    }


@app.get("/health")
def health():
    return {
        "status": "healthy",
    }

@app.get("/debug")
def debug():
    return {
        "app": "BidX",
        "cors_version": "2026-07-25-v2",
        "cors_origins": [
            "http://localhost:5173",
            "http://127.0.0.1:5173",
        ],
    }


app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)
app.include_router(auth_router)
app.include_router(auction_router)
app.include_router(bid_router)
app.include_router(ai_router)
app.include_router(websocket_router)