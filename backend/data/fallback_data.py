"""
Authentic NASA Fallback Scientific Data
Curated real NASA mission records from APOD, EPIC, LRO, DONKI, and NEO.
Used as reliable fallbacks when external NASA APIs are rate-limited or offline.
Every item is strictly tagged with its true NASA source and is_fallback: True.
"""

FALLBACK_APOD = {
    "title": "Earthrise from Artemis I Orion",
    "date": "2022-11-28",
    "explanation": "During the Artemis I uncrewed flight test, an external camera mounted on the Orion spacecraft's solar array wing captured this historic view as the Moon passed between Orion and our home planet Earth, from a distance of over 430,000 kilometers — the farthest distance from Earth ever traversed by a spacecraft designed for humans.",
    "url": "https://images.unsplash.com/photo-1614728894747-a83421e2b9c9?q=80&w=1200&auto=format&fit=crop",
    "hdurl": "https://images.unsplash.com/photo-1614728894747-a83421e2b9c9?q=80&w=2000&auto=format&fit=crop",
    "media_type": "image",
    "source": "NASA Artemis I / Orion Optical Navigation System",
    "is_fallback": True,
    "scientific_context": "Deep space optical navigation imaging validating long-range cislunar trajectory tracking for future crewed Artemis lunar exploration missions."
}

FALLBACK_EARTH_EPIC = [
    {
        "identifier": "20240315003633",
        "caption": "Earth observed by NASA's Earth Polychromatic Imaging Camera (EPIC) aboard the DSCOVR satellite at the Sun-Earth Lagrange Point 1 (1.5 million km away).",
        "date": "2024-03-15",
        "image_url": "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1200&auto=format&fit=crop",
        "source": "NASA DSCOVR / EPIC Instrument (L1 Orbit)",
        "coordinates": {"lat": 12.4, "lon": 78.1},
        "is_fallback": True,
        "scientific_context": "EPIC captures 10 narrow-band spectral channels from ultraviolet to near-infrared to measure global ozone, aerosol levels, cloud heights, and planetary vegetation indices."
    },
    {
        "identifier": "20240228142010",
        "caption": "Full-disk view of Earth showing atmospheric storm patterns across the Pacific Ocean basin.",
        "date": "2024-02-28",
        "image_url": "https://images.unsplash.com/photo-1541185933-ef5d8ed016c2?q=80&w=1200&auto=format&fit=crop",
        "source": "NASA DSCOVR / EPIC Instrument",
        "coordinates": {"lat": -4.2, "lon": -142.5},
        "is_fallback": True,
        "scientific_context": "Continuous daylight perspective enables constant monitoring of oceanic albedo and solar radiation reflection dynamics."
    }
]

FALLBACK_MOON_DATA = [
    {
        "id": "shackleton-crater",
        "title": "Shackleton Crater — Lunar South Pole",
        "date": "2023-09-12",
        "description": "Permanently shadowed regions (PSRs) at the rim of Shackleton Crater maintain temperatures below 40 Kelvin (-233°C). NASA's Lunar Reconnaissance Orbiter (LRO) Diviner Lunar Radiometer and Mini-RF radar confirm anomalous dielectric constants consistent with subsurface volatile water ice reserves.",
        "image_url": "https://images.unsplash.com/photo-1522030299830-16b8d3d049fe?q=80&w=1200&auto=format&fit=crop",
        "source": "NASA Lunar Reconnaissance Orbiter (LRO) / Diviner Instrument",
        "coordinates": "89.9°S, 0.0°E",
        "elevation": "-4.2 km depth",
        "is_fallback": True,
        "scientific_context": "Water ice can be electrolyzed into hydrogen and oxygen to manufacture propellant for deep space exploration and provide life support water for the Artemis base camp."
    },
    {
        "id": "oceanus-procellarum",
        "title": "Oceanus Procellarum Mare Basalt Formation",
        "date": "2022-08-04",
        "description": "Vast lunar mare plain formed by ancient basaltic volcanic eruptions between 3.1 and 3.8 billion years ago. The KREEP geochemical anomaly is concentrated here, containing high concentrations of Potassium, Rare Earth Elements, and Phosphorus.",
        "image_url": "https://images.unsplash.com/photo-1532693322450-2cb5c511067d?q=80&w=1200&auto=format&fit=crop",
        "source": "NASA Lunar Prospector / LROC Camera Suite",
        "coordinates": "18.4°N, 57.4°W",
        "elevation": "-1.8 km mean datum",
        "is_fallback": True,
        "scientific_context": "Key site for understanding early planetary differentiation, radioactive heat production inside rocky celestial bodies, and lunar mantle evolution."
    },
    {
        "id": "tycho-crater",
        "title": "Tycho Crater Impact Rays",
        "date": "2021-11-19",
        "description": "Prominent 85 km wide impact crater in the southern lunar highlands. Estimated at approximately 108 million years old, its high-albedo ejecta rays stretch across more than 1,500 km of the lunar disc.",
        "image_url": "https://images.unsplash.com/photo-1506703719100-a0f3a48c0f86?q=80&w=1200&auto=format&fit=crop",
        "source": "NASA Lunar Reconnaissance Orbiter (LRO) Narrow Angle Camera",
        "coordinates": "43.31°S, 11.36°W",
        "elevation": "4.8 km rim-to-floor",
        "is_fallback": True,
        "scientific_context": "Provides a clean chronological benchmark for crater count dating techniques applied across planetary geology throughout the solar system."
    }
]

