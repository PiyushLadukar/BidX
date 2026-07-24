from contextlib import asynccontextmanager
from fastapi import FastAPI

from app.core.config import settings
from app.database.database import Base, engine

from app.routers.auth import router as auth_router
from app.routers.auction import router as auction_router
from app.routers.bid import router as bid_router

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

app.include_router(auth_router)
app.include_router(auction_router)
app.include_router(bid_router)