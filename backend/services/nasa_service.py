"""
NASA API Integration Service
Queries maintained NASA endpoints (APOD, EPIC, DONKI, NEO, Image & Video Library).
Ensures safe server-side execution, rate-limit resilience, and honest fallback reporting.
"""

import os
import httpx
import logging
from typing import Dict, Any, List
from dotenv import load_dotenv

from ..data.fallback_data import (
    FALLBACK_APOD,
    FALLBACK_EARTH_EPIC,
    FALLBACK_MOON_DATA,
    FALLBACK_SPACE_WEATHER,
    FALLBACK_NEO_DATA,
    FALLBACK_MARS_SCIENCE
)

load_dotenv()
logger = logging.getLogger(__name__)

NASA_API_KEY = os.getenv("NASA_API_KEY", "DEMO_KEY")
TIMEOUT = 7.0

class NasaService:
    @staticmethod
    async def get_apod() -> Dict[str, Any]:
        """Fetch Astronomy Picture of the Day from NASA API."""
        api_key = os.getenv("NASA_API_KEY", "DEMO_KEY")
        url = f"https://api.nasa.gov/planetary/apod?api_key={api_key}"
        try:
            async with httpx.AsyncClient(timeout=TIMEOUT) as client:
                res = await client.get(url)
                if res.status_code == 200:
                    data = res.json()
                    data["is_fallback"] = False
                    data["source"] = f"NASA Astronomy Picture of the Day (Live API)"
                    data["scientific_context"] = "Daily featured imagery selected by NASA astrophysicists documenting cosmic phenomena."
                    return data
                else:
                    logger.warning(f"NASA APOD API returned status {res.status_code}, serving verified fallback.")
        except Exception as e:
            logger.warning(f"NASA APOD fetch failed ({str(e)}), serving verified fallback.")
        
        return FALLBACK_APOD

    @staticmethod
    async def get_earth_epic() -> List[Dict[str, Any]]:
        """Fetch Earth Polychromatic Imaging Camera (EPIC) images from DSCOVR."""
        api_key = os.getenv("NASA_API_KEY", "DEMO_KEY")
        url = f"https://api.nasa.gov/EPIC/api/natural?api_key={api_key}"
        try:
            async with httpx.AsyncClient(timeout=TIMEOUT) as client:
                res = await client.get(url)
                if res.status_code == 200:
                    items = res.json()
                    if items and isinstance(items, list):
                        formatted = []
                        for item in items[:5]:
                            date_str = item.get("date", "").split(" ")[0].replace("-", "/")
                            img_name = item.get("image")
                            img_url = f"https://epic.gsfc.nasa.gov/archive/natural/{date_str}/png/{img_name}.png"
                            formatted.append({
                                "identifier": item.get("identifier"),
                                "caption": item.get("caption", "Full-disc Earth observed by DSCOVR/EPIC"),
                                "date": item.get("date"),
                                "image_url": img_url,
                                "source": "NASA DSCOVR / EPIC Live Telemetry",
                                "coordinates": item.get("centroid_coordinates", {}),
                                "is_fallback": False,
                                "scientific_context": "Direct radiometric observations from Lagrange Point 1 measuring planetary cloud cover and atmospheric ozone."
                            })
                        if formatted:
                            return formatted
        except Exception as e:
            logger.warning(f"NASA EPIC fetch failed ({str(e)}), serving verified fallback.")
        
        return FALLBACK_EARTH_EPIC

    @staticmethod
    async def get_moon_data() -> List[Dict[str, Any]]:
        """Fetch Moon exploration images and data from NASA Image and Video Library."""
        url = "https://images-api.nasa.gov/search?q=moon+crater+artemis&media_type=image"
        try:
            async with httpx.AsyncClient(timeout=TIMEOUT) as client:
                res = await client.get(url)
                if res.status_code == 200:
                    data = res.json()
                    collection = data.get("collection", {}).get("items", [])
                    results = []
                    for item in collection[:4]:
                        meta = item.get("data", [{}])[0]
                        links = item.get("links", [{}])
                        img_url = links[0].get("href") if links else None
                        if img_url:
                            results.append({
                                "id": meta.get("nasa_id"),
                                "title": meta.get("title", "Lunar Geological Feature"),
                                "date": meta.get("date_created", "2023-01-01")[:10],
                                "description": meta.get("description", "High-resolution lunar surface feature captured for lunar mission planning."),
                                "image_url": img_url,
                                "source": f"NASA Image & Video Library ({meta.get('secondary_creator', 'NASA/LRO/JSC')})",
                                "is_fallback": False,
                                "scientific_context": "Surface mapping and crater morphological assessment for landing site verification."
                            })
                    if results:
                        return results
        except Exception as e:
            logger.warning(f"NASA Image library fetch failed ({str(e)}), serving verified fallback.")

        return FALLBACK_MOON_DATA

    @staticmethod
    async def get_space_weather() -> List[Dict[str, Any]]:
        """Fetch real-time Solar Flares & CMEs from NASA DONKI."""
        api_key = os.getenv("NASA_API_KEY", "DEMO_KEY")
        url = f"https://api.nasa.gov/DONKI/FLR?api_key={api_key}"
        try:
            async with httpx.AsyncClient(timeout=TIMEOUT) as client:
                res = await client.get(url)
                if res.status_code == 200:
                    items = res.json()
                    if isinstance(items, list) and items:
                        formatted = []
                        for item in items[:4]:
                            formatted.append({
                                "flrID": item.get("flrID"),
                                "classType": item.get("classType", "Unknown"),
                                "sourceLocation": item.get("sourceLocation", "Solar Disk"),
                                "beginTime": item.get("beginTime"),
                                "peakTime": item.get("peakTime"),
                                "endTime": item.get("endTime"),
                                "source": "NASA DONKI Real-Time Space Weather System",
                                "is_fallback": False,
                                "scientific_context": "Real-time solar flare detection from NASA Solar Dynamics Observatory (SDO) and NOAA GOES satellites."
                            })
                        return formatted
        except Exception as e:
            logger.warning(f"NASA DONKI fetch failed ({str(e)}), serving verified fallback.")

        return FALLBACK_SPACE_WEATHER

    @staticmethod
    async def get_neo_data() -> List[Dict[str, Any]]:
        """Fetch Near-Earth Objects from NASA NeoWS."""
        api_key = os.getenv("NASA_API_KEY", "DEMO_KEY")
        url = f"https://api.nasa.gov/neo/rest/v1/feed/today?detailed=false&api_key={api_key}"
        try:
            async with httpx.AsyncClient(timeout=TIMEOUT) as client:
                res = await client.get(url)
                if res.status_code == 200:
                    data = res.json()
                    near_earth = data.get("near_earth_objects", {})
                    all_neos = []
                    for day, neos in near_earth.items():
                        for neo in neos:
                            cad = neo.get("close_approach_data", [{}])[0]
                            all_neos.append({
                                "id": neo.get("id"),
                                "name": neo.get("name"),
                                "estimated_diameter_meters": {
                                    "min": round(neo.get("estimated_diameter", {}).get("meters", {}).get("estimated_diameter_min", 50), 1),
                                    "max": round(neo.get("estimated_diameter", {}).get("meters", {}).get("estimated_diameter_max", 120), 1)
                                },
                                "is_potentially_hazardous_asteroid": neo.get("is_potentially_hazardous_asteroid", False),
                                "close_approach_date": cad.get("close_approach_date"),
                                "relative_velocity_km_per_s": round(float(cad.get("relative_velocity", {}).get("kilometers_per_second", 0)), 2),
                                "miss_distance_km": round(float(cad.get("miss_distance", {}).get("kilometers", 0)), 0),
                                "source": "NASA Center for Near Earth Object Studies (CNEOS) Live Feed",
                                "is_fallback": False,
                                "scientific_context": "Orbital tracking of celestial bodies approaching within 1.3 astronomical units of the Sun."
                            })
                    if all_neos:
                        return all_neos[:5]
        except Exception as e:
            logger.warning(f"NASA NEO fetch failed ({str(e)}), serving verified fallback.")

        return FALLBACK_NEO_DATA

    @staticmethod
    async def get_mars_science() -> List[Dict[str, Any]]:
        """Return Perseverance/Curiosity rover verified science archive data."""
        return FALLBACK_MARS_SCIENCE