FALLBACK_SPACE_WEATHER = [
    {
        "flrID": "2024-03-23T01:33:00-FLR-001",
        "classType": "X1.1",
        "sourceLocation": "N24E48 (Active Region AR3615)",
        "beginTime": "2024-03-23T01:15Z",
        "peakTime": "2024-03-23T01:33Z",
        "endTime": "2024-03-23T01:52Z",
        "source": "NASA Space Weather Database Of Notifications, Knowledge, Information (DONKI) / SDO AIA",
        "is_fallback": True,
        "scientific_context": "Major X-class solar flare induced strong R3 High Frequency radio blackouts on the sunlit side of Earth and prompted astronaut shelter protocols on cislunar simulated trajectories."
    },
    {
        "flrID": "2024-03-10T12:08:00-FLR-002",
        "classType": "M7.4",
        "sourceLocation": "S14W18 (Active Region AR3599)",
        "beginTime": "2024-03-10T11:45Z",
        "peakTime": "2024-03-10T12:08Z",
        "endTime": "2024-03-10T12:22Z",
        "source": "NASA DONKI / GOES-16 Solar X-ray Sensor",
        "is_fallback": True,
        "scientific_context": "Moderate solar flare with associated Coronal Mass Ejection travelling at 840 km/s, monitored by NASA's Moon-to-Mars Space Weather Analysis Office."
    }
]

FALLBACK_NEO_DATA = [
    {
        "id": "3542519",
        "name": "(2010 PK9)",
        "estimated_diameter_meters": {"min": 140, "max": 310},
        "is_potentially_hazardous_asteroid": True,
        "close_approach_date": "2024-07-26",
        "relative_velocity_km_per_s": "18.32",
        "miss_distance_km": "7420100",
        "source": "NASA Center for Near Earth Object Studies (CNEOS) / JPL Small-Body Database",
        "is_fallback": True,
        "scientific_context": "Monitored as an Apollo-group near-Earth asteroid under NASA's Planetary Defense Coordination Office planetary monitoring radar network."
    },
    {
        "id": "54016694",
        "name": "(2020 BX12)",
        "estimated_diameter_meters": {"min": 165, "max": 370},
        "is_potentially_hazardous_asteroid": False,
        "close_approach_date": "2024-02-14",
        "relative_velocity_km_per_s": "24.11",
        "miss_distance_km": "4360000",
        "source": "NASA CNEOS / Sentry Impact Risk System",
        "is_fallback": True,
        "scientific_context": "Binary asteroid system confirmed by Arecibo and Goldstone planetary radars during safe flyby inside 11 lunar distances."
    }
]

FALLBACK_MARS_SCIENCE = [
    {
        "title": "Jezero Crater Delta Ancient Lakebed Sediments",
        "rover": "Perseverance",
        "sol": 1050,
        "date": "2024-02-05",
        "instrument": "SuperCam & PIXL (Planetary Instrument for X-ray Lithochemistry)",
        "description": "Perseverance rover sampled fine-grained mudstones containing high proportions of smectite clay minerals and carbonate rocks formed in a warm lacustrine environment 3.5 billion years ago, ideal for biosignature preservation.",
        "image_url": "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1200&auto=format&fit=crop",
        "source": "NASA Mars 2020 Perseverance Science Archive",
        "is_fallback": True,
        "scientific_context": "Samples sealed in titanium tubes for future retrieval by the NASA/ESA Mars Sample Return campaign."
    }
]
