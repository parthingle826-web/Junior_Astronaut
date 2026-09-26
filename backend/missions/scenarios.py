"""
Mission Scenario Engine Data Models & Scenario Library
Contains real, physics-grounded spaceflight emergency scenarios.
"""

MISSION_SCENARIOS = {
    "solar-radiation": {
        "id": "solar-radiation",
        "title": "Solar Radiation Storm Detected",
        "category": "Space Weather",
        "severity": "critical",
        "description": "The Deep Space Climate Observatory (DSCOVR) and spacecraft magnetometers detect a Class X-2.1 coronal mass ejection (CME) heading directly toward your cislunar trajectory. Proton flux exceeds 100 MeV threshold. Secondary radiation shielding must be configured before radiation storm onset in 18 minutes.",
        "options": [
            {
                "id": "reorient_and_shelter",
                "label": "Reorient spacecraft to point service module engine bell toward the Sun & retreat to water-wall radiation storm shelter."
            },
            {
                "id": "dump_power",
                "label": "Shut down life support generators to divert all electrical power to magnetic deflector coils."
            },
            {
                "id": "eva_inspection",
                "label": "Perform an emergency Extravehicular Activity (EVA) spacewalk to attach manual lead shielding blankets to the hatch."
            }
        ],
        "correctAnswer": "reorient_and_shelter",
        "explanation": "NASA Artemis radiation protocol dictates using the dense mass of the service module and propulsion system as a physical cosmic shield against solar energetic particles (SEPs), while crew gathers in the central pressurized core surrounded by onboard water reserves (water is rich in hydrogen atoms, making it the most effective radiation barrier in deep space). Stepping outside for an EVA would expose astronauts to lethal radiation doses, and spacecraft do not have sci-fi magnetic deflector forcefields.",
        "effectsOnSuccess": {
            "oxygen": 0,
            "power": -5,
            "fuel": -2,
            "temperature": 1,
            "pressure": 0,
            "communication": -5,
            "navigation": 0,
            "missionHealth": 0,
            "score": 150,
            "xp": 150,
            "missionRisk": -15,
            "statusMessage": "Shielding deployed successfully. Crew received zero excess ionizing dosage. CME peak passed."
        },
        "effectsOnFailure": {
            "oxygen": -5,
            "power": -15,
            "fuel": -5,
            "temperature": 4,
            "pressure": 0,
            "communication": -25,
            "navigation": -10,
            "missionHealth": -25,
            "score": -50,
            "xp": 30,
            "missionRisk": 25,
            "statusMessage": "DANGER: Excessive radiation penetrated habitat modules. Avionics sensors glitched and avionics temperature rose."
        }
    },
    "comm-failure": {
        "id": "comm-failure",
        "title": "Deep Space Network Signal Loss",
        "category": "Communications",
        "severity": "high",
        "description": "Telemetry link with Goldstone Ground Station dropped to 0 kbps while passing beyond High Earth Orbit. The primary high-gain parabolic antenna gimbal is stuck at azimuth +42.1°, unable to lock onto Earth. Mission Control telemetry stream is offline.",
        "options": [
            {
                "id": "switch_omni_backup",
                "label": "Switch to omnidirectional S-band transponders and align craft using star-tracker backup attitude control."
            },
            {
                "id": "max_amplifier",
                "label": "Increase high-gain transmitter wattage to 500% to force the signal through the dead zone."
            },
            {
                "id": "reboot_avionics",
                "label": "Initiate a cold reboot of the central flight computer while in open trajectory."
            }
        ],
        "correctAnswer": "switch_omni_backup",
        "explanation": "Omnidirectional S-band antennas do not require precise mechanical pointing toward Earth. While data transmission bandwidth is lower (voice and telemetry only, no 4K video), switching to omni restores instantaneous contact with NASA's Deep Space Network (DSN) Madrid and Canberra stations. Forcing transmitter power will burn out traveling wave tube amplifiers (TWTAs), and cold-rebooting the primary flight guidance computer during burn phase risks trajectory loss.",
        "effectsOnSuccess": {
            "oxygen": 0,
            "power": -2,
            "fuel": 0,
            "temperature": 0,
            "pressure": 0,
            "communication": 20,
            "navigation": 5,
            "missionHealth": 0,
            "score": 150,
            "xp": 150,
            "missionRisk": -10,
            "statusMessage": "Telemetry restored via Madrid DSN 70m antenna. S-band carrier lock nominal."
        },
        "effectsOnFailure": {
            "oxygen": 0,
            "power": -20,
            "fuel": -5,
            "temperature": 2,
            "pressure": 0,
            "communication": -40,
            "navigation": -20,
            "missionHealth": -15,
            "score": -40,
            "xp": 30,
            "missionRisk": 20,
            "statusMessage": "Amplifier thermal surge detected! High-gain electronics tripped. Mission Control is blind to your trajectory."
        }
    },
    "oxygen-leak": {
        "id": "oxygen-leak",
        "title": "Cabin Oxygen Pressure Drop",
        "category": "Life Support (ECLSS)",
        "severity": "critical",
        "description": "Environmental Control & Life Support System (ECLSS) sounds a klaxon: cabin atmosphere pressure is declining at 0.35 kPa per minute. Primary Oxygen Tank 2 sensor registers a pressure differential, indicating a micrometeoroid puncture in the secondary feed manifold.",
        "options": [
            {
                "id": "isolate_manifold",
                "label": "Seal helmet visors, isolate the secondary manifold via crossfeed valve 4B, and activate emergency O2 reserve."
            },
            {
                "id": "increase_flow",
                "label": "Open main oxygen valves to maximum output to overpower the leak and maintain cabin pressure."
            },
            {
                "id": "vent_nitrogen",
                "label": "Vent all nitrogen buffer gas into space to reduce total internal atmospheric friction."
            }
        ],
        "correctAnswer": "isolate_manifold",
        "explanation": "Standard human spaceflight emergency protocol (used on Apollo 13, ISS, and Artemis): crew immediately dons pressure suits / locks visors to secure individual air supply, then systematically closes crossfeed valves to isolate the ruptured manifold segment before switching to the isolated emergency reserve tank. Pumping more oxygen into an open breach vents precious life support gas into vacuum within minutes, and venting nitrogen destroys the 78/21 balance necessary to prevent explosive fire hazards.",
        "effectsOnSuccess": {
            "oxygen": 10,
            "power": -3,
            "fuel": 0,
            "temperature": 0,
            "pressure": 10,
            "communication": 0,
            "navigation": 0,
            "missionHealth": 5,
            "score": 150,
            "xp": 150,
            "missionRisk": -15,
            "statusMessage": "Secondary manifold 4B isolated. Pressure stabilized at 101.3 kPa. Reserve supply holding."
        },
        "effectsOnFailure": {
            "oxygen": -35,
            "power": -10,
            "fuel": 0,
            "temperature": -3,
            "pressure": -25,
            "communication": 0,
            "navigation": 0,
            "missionHealth": -30,
            "score": -60,
            "xp": 25,
            "missionRisk": 35,
            "statusMessage": "CRITICAL WARNING: 35% of oxygen supply vented to space! Cabin pressure unstable."
        }
    },
    "thermal-spike": {
        "id": "thermal-spike",
        "title": "Radiator Loop Thermal Runaway",
        "category": "Thermodynamics",
        "severity": "high",
        "description": "Spacecraft freon-loop heat exchanger has accumulated excessive heat from solar exposure while in lunar orbital insertion trajectory. Internal avionics bay temperature is rising toward the critical 38°C ceiling.",
        "options": [
            {
                "id": "barbecue_roll",
                "label": "Initiate Passive Thermal Control (PTC 'barbecue roll') at 3 revolutions per hour to distribute solar thermal flux."
            },
            {
                "id": "jettison_coolant",
                "label": "Jettison the hot coolant directly into space and run dry cooling fans."
            },
            {
                "id": "full_retro_burn",
                "label": "Fire main orbital insertion engine at 100% thrust to accelerate out of sunlight."
            }
        ],
        "correctAnswer": "barbecue_roll",
        "explanation": "During Apollo and modern missions, spacecraft employ 'Passive Thermal Control' (PTC), colloquially known as the barbecue roll. By slowly spinning the spacecraft along its longitudinal axis, solar heating is evenly distributed across all sides, preventing extreme thermal differentials (+120°C on sun-side, -150°C on shadow-side) and letting radiators radiate heat into deep space. Jettisoning closed-loop coolant is irreversible and causes total electronics burnout.",
        "effectsOnSuccess": {
            "oxygen": 0,
            "power": 0,
            "fuel": -1,
            "temperature": -12,
            "pressure": 0,
            "communication": 0,
            "navigation": 0,
            "missionHealth": 10,
            "score": 150,
            "xp": 150,
            "missionRisk": -15,
            "statusMessage": "PTC roll established at 3 RPH. Core temperature stabilized at nominal 21.4°C."
        },
        "effectsOnFailure": {
            "oxygen": 0,
            "power": -15,
            "fuel": -10,
            "temperature": 15,
            "pressure": 0,
            "communication": -10,
            "navigation": -5,
            "missionHealth": -20,
            "score": -40,
            "xp": 25,
            "missionRisk": 25,
            "statusMessage": "Thermal limits exceeded! Secondary guidance computers throttled due to overheating."
        }
    }
}
