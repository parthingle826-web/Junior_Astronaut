"""
ASTRA AI Mission Control Assistant Service
Powered by Google Gemini via secure server-side API integration.
Features dual modes:
 1. Context-Aware Mission Control (ingests live telemetry, active emergency, systems health)
 2. Student Space Science Assistant (answers planetary science, orbital mechanics, astronaut life)
Includes an intelligent static knowledge base fallback so the app NEVER crashes or hangs.
"""

import os
import httpx
import logging
from typing import Dict, Any, Optional
from dotenv import load_dotenv

load_dotenv()
logger = logging.getLogger(__name__)

GEMINI_API_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent"
FALLBACK_MODEL_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent"

class AIService:
    @staticmethod
    def _generate_rule_based_fallback(
        message: str,
        mode: str,
        mission_state: Optional[Dict[str, Any]] = None,
        active_emergency: Optional[Dict[str, Any]] = None
    ) -> Dict[str, Any]:
        """Provides high-quality, telemetry-aware responses when Gemini API is unavailable."""
        msg_lower = message.lower()
        
        # Mid-emergency context handling
        if active_emergency:
            em_id = active_emergency.get("id")
            if em_id == "solar-radiation":
                return {
                    "reply": "⚠️ ASTRA MISSION ADVISORY: Radiation sensors detect coronal mass ejection (CME) shockwave. Directing crew to maneuver craft such that the propulsion service module shields the cabin. Gather in the central water-wall corridor immediately. Do NOT initiate an EVA spacewalk under any circumstances.",
                    "mode": mode,
                    "provider": "astra-offline-kb",
                    "telemetry_alert": "HIGH RADIATION ENVIRONMENT"
                }
            elif em_id == "comm-failure":
                return {
                    "reply": "⚠️ ASTRA MISSION ADVISORY: High-Gain Antenna azimuth servo is locked. Immediate corrective action: switch communications protocol to Omnidirectional S-Band transceivers. DSN Madrid will acquire our telemetry carrier beacon.",
                    "mode": mode,
                    "provider": "astra-offline-kb",
                    "telemetry_alert": "CARRIER LOSS MITIGATION"
                }
            elif em_id == "oxygen-leak":
                return {
                    "reply": "🚨 ASTRA CRITICAL WARNING: Differential cabin pressure decay detected at -0.35 kPa/min. Don your helmet visors now! Lock crossfeed valve 4B to isolate secondary manifold rupture. Tap emergency O2 reserve to restabilize pressure at 101.3 kPa.",
                    "mode": mode,
                    "provider": "astra-offline-kb",
                    "telemetry_alert": "ECLSS PRESSURE DROP"
                }
            elif em_id == "thermal-spike":
                return {
                    "reply": "⚠️ ASTRA THERMAL ADVISORY: Heat exchanger loop saturated. Initiate Passive Thermal Control (PTC 'barbecue roll') at 3 revolutions per hour immediately to redistribute solar radiation across the hull.",
                    "mode": mode,
                    "provider": "astra-offline-kb",
                    "telemetry_alert": "THERMAL LOOP EXCURSION"
                }

        # Mission state context handling
        if mission_state:
            phase = mission_state.get("currentPhase", "space_travel")
            health = mission_state.get("missionHealth", 100)
            risk = mission_state.get("missionRisk", "LOW")

            if "status" in msg_lower or "report" in msg_lower or "telemetry" in msg_lower:
                return {
                    "reply": f"ASTRA TELEMETRY BRIEFING: Phase: {phase.upper().replace('_', ' ')} | Composite Health: {health}% | Mission Risk: {risk} | Cabin Pressure: {mission_state.get('pressure', 101.3)} kPa | Oxygen Reserves: {mission_state.get('oxygen', 100)}% | Primary Power: {mission_state.get('power', 100)}%. All onboard systems operating within nominal flight margins.",
                    "mode": mode,
                    "provider": "astra-offline-kb"
                }

        # General student space science knowledge base
        if "moon" in msg_lower or "lunar" in msg_lower:
            return {
                "reply": "The Moon has no substantial atmosphere and possesses approximately 1/6th of Earth's gravity (1.62 m/s²). Day/night cycles last approximately 29.5 Earth days, causing surface temperatures to swing from +120°C in sunlight to -130°C in shadow. Permanently shadowed craters at the lunar South Pole harbor ancient water ice crucial for NASA's Artemis program.",
                "mode": mode,
                "provider": "astra-offline-kb"
            }
        elif "gravity" in msg_lower or "weight" in msg_lower:
            return {
                "reply": "In orbit, astronauts experience 'microgravity' — not because there is no gravity, but because the spacecraft is in perpetual free-fall around the Earth or Moon at orbital speeds (about 28,000 km/h in Low Earth Orbit).",
                "mode": mode,
                "provider": "astra-offline-kb"
            }
        elif "oxygen" in msg_lower or "breathe" in msg_lower:
            return {
                "reply": "Spacecraft life support systems (ECLSS) maintain a cabin mix of ~78% Nitrogen and ~21% Oxygen at ~101.3 kPa, mimicking sea-level Earth air. Oxygen is recycled through water electrolysis (2H₂O -> 2H₂ + O₂), while carbon dioxide is scrubbed using amine beds or Sabatier reactors.",
                "mode": mode,
                "provider": "astra-offline-kb"
            }
        elif "launch" in msg_lower or "rocket" in msg_lower:
            return {
                "reply": "Rocket launches rely on Newton's Third Law of Motion: expelling superheated gas out of rocket nozzles at supersonic velocities produces an equal and opposite upward thrust, overcoming Earth's gravity to reach escape velocity (11.2 km/s).",
                "mode": mode,
                "provider": "astra-offline-kb"
            }
        else:
            return {
                "reply": "ASTRA Mission Assistant standing by. Flight systems, telemetry relays, and scientific databases are online. You can ask me about mission telemetry, spacecraft ECLSS systems, orbital mechanics, lunar geology, or emergency contingency protocols.",
                "mode": mode,
                "provider": "astra-offline-kb"
            }

    @staticmethod
    async def chat(
        message: str,
        mode: str = "context",
        mission_state: Optional[Dict[str, Any]] = None,
        active_emergency: Optional[Dict[str, Any]] = None,
        astronaut_profile: Optional[Dict[str, Any]] = None
    ) -> Dict[str, Any]:
        """
        Sends query to Gemini API or falls back safely to internal knowledge base.
        """
        api_key = os.getenv("AI_API_KEY")
        
        # If no Gemini API key configured, use intelligent rule-based mission fallback immediately
        if not api_key or api_key.strip() == "":
            return AIService._generate_rule_based_fallback(message, mode, mission_state, active_emergency)

        # Build context-rich system prompt
        cadet_name = astronaut_profile.get("name", "Cadet") if astronaut_profile else "Cadet"
        
        system_instruction = (
            "You are ASTRA (Automated Space Training & Research Assistant), NASA's advanced AI Mission Control flight director "
            "for the Junior Astronaut Mission Trainer project. You are talking to students and aspiring astronauts. "
            "Tone: Inspiring, technically authentic, crisp, professional yet encouraging like a veteran NASA flight controller. "
            "Keep answers concise (2-4 sentences max unless detailed science explanation is requested). "
            "Distinguish educational simulations from real NASA operations when asked.\n"
        )

        if mode == "context" and mission_state:
            system_instruction += (
                f"\nCURRENT MISSION TELEMETRY:\n"
                f"- Astronaut Name: {cadet_name}\n"
                f"- Mission Phase: {mission_state.get('currentPhase', 'unknown')}\n"
                f"- Composite Mission Health: {mission_state.get('missionHealth', 100)}%\n"
                f"- Mission Risk Level: {mission_state.get('missionRisk', 'LOW')}\n"
                f"- Cabin Oxygen: {mission_state.get('oxygen', 100)}%\n"
                f"- Power Bus: {mission_state.get('power', 100)}%\n"
                f"- Cabin Pressure: {mission_state.get('pressure', 101.3)} kPa\n"
                f"- Comms Signal: {mission_state.get('communication', 100)}%\n"
            )

        if active_emergency:
            system_instruction += (
                f"\nACTIVE IN-FLIGHT EMERGENCY:\n"
                f"- Title: {active_emergency.get('title')}\n"
                f"- Severity: {active_emergency.get('severity')}\n"
                f"- Description: {active_emergency.get('description')}\n"
                f"Guide the astronaut through the decision using sound spaceflight physics and NASA protocols.\n"
            )

        payload = {
            "contents": [
                {
                    "parts": [{"text": message}]
                }
            ],
            "systemInstruction": {
                "parts": [{"text": system_instruction}]
            },
            "generationConfig": {
                "temperature": 0.4,
                "maxOutputTokens": 400
            }
        }

        # Attempt call to Gemini
        for url in [f"{GEMINI_API_URL}?key={api_key}", f"{FALLBACK_MODEL_URL}?key={api_key}"]:
            try:
                async with httpx.AsyncClient(timeout=8.0) as client:
                    resp = await client.post(url, json=payload)
                    if resp.status_code == 200:
                        data = resp.json()
                        candidates = data.get("candidates", [])
                        if candidates:
                            text = candidates[0].get("content", {}).get("parts", [{}])[0].get("text", "")
                            if text:
                                return {
                                    "reply": text.strip(),
                                    "mode": mode,
                                    "provider": "gemini-live"
                                }
            except Exception as e:
                logger.warning(f"Gemini API request failed ({str(e)}), will try next or fallback.")

        # Fallback to local rule-based AI
        return AIService._generate_rule_based_fallback(message, mode, mission_state, active_emergency)
