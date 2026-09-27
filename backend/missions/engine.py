"""
Deterministic Mission Scenario & State Engine
Tracks telemetry, computes exact state modifications, risk levels, and badge awards.
"""

from typing import Dict, Any, List
from .scenarios import MISSION_SCENARIOS

DEFAULT_MISSION_STATE = {
    "oxygen": 100,       
    "power": 100,       
    "fuel": 100,          
    "temperature": 21.0,  
    "pressure": 101.3,    
    "communication": 100, 
    "navigation": 100,     
    "missionHealth": 100, 
    "score": 0,
    "xp": 0,
    "missionRisk": "LOW",  
    "currentPhase": "pre_launch", 
    "completedObjectives": [],
    "badges": [],
    "history": [],
    "emergenciesResolved": 0,
    "emergenciesFailed": 0,
}

def clamp(val: float, min_val: float, max_val: float) -> float:
    return max(min_val, min(max_val, val))

class MissionEngine:
    @staticmethod
    def get_initial_state() -> Dict[str, Any]:
        return dict(DEFAULT_MISSION_STATE)

    @staticmethod
    def get_scenario(scenario_id: str) -> Dict[str, Any]:
        return MISSION_SCENARIOS.get(scenario_id)

    @staticmethod
    def get_all_scenarios() -> List[Dict[str, Any]]:
        return list(MISSION_SCENARIOS.values())

    @staticmethod
    def evaluate_decision(
        current_state: Dict[str, Any],
        scenario_id: str,
        chosen_option_id: str
    ) -> Dict[str, Any]:
        scenario = MISSION_SCENARIOS.get(scenario_id)
        if not scenario:
            raise ValueError(f"Unknown scenario ID: {scenario_id}")

        is_correct = (chosen_option_id == scenario["correctAnswer"])
        effects = scenario["effectsOnSuccess"] if is_correct else scenario["effectsOnFailure"]

        new_state = dict(current_state)

        # Apply numerical effects deterministically
        new_state["oxygen"] = int(clamp(new_state.get("oxygen", 100) + effects.get("oxygen", 0), 0, 100))
        new_state["power"] = int(clamp(new_state.get("power", 100) + effects.get("power", 0), 0, 100))
        new_state["fuel"] = int(clamp(new_state.get("fuel", 100) + effects.get("fuel", 0), 0, 100))
        new_state["temperature"] = round(new_state.get("temperature", 21.0) + effects.get("temperature", 0), 1)
        new_state["pressure"] = round(clamp(new_state.get("pressure", 101.3) + effects.get("pressure", 0), 0, 120.0), 1)
        new_state["communication"] = int(clamp(new_state.get("communication", 100) + effects.get("communication", 0), 0, 100))
        new_state["navigation"] = int(clamp(new_state.get("navigation", 100) + effects.get("navigation", 0), 0, 100))
        
       
        computed_health = (
            new_state["oxygen"] * 0.35 +
            new_state["power"] * 0.20 +
            new_state["communication"] * 0.15 +
            new_state["navigation"] * 0.15 +
            new_state["fuel"] * 0.15
        )
        new_state["missionHealth"] = int(clamp(computed_health, 0, 100))

      
        new_state["score"] = max(0, new_state.get("score", 0) + effects.get("score", 0))
        new_state["xp"] = max(0, new_state.get("xp", 0) + effects.get("xp", 0))

     
        if is_correct:
            new_state["emergenciesResolved"] = new_state.get("emergenciesResolved", 0) + 1
        else:
            new_state["emergenciesFailed"] = new_state.get("emergenciesFailed", 0) + 1

      
        risk_score = 0
        if new_state["missionHealth"] < 50:
            risk_score += 3
        elif new_state["missionHealth"] < 75:
            risk_score += 1

        if new_state["oxygen"] < 70 or new_state["pressure"] < 85:
            risk_score += 2
        if new_state["communication"] < 60:
            risk_score += 1
        if new_state["emergenciesFailed"] >= 2:
            risk_score += 2

        if risk_score >= 4:
            new_state["missionRisk"] = "HIGH"
        elif risk_score >= 2:
            new_state["missionRisk"] = "MODERATE"
        else:
            new_state["missionRisk"] = "LOW"

       
        badges = list(new_state.get("badges", []))
        if new_state["emergenciesResolved"] >= 1 and "Emergency Responder" not in badges:
            badges.append("Emergency Responder")
        if new_state["power"] >= 85 and new_state["oxygen"] >= 85 and "Systems Expert" not in badges:
            badges.append("Systems Expert")

        new_state["badges"] = badges


        history_item = {
            "scenarioId": scenario_id,
            "scenarioTitle": scenario["title"],
            "chosenOption": chosen_option_id,
            "isCorrect": is_correct,
            "message": effects.get("statusMessage", ""),
            "explanation": scenario["explanation"]
        }
        history = list(new_state.get("history", []))
        history.append(history_item)
        new_state["history"] = history

        return {
            "isCorrect": is_correct,
            "chosenOption": chosen_option_id,
            "explanation": scenario["explanation"],
            "statusMessage": effects.get("statusMessage", ""),
            "effectsApplied": effects,
            "updatedState": new_state
        }
