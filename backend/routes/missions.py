"""
Mission Routes & Lunar Exploration Engine
Provides scenario data, deterministic evaluation, lunar science challenges, and report generation.
"""

from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import Dict, Any, Optional, List
from ..missions.engine import MissionEngine

router = APIRouter(prefix="/api/missions", tags=["Missions"])

class DecisionRequest(BaseModel):
    currentState: Dict[str, Any]
    scenarioId: str
    chosenOptionId: str

class LunarChallengeSubmit(BaseModel):
    challengeId: str
    selectedAnswer: str

class MissionReportRequest(BaseModel):
    astronaut: Dict[str, Any]
    missionState: Dict[str, Any]
    lunarChallengesSolved: int
    trainingScore: int

LUNAR_CHALLENGES = [
    {
        "id": "crater-id",
        "title": "1. Crater Morphological Identification",
        "description": "Examine the orbital radar profile of the landing site rim. Notice the central peak, terraced inner walls, and surrounding radial ejecta blanket. What type of impact feature are we observing?",
        "options": [
            {"id": "complex", "label": "Complex Impact Crater (diameter > 15-20 km with central rebound peak)"},
            {"id": "simple", "label": "Simple Bowl Crater (smooth concave floor without terraces)"},
            {"id": "caldera", "label": "Volcanic Caldera Collapse Trench"}
        ],
        "correctAnswer": "complex",
        "explanation": "On the Moon, impact craters larger than ~15 km transition from simple bowl shapes to complex craters, characterized by a central uplift peak formed by hydrodynamic crustal rebound and terraced rim walls.",
        "xpReward": 50
    },
    {
        "id": "site-safety",
        "title": "2. Landing Site Safety Comparison",
        "description": "Mission Control provides slope gradients and boulder distribution data for three candidate landing zones near Malapert Mountain.",
        "options": [
            {"id": "zone_a", "label": "Zone Alpha: 4° slope gradient, boulder frequency < 1.2 per 100m², 88% direct line-of-sight to Earth"},
            {"id": "zone_b", "label": "Zone Beta: 19° slope gradient, shadowed crater floor, boulder frequency 14.5 per 100m²"},
            {"id": "zone_c", "label": "Zone Gamma: 12° slope gradient, crater rim edge with intermittent DSN occultation"}
        ],
        "correctAnswer": "zone_a",
        "explanation": "Human lunar landers require landing sites with slopes under 7-10° to prevent tipping, low boulder density to avoid puncturing landing pads, and direct line-of-sight to Earth for uninterrupted telemetry.",
        "xpReward": 50
    },
    {
        "id": "terrain-analysis",
        "title": "3. Regolith & Terrain Analysis",
        "description": "The Lunar Rover spectrometer analyzes the top 5 cm of surface soil. It detects high concentrations of anorthosite rock rich in calcium-aluminum silicates. What does this indicate?",
        "options": [
            {"id": "highlands", "label": "Ancient Lunar Highlands crust formed during early magma ocean crystallization"},
            {"id": "mare_basalt", "label": "Recent basaltic lava flow from young lunar volcanic vents"},
            {"id": "meteorite_remnant", "label": "Pure nickel-iron fragments from a shattered metallic asteroid"}
        ],
        "correctAnswer": "highlands",
        "explanation": "Anorthosite is the primary constituent of the bright lunar highlands. As the Moon's primordial magma ocean cooled 4.4 billion years ago, low-density plagioclase feldspar floated to the surface, creating the original lunar crust.",
        "xpReward": 50
    },
    {
        "id": "temperature-graph",
        "title": "4. Thermal Gradient Reading",
        "description": "Radiometer telemetry records +115°C on the illuminated rim of Shackleton Crater, while the crater interior drops to -238°C (35 Kelvin) just 300 meters away. Why is this extreme temperature differential possible?",
        "options": [
            {"id": "no_atmosphere", "label": "The Moon lacks an atmosphere to conduct or convect heat, and low axial tilt (1.54°) permanently blocks sunlight from reaching crater floors"},
            {"id": "nuclear_cooling", "label": "Underground cryogenic geothermal geysers cool the crater floor"},
            {"id": "magnetic_lens", "label": "The lunar magnetic field deflects thermal infrared radiation away from craters"}
        ],
        "correctAnswer": "no_atmosphere",
        "explanation": "Without an atmosphere, thermal transfer occurs purely through direct radiative exchange. The Moon's tiny axial tilt of 1.54° means sunlight strikes the poles at glancing angles, leaving deep craters in eternal shadow at temperatures colder than Pluto.",
        "xpReward": 50
    },
    {
        "id": "ice-evidence",
        "title": "5. Volatile Water Ice Detection",
        "description": "LEND (Lunar Exploration Neutron Detector) records an abrupt dip in epithermal neutron flux over the Cabeus crater basin. What does a suppression of epithermal neutrons signify?",
        "options": [
            {"id": "hydrogen_ice", "label": "High abundance of Hydrogen atoms (confirming subsurface water ice molecules H₂O)"},
            {"id": "radioactive_decay", "label": "Radioactive Uranium and Thorium deposits emitting gamma radiation"},
            {"id": "metallic_iron", "label": "Dense deposits of magnetic iron absorbing sensor waves"}
        ],
        "correctAnswer": "hydrogen_ice",
        "explanation": "Cosmic rays eject neutrons from lunar soil. Because neutrons have approximately the same mass as hydrogen protons, colliding with hydrogen atoms rapidly slows neutrons down from epithermal to thermal energies. A drop in epithermal neutrons is the definitive signature of hydrogen/water.",
        "xpReward": 50
    },
    {
        "id": "instrument-choice",
        "title": "6. Science Instrument Selection",
        "description": "You need to determine the subsurface layering and presence of sub-regolith lava tubes up to 50 meters beneath the rover without drilling. Which scientific instrument should you deploy?",
        "options": [
            {"id": "gpr", "label": "Ground-Penetrating Radar (GPR / RIMFAX style high-frequency radar)"},
            {"id": "alpha_spectrometer", "label": "Alpha Particle X-Ray Spectrometer (APXS)"},
            {"id": "wind_anemometer", "label": "Acoustic Surface Wind Anemometer"}
        ],
        "correctAnswer": "gpr",
        "explanation": "Ground-Penetrating Radar transmits electromagnetic radar pulses deep into the bedrock and measures reflected echoes to construct high-resolution subterranean stratigraphic maps. (APXS only measures surface chemistry within millimeters, and the Moon has no wind).",
        "xpReward": 50
    }
]

