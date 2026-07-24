import os


class Settings:
    PROJECT_NAME: str = "BidX"
    API_V1_PREFIX: str = "/api/v1"
    DEBUG: bool = os.getenv("DEBUG", "false").lower() == "true"
    SECRET_KEY: str = os.getenv("SECRET_KEY", "change-me")


settings = Settings()
