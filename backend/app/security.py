import hashlib
import hmac

from fastapi import Header, HTTPException, Request

from app.config import settings


async def verify_github_signature(request: Request, x_hub_signature_256: str = Header(None)) -> bool:
    if not x_hub_signature_256:
        raise HTTPException(status_code=400, detail="Missing X-Hub-Signature-256 header")

    body = await request.body()

    expected_signature = hmac.new(
        settings.github_webhook_secret.encode(), msg=body, digestmod=hashlib.sha256
    ).hexdigest()

    actual_signature = x_hub_signature_256.replace("sha256=", "")

    if not hmac.compare_digest(expected_signature, actual_signature):
        raise HTTPException(status_code=401, detail="Invalid webhook signature")

    return True
