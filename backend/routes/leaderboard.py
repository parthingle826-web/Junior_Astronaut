"""
Cadet Flight Leaderboard
Provides student rankings, scores, and mission accomplishments.
"""

from fastapi import APIRouter
from typing import List, Dict, Any

router = APIRouter(prefix="/api/leaderboard", tags=["Leaderboard"])

DEMO_LEADERBOARD = [
    {
        "rank": 1,
        "name": "Commander Elena Vance",
        "id": "AST-1082",
        "score": 1420,
        "xp": 1850,
        "mission": "Artemis Lunar Research",
        "badgeCount": 5,
        "status": "Mission Specialist",
        "badgeIcons": ["🛡️", "🔬", "🚀", "🌙", "⚡"]
    },
    {
        "rank": 2,
        "name": "Cadet Marcus Chen",
        "id": "AST-3304",
        "score": 1280,
        "xp": 1600,
        "mission": "Artemis Lunar Research",
        "badgeCount": 4,
        "status": "Junior Astronaut",
        "badgeIcons": ["🔬", "🚀", "🌙", "⚡"]
    },
    {
        "rank": 3,
        "name": "Pilot Aisha Al-Mansoor",
        "id": "AST-4412",
        "score": 1190,
        "xp": 1450,
        "mission": "Artemis Lunar Research",
        "badgeCount": 4,
        "status": "Junior Astronaut",
        "badgeIcons": ["🛡️", "🚀", "🌙", "⚡"]
    },
    {
        "rank": 4,
        "name": "Flight Eng. Liam O'Connor",
        "id": "AST-2891",
        "score": 1050,
        "xp": 1300,
        "mission": "Artemis Lunar Research",
        "badgeCount": 3,
        "status": "Mission Cadet",
        "badgeIcons": ["🚀", "🌙", "⚡"]
    },
    {
        "rank": 5,
        "name": "Science Cadet Maya Lin",
        "id": "AST-5190",
        "score": 980,
        "xp": 1150,
        "mission": "Artemis Lunar Research",
        "badgeCount": 3,
        "status": "Mission Cadet",
        "badgeIcons": ["🔬", "🌙", "⚡"]
    }
]

from pydantic import BaseModel

class LeaderboardSubmission(BaseModel):
    name: str
    id: str = "AST-9999"
    score: int = 100
    xp: int = 150
    mission: str = "Artemis Lunar Research"
    status: str = "Junior Astronaut"
    badgeCount: int = 3
    badgeIcons: List[str] = ["🚀", "🌙", "⚡"]

@router.get("")
async def get_leaderboard():
    return DEMO_LEADERBOARD

@router.post("")
async def submit_score(entry: LeaderboardSubmission):
    new_entry = {
        "rank": len(DEMO_LEADERBOARD) + 1,
        "name": entry.name,
        "id": entry.id,
        "score": entry.score,
        "xp": entry.xp,
        "mission": entry.mission,
        "badgeCount": entry.badgeCount,
        "status": entry.status,
        "badgeIcons": entry.badgeIcons
    }
    DEMO_LEADERBOARD.append(new_entry)
    # Re-sort by score descending
    DEMO_LEADERBOARD.sort(key=lambda x: x["score"], reverse=True)
    for idx, item in enumerate(DEMO_LEADERBOARD):
        item["rank"] = idx + 1
    return {"status": "success", "leaderboard": DEMO_LEADERBOARD[:10]}
