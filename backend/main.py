"""
Junior Astronaut Mission Trainer - FastAPI Backend Server
NASA Space Apps Challenge MVP
"""

import os
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv

from .routes import nasa, missions, ai, leaderboard

# Load environment configuration
load_dotenv()

app = FastAPI(
    title="Junior Astronaut Mission Trainer API",
    description="Backend mission engine, NASA data proxy, and ASTRA AI assistant for NASA Space Apps Challenge.",
    version="1.0.0"
)

# Enable CORS for local Vite frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Mount functional API routers
app.include_router(missions.router)
app.include_router(nasa.router)
app.include_router(ai.router)
app.include_router(leaderboard.router)

@app.get("/api/health")
async def health_check():
    has_nasa_key = bool(os.getenv("NASA_API_KEY") and os.getenv("NASA_API_KEY") != "DEMO_KEY")
    has_gemini_key = bool(os.getenv("AI_API_KEY"))
    return {
        "status": "online",
        "service": "Junior Astronaut Mission Trainer API",
        "version": "1.0.0",
        "nasa_api_configured": has_nasa_key,
        "gemini_ai_configured": has_gemini_key,
        "active_mission": "Lunar Research"
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="127.0.0.1", port=8000, reload=True)
