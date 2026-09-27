# Junior Astronaut Mission Trainer 🚀
> **Tagline:** *"Train. Decide. Explore. Become a Junior Astronaut."*  
> **NASA Space Apps Challenge Entry**

[![Live Demo](https://img.shields.io/badge/Live%20Demo-Vercel-black?style=for-the-badge&logo=vercel)](https://your-project-name.vercel.app)
[![GitHub Repo](https://img.shields.io/badge/Source-GitHub-181717?style=for-the-badge&logo=github)](https://github.com/your-username/your-repo-name)

**🔗 Live Demo:** [https://junior-astronaut-56yh.vercel.app/](https://junior-astronaut-56yh.vercel.app/)
**💻 Source Code:** [https://github.com/parthingle826-web/Junior_Astronaut](https://github.com/parthingle826-web/Junior_Astronaut)

>

An interactive, high-fidelity astronaut training and mission flight simulation web application designed for students and aspiring aerospace explorers. Cadets enroll, master orbital dynamics and ECLSS life support, execute pre-launch pad checklists, navigate critical cislunar emergencies, perform a powered lunar descent, conduct 6 surface science tasks at Shackleton Crater, query authentic NASA planetary data, and earn a personalized achievement certificate.

---

## 🌟 Key Features

1. **Space Flight Academy (4 Training Modules):**
   - *Space Science Fundamentals:* Orbital free-fall vs. zero-g, hard vacuum dynamics.
   - *Astronaut Survival & Physiology:* Closed-loop water/air recycling, cosmic radiation physics.
   - *Spacecraft Systems & Power:* Solar photovoltaic arrays, battery management, RCS thrusters.
   - *Mission Decision Making & Triage:* "Aviate, Navigate, Communicate" protocol, sensor redundancy.
   - *Interactive Scored Quizzes:* In-depth scientific explanations of *why* choices are right or wrong.

2. **Pre-Launch Checklist & Rocket Launch Sequence:**
   - Pre-launch verification with a deliberate sensor anomaly (*Cryogenic Tank 2 Pressure Transducer Discrepancy*) that cadets must resolve before ignition.
   - T-10 countdown, main engine start, solid rocket booster ignition, stage separation, and orbital insertion animations.

3. **Deterministic Mission Scenario Engine (Space Travel Phase):**
   - Real-time telemetry monitoring: Oxygen (%), Power (%), Fuel (%), Pressure (kPa), Temperature (°C), Communications (%), Navigation (%), Composite Health (%), and Risk (LOW / MODERATE / HIGH).
   - In-flight emergency scenarios grounded in spaceflight physics:
     - **Solar Radiation Storm (CME):** Mass-shielding and water-wall shelter protocol.
     - **Deep Space Network Signal Loss:** Omnidirectional S-band transceiver switch.
     - **Cabin Oxygen Pressure Drop:** Manifold isolation and reserve tank tap.
     - **Radiator Loop Thermal Runaway:** Passive Thermal Control ("barbecue roll").

4. **Powered Moon Landing Simulator:**
   - Real-time lunar descent physics (gravity 1.62 m/s²).
   - Vernier retrorocket throttle controls to touch down safely at &lt; 3.0 m/s at the Lunar South Pole.

5. **Lunar Surface Science (6 Field Challenges):**
   - Topographic radar map of Shackleton Crater and Malapert Mountain.
   - 6 scientific challenges (+50 XP each): Crater morphological classification, landing site slope safety, anorthosite regolith analysis, extreme vacuum thermal gradients, epithermal neutron suppression for water ice, and Ground-Penetrating Radar (GPR) selection.

6. **NASA Scientific Data Explorer:**
   - Server-side integration with NASA maintained endpoints:
     - **Earth:** DSCOVR EPIC full-disc imagery from Sun-Earth L1.
     - **Moon:** Lunar Reconnaissance Orbiter (LRO) high-resolution surface mapping.
     - **Space Weather:** NASA DONKI real-time solar flares (Class M/X) and CME feeds.
     - **Asteroids:** NeoWS / CNEOS near-Earth object approaches.
     - **APOD:** Astronomy Picture of the Day.
   - Transparent data labeling: Clearly distinguished with `LIVE NASA STREAM` or `VERIFIED ARCHIVE` badges. Never fakes live status.

7. **ASTRA AI Flight Director (Dual-Mode):**
   - Powered by Google Gemini via secure server-side FastAPI proxy.
   - **Mission Control Mode:** Context-aware; ingests current telemetry, flight phase, and active emergencies.
   - **Science Tutor Mode:** Answers student inquiries regarding orbital physics, life support, and planetary geology.
   - **Resilience:** Automatic fallback to an internal static spaceflight knowledge base if API keys are offline.

8. **Mission Report & Achievement Certificate:**
   - Evaluated on 4 sub-scores: Science (0-100), Safety (0-100), Decision (0-100), Exploration (0-100), and Composite Rating.
   - Project-Generated Achievement Certificate with cadet name, flight rank, XP, date, ASTRA signature, celebratory confetti, and print/PDF support.
   - Clearly labeled: *"Project-generated achievement certificate — not an official NASA certification."*

9. **UN Sustainable Development Goals (SDGs):**
   - **SDG 4 (Quality Education):** Contributes to accessible, engaging experiential STEM learning.
   - **SDG 9 (Industry & Innovation):** Contributes to aerospace systems literacy and critical problem solving.
   - **SDG 13 (Climate Action):** Contributes through DSCOVR EPIC Earth observation and space weather monitoring.

10. **Judge Fast-Track Demo Mode:**
    - Top bar quick launcher lets hackathon judges jump to any phase (Training → Launch → Emergencies → Landing → Surface Science → NASA Data → Certificate) in under 3 minutes.

---

## 🛠️ Architecture & Tech Stack

```
junior-astronaut/
├── frontend/               # React + Vite Client Application
│   ├── src/
│   │   ├── components/     # TelemetryHUD, AstraChat, Navbar, Footer, EmergencyAlertModal
│   │   ├── pages/          # Landing, Registration, Dashboard, Training, Briefing, Launch,
│   │   │                   # MissionControl, MoonLanding, LunarExploration, NasaData, Report, Certificate
│   │   ├── context/        # MissionContext (Deterministic game state & LocalStorage sync)
│   │   ├── data/           # Training modules & flight curriculum
│   │   └── App.jsx         # App router & global ASTRA launcher
│   └── tailwind.config.js  # NASA HUD Dark theme design system
├── backend/                # FastAPI Python Server
│   ├── main.py             # App entry, CORS, and health monitoring
│   ├── routes/             # missions.py, nasa.py, ai.py, leaderboard.py
│   ├── services/           # nasa_service.py, ai_service.py (Gemini integration)
│   ├── missions/           # engine.py, scenarios.py (Deterministic state machine)
│   ├── data/               # fallback_data.py (Verified authentic NASA archives)
│   └── requirements.txt
├── .env.example            # Template environment configuration
└── README.md
```

### Technologies Used:
- **Frontend:** React 19, Vite, Tailwind CSS, Lucide React, Canvas Confetti.
- **Backend:** Python 3.14, FastAPI, Uvicorn, HTTPX, Pydantic, Python-Dotenv.
- **AI Engine:** Google Gemini (via secure server-side FastAPI proxy, never exposed to client).
- **APIs:** NASA APOD, NASA EPIC, NASA DONKI, NASA NeoWS, NASA Image & Video Library.

---

## ⚡ Quick Start & Running Locally

### 1. Prerequisites
- **Node.js** (v18+ or v20+)
- **Python** (v3.10+)

### 2. Environment Setup
Create a `.env` file in the project root (a template is provided in `.env.example`):
```bash

NASA_API_KEY=DEMO_KEY


AI_API_KEY=your_gemini_api_key_here
AI_PROVIDER=gemini
```
*(Note: If no API key is provided, the backend automatically uses its built-in authentic NASA fallback datasets and intelligent offline knowledge base, ensuring zero broken screens).*

### 3. Launch Backend Server
```bash

pip install -r backend/requirements.txt


python -m uvicorn backend.main:app --host 127.0.0.1 --port 8000 --reload
```
Backend health check is accessible at `http://127.0.0.1:8000/api/health`.

### 4. Launch Frontend Client
In a new terminal window:
```bash
cd frontend

npm install


npm run dev
```
Open **`http://localhost:5173`** in your browser.

---

## ☁️ Deployment

- **Frontend (Vercel):** Deploy the `frontend/` folder directly to Vercel as a static Vite build. Set the project root to `frontend`, build command to `npm run build`, and output directory to `dist`.
- **Backend (FastAPI):** Vercel's serverless functions can run Python, but a persistent FastAPI app with streaming/AI calls is generally better suited to a dedicated host such as **Render**, **Railway**, or **Fly.io**. Deploy `backend/` there and point the frontend's API base URL at that backend's public URL via an environment variable (e.g. `VITE_API_BASE_URL`).
- Set `NASA_API_KEY`, `AI_API_KEY`, and `AI_PROVIDER` as environment variables on whichever platform hosts the backend — never in the frontend's Vercel environment variables, since those are exposed to the client bundle.

**Live Demo:** [https://junior-astronaut-56yh.vercel.app/](https://junior-astronaut-56yh.vercel.app/) 

---

## 🏆 Hackathon Priority Demo Flow (3-Minute Tour)

1. **Landing Page:** Click **"Start Your Mission"** or use the **"Judge Fast Track"** banner.
2. **Astronaut Registration:** Enter cadet name & callsign (e.g., Alex Vance / Starlight). Select **"Lunar Research"** (Mars is clearly stubbed as *Coming Soon*).
3. **Training Academy:** Explore Module 1 (*Space Science*) or Module 3 (*Spacecraft Systems*). Take the quiz and read the scientific explanation.
4. **Mission Briefing:** Review the Artemis flight plan to the Lunar South Pole.
5. **Pre-Launch Checklist:** Resolve the intentional warning (*Cryogenic Tank 2 Pressure Transducer*) by cycling the relief valve. Click **"Initiate T-10 Launch Countdown"** to watch the animated liftoff.
6. **Mission Control (Space Travel):** Observe the real-time Telemetry HUD. An emergency (e.g. Solar Radiation Storm or Cabin Oxygen Leak) triggers. Select the correct protocol and review ASTRA's tactical debrief and telemetry score delta.
7. **Powered Moon Landing:** Throttle retrorockets to achieve soft touchdown at &lt; 3.0 m/s on Shackleton Crater rim.
8. **Lunar Surface Exploration:** Select sites on the crater radar map and solve field science tasks (crater geology, water ice detection).
9. **NASA Data Explorer:** Toggle between Earth (EPIC), Moon (LRO), and Space Weather (DONKI) to view authentic planetary data.
10. **Mission Report & Certificate:** View sub-scores, rank, and open the official printable achievement certificate with celebratory confetti.
11. **ASTRA AI Radio:** Click the floating bot icon in the bottom right corner anytime to converse with ASTRA in Mission Control or Science Tutor mode.

---

## 📜 Compliance & Transparency Notice

- **Educational Simulation:** This application is an educational simulation created for the NASA Space Apps Challenge.
- **Official Credentials:** Project-generated achievement certificates are non-commercial simulation honors and do not constitute official government or NASA credentials.
- **Scientific Integrity:** All NASA data is drawn from official NASA endpoints or verified archives from the NASA Planetary Data System. Fictional data is never presented as NASA scientific findings.

---

## 📄 License

Add your chosen license here (e.g. MIT) and include a `LICENSE` file in the repository root if you intend to open-source this project.