@router.get("/scenarios")
async def get_scenarios():
    return MissionEngine.get_all_scenarios()

@router.get("/initial-state")
async def get_initial_state():
    return MissionEngine.get_initial_state()

@router.post("/evaluate")
async def evaluate_decision(req: DecisionRequest):
    try:
        result = MissionEngine.evaluate_decision(
            current_state=req.currentState,
            scenario_id=req.scenarioId,
            chosen_option_id=req.chosenOptionId
        )
        return result
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))

@router.get("/lunar-challenges")
async def get_lunar_challenges():
    return LUNAR_CHALLENGES

@router.post("/evaluate-lunar")
async def evaluate_lunar(submission: LunarChallengeSubmit):
    for ch in LUNAR_CHALLENGES:
        if ch["id"] == submission.challengeId:
            is_correct = (submission.selectedAnswer == ch["correctAnswer"])
            return {
                "challengeId": ch["id"],
                "isCorrect": is_correct,
                "explanation": ch["explanation"],
                "xpAwarded": ch["xpReward"] if is_correct else 10
            }
    raise HTTPException(status_code=404, detail="Challenge not found")

@router.post("/report")
async def generate_mission_report(data: MissionReportRequest):
    state = data.missionState
    astronaut = data.astronaut
    
    # Calculate subscores
    # 1. Science Score (Lunar challenges + Training)
    lunar_solved = data.lunarChallengesSolved
    training_score = data.trainingScore
    science_score = min(100, int((lunar_solved / 6.0) * 60 + (training_score / 100.0) * 40))

    # 2. Safety Score (Remaining Health, Oxygen, Pressure)
    health = state.get("missionHealth", 100)
    oxygen = state.get("oxygen", 100)
    pressure = state.get("pressure", 101.3)
    safety_score = min(100, int(health * 0.5 + oxygen * 0.3 + (pressure / 101.3) * 20))

    # 3. Decision Score (Emergencies handled)
    resolved = state.get("emergenciesResolved", 0)
    failed = state.get("emergenciesFailed", 0)
    total_emergencies = resolved + failed
    decision_score = 100 if total_emergencies == 0 else int((resolved / max(1, total_emergencies)) * 100)

    # 4. Exploration Score
    exploration_score = min(100, int((lunar_solved / 6.0) * 100))

    # Overall percentage
    overall_percentage = int((science_score * 0.3) + (safety_score * 0.3) + (decision_score * 0.25) + (exploration_score * 0.15))

    # Determine achievement level
    if overall_percentage >= 90:
        achievement_level = "Distinguished Flight Commander"
        rank = "Mission Specialist"
    elif overall_percentage >= 75:
        achievement_level = "Senior Flight Astronaut"
        rank = "Junior Astronaut"
    elif overall_percentage >= 60:
        achievement_level = "Certified Mission Aviator"
        rank = "Mission Cadet"
    else:
        achievement_level = "Spaceflight Trainee Graduate"
        rank = "Space Trainee"

    # Evaluation summary paragraph
    summary_paragraph = (
        f"Astronaut {astronaut.get('name', 'Cadet')} has completed the Artemis Lunar Research Simulation with an overall "
        f"flight evaluation rating of {overall_percentage}%. Throughout the mission, the cadet successfully negotiated critical "
        f"cislunar contingencies ({resolved} resolved), sustained spacecraft environmental systems at {safety_score}% efficiency, "
        f"and executed {lunar_solved} field science objectives across the Lunar South Pole with a scientific competency score of {science_score}%. "
        f"All systems telemetry affirms mission readiness for advanced cislunar exploration."
    )

    return {
        "astronautName": astronaut.get("name", "Cadet"),
        "astronautId": astronaut.get("id", "AST-2048"),
        "missionName": "Artemis Lunar Research Simulation",
        "date": "2026-09-24",
        "scores": {
            "science": science_score,
            "safety": safety_score,
            "decision": decision_score,
            "exploration": exploration_score,
            "overall": overall_percentage
        },
        "stats": {
            "emergenciesResolved": resolved,
            "emergenciesFailed": failed,
            "lunarObjectivesCompleted": lunar_solved,
            "finalXP": state.get("xp", 0) + 500, # Mission Complete bonus
            "finalScore": state.get("score", 0),
            "badgesEarned": state.get("badges", [])
        },
        "achievementLevel": achievement_level,
        "assignedRank": rank,
        "summary": summary_paragraph,
        "disclaimer": "This is a project-generated achievement certificate for an educational simulation — not an official NASA certification."
    }
