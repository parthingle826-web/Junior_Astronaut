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

@router.get("")
async def get_leaderboard():
    return DEMO_LEADERBOARD
