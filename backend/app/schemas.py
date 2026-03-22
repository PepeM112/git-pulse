from pydantic import BaseModel, Field, HttpUrl
from typing import List, Optional


# --- GITHUB INGESTION MODELS ---
class GithubUser(BaseModel):
    login: str
    avatar_url: Optional[HttpUrl] = None


class GithubRepository(BaseModel):
    name: str
    full_name: str
    html_url: HttpUrl


class GithubCommit(BaseModel):
    id: str
    message: str
    timestamp: str
    url: HttpUrl


class GithubPushEvent(BaseModel):
    ref: str
    sender: GithubUser
    repository: GithubRepository
    commits: List[GithubCommit] = Field(default_factory=list)


# --- INTERNAL PULSE MODEL ---
class PulseEvent(BaseModel):
    user: str
    avatar: Optional[str]
    repo: str
    branch: str
    message: str
    timestamp: str
    url: str
