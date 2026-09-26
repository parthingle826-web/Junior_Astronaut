"""
ASTRA AI Flight Director Routes
Handles context-aware mission control queries and student space science queries.
"""

from fastapi import APIRouter
from pydantic import BaseModel
from typing import Dict, Any, Optional
from ..services.ai_service import AIService

router = APIRouter(prefix="/api/ai", tags=["ASTRA AI"])

class AIChatRequest(BaseModel):
    message: str
    mode: str = "context" # 'context' or 'assistant'
    missionState: Optional[Dict[str, Any]] = None
    activeEmergency: Optional[Dict[str, Any]] = None
    astronaut: Optional[Dict[str, Any]] = None

@router.post("/astra")
async def chat_with_astra(req: AIChatRequest):
    response = await AIService.chat(
        message=req.message,
        mode=req.mode,
        mission_state=req.missionState,
        active_emergency=req.activeEmergency,
        astronaut_profile=req.astronaut
    )
    return response
