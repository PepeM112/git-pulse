import logging
import sys
from typing import Any, Dict, Union

import socketio
from fastapi import Depends, FastAPI, Header, status
from fastapi.middleware.cors import CORSMiddleware
from uvicorn.logging import DefaultFormatter

from app.config import settings
from app.schemas import GithubPushEvent, PulseEvent
from app.security import verify_github_signature

# --- LOGGING CONFIGURATION ---
formatter = DefaultFormatter(fmt="%(levelprefix)-10s %(message)s", use_colors=True)
console_handler = logging.StreamHandler(sys.stdout)
console_handler.setFormatter(formatter)

logger = logging.getLogger("pulse-backend")
logger.handlers = [console_handler]
logger.setLevel(logging.INFO)
logger.propagate = False

# --- SOCKET.IO CONFIGURATION ---
sio = socketio.AsyncServer(async_mode="asgi", cors_allowed_origins=["http://localhost:5173"])
sio_app = socketio.ASGIApp(sio)

app = FastAPI(title="Git-Pulse API", version="1.0.0")

# --- MIDDLEWARE ---
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.mount("/socket.io", sio_app)


@sio.on("connect") # type: ignore - We know its initialized as an AsyncServer
async def handle_connect(sid: str, _: Dict[str, Any]) -> None:
    logger.info(f"Client connected: {sid}")


@sio.on("disconnect") # type: ignore - We know its initialized as an AsyncServer
async def handle_disconnect(sid: str) -> None:
    logger.info(f"Client disconnected: {sid}")


@app.post(
    "/api/webhook",
    status_code=status.HTTP_202_ACCEPTED,
    dependencies=[Depends(verify_github_signature)],
    response_model=PulseEvent,
)
async def github_webhook(
    event: GithubPushEvent, x_github_event: str = Header(None)
) -> Union[PulseEvent, dict[str, str]]:
    if x_github_event != "push":
        logger.info(f"Ignoring {x_github_event} event")
        return {"message": f"Ignored {x_github_event} event"}

    if not event.commits:
        latest_message = "Branch/Tag activity"
        latest_timestamp = "N/A"
        latest_url = str(event.repository.html_url)
    else:
        latest_commit = event.commits[0]
        latest_message = latest_commit.message
        latest_timestamp = latest_commit.timestamp
        latest_url = str(latest_commit.url)

    pulse_data = PulseEvent(
        user=event.sender.login,
        avatar=str(event.sender.avatar_url) if event.sender.avatar_url else None,
        repo=event.repository.full_name,
        message=latest_message,
        timestamp=latest_timestamp,
        url=latest_url,
    )

    await sio.emit("new_pulse", pulse_data.model_dump())

    logger.info(f"Pulse Event created: {pulse_data.user} pushed to {pulse_data.repo}")

    return pulse_data


@app.get("/health")
def health_check() -> dict[str, str]:
    return {"status": "ok", "env": settings.app_env}
