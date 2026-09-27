import sys
import httpx
import json

try:
    sys.stdout.reconfigure(encoding='utf-8')
except Exception:
    pass

BASE_URL = "http://127.0.0.1:8000"
FRONTEND_URL = "http://localhost:5173"

def print_test(name, passed, details=""):
    mark = "[PASS]" if passed else "[FAIL]"
    print(f"{mark} | {name}")
    if details:
        print(f"     +-- {details}")

def run_tests():
    print("=" * 70)
    print("RUNNING FULL END-TO-END SYSTEM FEATURE TEST")
    print("=" * 70)
    
    passed_count = 0
    total_count = 0
    client = httpx.Client(base_url=BASE_URL, timeout=12.0)


    total_count += 1
    try:
        r = httpx.get(FRONTEND_URL, timeout=5.0)
        ok = (r.status_code == 200) and ("Junior Astronaut" in r.text or "<div id=\"root\">" in r.text)
        print_test("Frontend Dev Server (localhost:5173)", ok, f"Status: {r.status_code}")
        if ok: passed_count += 1
    except Exception as e:
        print_test("Frontend Dev Server (localhost:5173)", False, str(e))

    total_count += 1
    try:
        r = client.get("/api/health")
        data = r.json()
        ok = (r.status_code == 200) and (data.get("status") == "online") and (data.get("active_mission") == "Lunar Research")
        print_test("Backend Health Check (/api/health)", ok, f"Mission: {data.get('active_mission')}, NASA Configured: {data.get('nasa_api_configured')}")
        if ok: passed_count += 1
    except Exception as e:
        print_test("Backend Health Check (/api/health)", False, str(e))


    total_count += 1
    state = {}
    try:
        r = client.get("/api/missions/initial-state")
        state = r.json()
        ok = (r.status_code == 200) and (state.get("oxygen") == 100) and (state.get("missionRisk") == "LOW")
        print_test("Mission Initial State Generator", ok, f"O2: {state.get('oxygen')}%, Health: {state.get('missionHealth')}%, Risk: {state.get('missionRisk')}")
        if ok: passed_count += 1
    except Exception as e:
        print_test("Mission Initial State Generator", False, str(e))

    total_count += 1
    scenarios = []
    try:
        r = client.get("/api/missions/scenarios")
        scenarios = r.json()
        expected_ids = {"solar-radiation", "comm-failure", "oxygen-leak", "thermal-spike"}
        found_ids = {s.get("id") for s in scenarios}
        ok = (r.status_code == 200) and expected_ids.issubset(found_ids)
        print_test("Scenarios Engine Library (4 Scenarios)", ok, f"Found: {sorted(list(found_ids))}")
        if ok: passed_count += 1
    except Exception as e:
        print_test("Scenarios Engine Library (4 Scenarios)", False, str(e))

   
    total_count += 1
    updated_state = state
    try:
        r = client.post("/api/missions/evaluate", json={
            "currentState": state,
            "scenarioId": "solar-radiation",
            "chosenOptionId": "reorient_and_shelter"
        })
        res = r.json()
        ok = (r.status_code == 200) and (res.get("isCorrect") is True) and (res.get("effectsApplied", {}).get("xp") == 150)
        updated_state = res.get("updatedState", state)
        print_test("Emergency Decision Evaluation (Solar Radiation)", ok, f"isCorrect: {res.get('isCorrect')}, XP: +{res.get('effectsApplied', {}).get('xp')}, Risk: {updated_state.get('missionRisk')}")
        if ok: passed_count += 1
    except Exception as e:
        print_test("Emergency Decision Evaluation (Solar Radiation)", False, str(e))

   
    total_count += 1
    try:
        r = client.post("/api/missions/evaluate", json={
            "currentState": updated_state,
            "scenarioId": "oxygen-leak",
            "chosenOptionId": "increase_flow" 
        })
        res = r.json()
        wrong_state = res.get("updatedState", {})
        ok = (r.status_code == 200) and (res.get("isCorrect") is False) and (wrong_state.get("oxygen") < updated_state.get("oxygen", 100))
        print_test("Emergency Failure Penalty & Risk Escalation", ok, f"O2 dropped to: {wrong_state.get('oxygen')}%, Health: {wrong_state.get('missionHealth')}%, Emergencies Failed: {wrong_state.get('emergenciesFailed')}")
        if ok: passed_count += 1
    except Exception as e:
        print_test("Emergency Failure Penalty & Risk Escalation", False, str(e))

   
    total_count += 1
    challenges = []
    try:
        r = client.get("/api/missions/lunar-challenges")
        challenges = r.json()
        ok = (r.status_code == 200) and (len(challenges) == 6)
        print_test("Lunar Surface Science Challenges (6 Challenges)", ok, f"Loaded {len(challenges)} scientific tasks")
        if ok: passed_count += 1
    except Exception as e:
        print_test("Lunar Surface Science Challenges (6 Challenges)", False, str(e))


    total_count += 1
    try:
        r = client.post("/api/missions/evaluate-lunar", json={
            "challengeId": "ice-evidence",
            "selectedAnswer": "hydrogen_ice"
        })
        res = r.json()
        ok = (r.status_code == 200) and (res.get("isCorrect") is True) and (res.get("xpAwarded") == 50)
        print_test("Lunar Science Evaluation (Water Ice Detection)", ok, f"isCorrect: {res.get('isCorrect')}, XP: +{res.get('xpAwarded')}")
        if ok: passed_count += 1
    except Exception as e:
        print_test("Lunar Science Evaluation (Water Ice Detection)", False, str(e))

    total_count += 1
    try:
        r = client.get("/api/nasa/apod")
        res = r.json()
        ok = (r.status_code == 200) and ("title" in res) and ("explanation" in res)
        fallback_str = "Verified Archive Fallback" if res.get("is_fallback") else "Live NASA Stream"
        print_test("NASA API: Astronomy Picture of the Day (APOD)", ok, f"Title: '{res.get('title')}' ({fallback_str})")
        if ok: passed_count += 1
    except Exception as e:
        print_test("NASA API: Astronomy Picture of the Day (APOD)", False, str(e))

    
    total_count += 1
    try:
        r = client.get("/api/nasa/earth")
        items = r.json()
        ok = (r.status_code == 200) and isinstance(items, list) and (len(items) > 0)
        print_test("NASA API: DSCOVR EPIC Earth Imagery", ok, f"Returned {len(items)} full-disk observations")
        if ok: passed_count += 1
    except Exception as e:
        print_test("NASA API: DSCOVR EPIC Earth Imagery", False, str(e))

    
    total_count += 1
    try:
        r = client.get("/api/nasa/moon")
        items = r.json()
        ok = (r.status_code == 200) and isinstance(items, list) and (len(items) > 0)
        print_test("NASA API: Lunar Reconnaissance Orbiter (LRO)", ok, f"Returned {len(items)} crater surface datasets")
        if ok: passed_count += 1
    except Exception as e:
        print_test("NASA API: Lunar Reconnaissance Orbiter (LRO)", False, str(e))

    
    total_count += 1
    try:
        r = client.get("/api/nasa/space-weather")
        items = r.json()
        ok = (r.status_code == 200) and isinstance(items, list) and (len(items) > 0)
        flare_class = items[0].get("classType", "Unknown")
        print_test("NASA API: DONKI Real-Time Space Weather", ok, f"Returned {len(items)} solar flares (Sample: {flare_class})")
        if ok: passed_count += 1
    except Exception as e:
        print_test("NASA API: DONKI Real-Time Space Weather", False, str(e))

    
    total_count += 1
    try:
        r = client.post("/api/ai/astra", json={
            "message": "ASTRA, give me a flight telemetry status report.",
            "mode": "context",
            "missionState": updated_state,
            "activeEmergency": None,
            "astronaut": {"name": "Cadet Morgan", "id": "AST-7709"}
        })
        res = r.json()
        ok = (r.status_code == 200) and ("reply" in res) and len(res.get("reply", "")) > 10
        print_test("ASTRA AI Flight Director (Context-Aware)", ok, f"Provider: {res.get('provider')}, Reply snippet: '{res.get('reply')[:75]}...'")
        if ok: passed_count += 1
    except Exception as e:
        print_test("ASTRA AI Flight Director (Context-Aware)", False, str(e))

    
    total_count += 1
    try:
        r = client.post("/api/ai/astra", json={
            "message": "Why do astronauts experience microgravity on the Moon and in orbit?",
            "mode": "assistant",
            "missionState": None,
            "activeEmergency": None,
            "astronaut": None
        })
        res = r.json()
        ok = (r.status_code == 200) and ("reply" in res) and ("gravity" in res.get("reply", "").lower() or "orbit" in res.get("reply", "").lower())
        print_test("ASTRA AI Space Science Tutor", ok, f"Reply snippet: '{res.get('reply')[:75]}...'")
        if ok: passed_count += 1
    except Exception as e:
        print_test("ASTRA AI Space Science Tutor", False, str(e))

    total_count += 1
    try:
        r = client.get("/api/leaderboard")
        cadets = r.json()
        ok = (r.status_code == 200) and isinstance(cadets, list) and (len(cadets) >= 3)
        print_test("Global Cadet Leaderboard (/api/leaderboard)", ok, f"Top cadet: {cadets[0].get('name')} ({cadets[0].get('score')} pts)")
        if ok: passed_count += 1
    except Exception as e:
        print_test("Global Cadet Leaderboard (/api/leaderboard)", False, str(e))

  
    total_count += 1
    try:
        r = client.post("/api/missions/report", json={
            "astronaut": {"name": "Alex Vance", "id": "AST-2048"},
            "missionState": updated_state,
            "lunarChallengesSolved": 6,
            "trainingScore": 100
        })
        rep = r.json()
        ok = (r.status_code == 200) and ("scores" in rep) and ("overall" in rep.get("scores", {})) and ("disclaimer" in rep)
        print_test("Final Scored Mission Report & Certificate Generation", ok, f"Overall: {rep.get('scores', {}).get('overall')}%, Rank: {rep.get('assignedRank')}, Level: {rep.get('achievementLevel')}")
        if ok: passed_count += 1
    except Exception as e:
        print_test("Final Scored Mission Report & Certificate Generation", False, str(e))

    print("=" * 70)
    print(f"TEST SUMMARY: {passed_count} / {total_count} TESTS PASSED ({(passed_count/total_count)*100:.1f}%)")
    print("=" * 70)

    return passed_count == total_count

if __name__ == "__main__":
    success = run_tests()
    sys.exit(0 if success else 1)
