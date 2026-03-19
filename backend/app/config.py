from pydantic_settings import BaseSettings, SettingsConfigDict

class Settings(BaseSettings):
    # This will look for GITHUB_WEBHOOK_SECRET in your .env
    github_webhook_secret: str
    app_env: str = "development"

    model_config = SettingsConfigDict(env_file=".env")

settings = Settings()