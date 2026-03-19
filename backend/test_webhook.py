import hashlib
import hmac
import json

import requests
from app.schemas import GithubPushEvent, PulseEvent

# 1. Configuration
SECRET = "gws_randomsecret123"
URL = "http://localhost:8000/api/webhook"

# 2. The Fake GitHub Payload (Matches our GithubPushEvent schema)
payload = {
    "sender": {"login": "jose-developer", "avatar_url": "https://github.com/identicons/jose.png"},
    "repository": {"full_name": "jose/git-pulse", "html_url": "https://github.com/jose/git-pulse"},
    "commits": [
        {
            "id": "commit123",
            "message": "Feat: Implement HMAC verification 🛡️",
            "timestamp": "2026-03-19T21:00:00Z",
            "url": "https://github.com/jose/git-pulse/commit/123",
        }
    ],
}

body = json.dumps(payload).encode()

# 3. Create the HMAC Signature (The "Wax Seal")
signature = hmac.new(SECRET.encode(), body, hashlib.sha256).hexdigest()

# 4. Send the Request
headers = {"X-GitHub-Event": "push", "X-Hub-Signature-256": f"sha256={signature}", "Content-Type": "application/json"}

print(f"Sending test webhook to {URL}...")
response = requests.post(URL, data=body, headers=headers)

print(f"Status Code: {response.status_code}")
print(f"Response Body: {json.dumps(response.json(), indent=2)}")
