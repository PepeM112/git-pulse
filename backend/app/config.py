from pydantic import Field
from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    github_webhook_secret: str = Field(...)
    app_env: str = "development"

    model_config = SettingsConfigDict(env_file=".env")


settings = Settings()  # type: ignore - Pydantic's BaseSettings does not have a default constructor, but we know it will work with the provided env file.
