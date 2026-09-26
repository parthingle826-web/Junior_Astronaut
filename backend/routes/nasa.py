"""
NASA API Routes
Exposes server-side cached NASA endpoints with live and fallback handling.
"""

from fastapi import APIRouter
from ..services.nasa_service import NasaService

router = APIRouter(prefix="/api/nasa", tags=["NASA Data"])

@router.get("/apod")
async def get_apod():
    return await NasaService.get_apod()

@router.get("/earth")
async def get_earth():
    return await NasaService.get_earth_epic()

@router.get("/moon")
async def get_moon():
    return await NasaService.get_moon_data()

@router.get("/space-weather")
async def get_space_weather():
    return await NasaService.get_space_weather()

@router.get("/neo")
async def get_neo():
    return await NasaService.get_neo_data()

@router.get("/mars")
async def get_mars():
    return await NasaService.get_mars_science()
