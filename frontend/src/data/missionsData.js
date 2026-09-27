
export const DEFAULT_SCENARIOS = [
  {
    id: "solar-radiation",
    title: "Solar Radiation Storm Detected",
    category: "Space Weather",
    severity: "critical",
    description: "The Deep Space Climate Observatory (DSCOVR) and spacecraft magnetometers detect a Class X-2.1 coronal mass ejection (CME) heading directly toward your cislunar trajectory. Proton flux exceeds 100 MeV threshold. Secondary radiation shielding must be configured before radiation storm onset in 18 minutes.",
    options: [
      {
        id: "reorient_and_shelter",
        label: "Reorient spacecraft to point service module engine bell toward the Sun & retreat to water-wall radiation storm shelter."
      },
      {
        id: "dump_power",
        label: "Shut down life support generators to divert all electrical power to magnetic deflector coils."
      },
      {
        id: "eva_inspection",
        label: "Perform an emergency Extravehicular Activity (EVA) spacewalk to attach manual lead shielding blankets to the hatch."
      }
    ],
    correctAnswer: "reorient_and_shelter",
    explanation: "NASA Artemis radiation protocol dictates using the dense mass of the service module and propulsion system as a physical cosmic shield against solar energetic particles (SEPs), while crew gathers in the central pressurized core surrounded by onboard water reserves (water is rich in hydrogen atoms, making it the most effective radiation barrier in deep space).",
    effectsOnSuccess: {
      oxygen: 0, power: -5, fuel: -2, temperature: 1, pressure: 0, communication: -5, navigation: 0, missionHealth: 0, score: 150, xp: 150, missionRisk: -15,
      statusMessage: "Shielding deployed successfully. Crew received zero excess ionizing dosage. CME peak passed."
    },
    effectsOnFailure: {
      oxygen: -5, power: -15, fuel: -5, temperature: 4, pressure: 0, communication: -25, navigation: -10, missionHealth: -25, score: -50, xp: 30, missionRisk: 25,
      statusMessage: "DANGER: Excessive radiation penetrated habitat modules. Avionics sensors glitched and avionics temperature rose."
    }
  },
  {
    id: "comm-failure",
    title: "Deep Space Network Signal Loss",
    category: "Communications",
    severity: "high",
    description: "Telemetry link with Goldstone Ground Station dropped to 0 kbps while passing beyond High Earth Orbit. The primary high-gain parabolic antenna gimbal is stuck at azimuth +42.1°, unable to lock onto Earth. Mission Control telemetry stream is offline.",
    options: [
      {
        id: "switch_omni_backup",
        label: "Switch to omnidirectional S-band transponders and align craft using star-tracker backup attitude control."
      },
      {
        id: "max_amplifier",
        label: "Increase high-gain transmitter wattage to 500% to force the signal through the dead zone."
      },
      {
        id: "reboot_avionics",
        label: "Initiate a cold reboot of the central flight computer while in open trajectory."
      }
    ],
    correctAnswer: "switch_omni_backup",
    explanation: "Omnidirectional S-band antennas do not require precise mechanical pointing toward Earth. While data transmission bandwidth is lower (voice and telemetry only, no 4K video), switching to omni restores instantaneous contact with NASA's Deep Space Network (DSN) Madrid and Canberra stations.",
    effectsOnSuccess: {
      oxygen: 0, power: -2, fuel: 0, temperature: 0, pressure: 0, communication: 20, navigation: 5, missionHealth: 0, score: 150, xp: 150, missionRisk: -10,
      statusMessage: "Telemetry restored via Madrid DSN 70m antenna. S-band carrier lock nominal."
    },
    effectsOnFailure: {
      oxygen: 0, power: -20, fuel: -5, temperature: 2, pressure: 0, communication: -40, navigation: -20, missionHealth: -15, score: -40, xp: 30, missionRisk: 20,
      statusMessage: "Amplifier thermal surge detected! High-gain electronics tripped. Mission Control is blind to your trajectory."
    }
  },
  {
    id: "oxygen-leak",
    title: "Cabin Oxygen Pressure Drop",
    category: "Life Support (ECLSS)",
    severity: "critical",
    description: "Environmental Control & Life Support System (ECLSS) sounds a klaxon: cabin atmosphere pressure is declining at 0.35 kPa per minute. Primary Oxygen Tank 2 sensor registers a pressure differential, indicating a micrometeoroid puncture in the secondary feed manifold.",
    options: [
      {
        id: "isolate_manifold",
        label: "Seal helmet visors, isolate the secondary manifold via crossfeed valve 4B, and activate emergency O2 reserve."
      },
      {
        id: "increase_flow",
        label: "Open main oxygen valves to maximum output to overpower the leak and maintain cabin pressure."
      },
      {
        id: "vent_nitrogen",
        label: "Vent all nitrogen buffer gas into space to reduce total internal atmospheric friction."
      }
    ],
    correctAnswer: "isolate_manifold",
    explanation: "Standard human spaceflight emergency protocol: crew immediately dons pressure suits / locks visors to secure individual air supply, then systematically closes crossfeed valves to isolate the ruptured manifold segment before switching to the isolated emergency reserve tank.",
    effectsOnSuccess: {
      oxygen: 10, power: -3, fuel: 0, temperature: 0, pressure: 10, communication: 0, navigation: 0, missionHealth: 5, score: 150, xp: 150, missionRisk: -15,
      statusMessage: "Secondary manifold 4B isolated. Pressure stabilized at 101.3 kPa. Reserve supply holding."
    },
    effectsOnFailure: {
      oxygen: -35, power: -10, fuel: 0, temperature: -3, pressure: -25, communication: 0, navigation: 0, missionHealth: -30, score: -60, xp: 25, missionRisk: 35,
      statusMessage: "CRITICAL WARNING: 35% of oxygen supply vented to space! Cabin pressure unstable."
    }
  },
  {
    id: "thermal-spike",
    title: "Radiator Loop Thermal Runaway",
    category: "Thermodynamics",
    severity: "high",
    description: "Spacecraft freon-loop heat exchanger has accumulated excessive heat from solar exposure while in lunar orbital insertion trajectory. Internal avionics bay temperature is rising toward the critical 38°C ceiling.",
    options: [
      {
        id: "barbecue_roll",
        label: "Initiate Passive Thermal Control (PTC 'barbecue roll') at 3 revolutions per hour to distribute solar thermal flux."
      },
      {
        id: "jettison_coolant",
        label: "Jettison the hot coolant directly into space and run dry cooling fans."
      },
      {
        id: "full_retro_burn",
        label: "Fire main orbital insertion engine at 100% thrust to accelerate out of sunlight."
      }
    ],
    correctAnswer: "barbecue_roll",
    explanation: "During Apollo and modern missions, spacecraft employ 'Passive Thermal Control' (PTC), colloquially known as the barbecue roll. By slowly spinning the spacecraft along its longitudinal axis, solar heating is evenly distributed across all sides, preventing extreme thermal differentials.",
    effectsOnSuccess: {
      oxygen: 0, power: 0, fuel: -1, temperature: -12, pressure: 0, communication: 0, navigation: 0, missionHealth: 10, score: 150, xp: 150, missionRisk: -15,
      statusMessage: "PTC roll established at 3 RPH. Core temperature stabilized at nominal 21.4°C."
    },
    effectsOnFailure: {
      oxygen: 0, power: -15, fuel: -10, temperature: 15, pressure: 0, communication: -10, navigation: -5, missionHealth: -20, score: -40, xp: 25, missionRisk: 25,
      statusMessage: "Thermal limits exceeded! Secondary guidance computers throttled due to overheating."
    }
  }
];

export const DEFAULT_LUNAR_CHALLENGES = [
  {
    id: "crater-id",
    title: "1. Crater Morphological Identification",
    description: "Examine the orbital radar profile of the landing site rim. Notice the central peak, terraced inner walls, and surrounding radial ejecta blanket. What type of impact feature are we observing?",
    options: [
      { id: "complex", label: "Complex Impact Crater (diameter > 15-20 km with central rebound peak)" },
      { id: "simple", label: "Simple Bowl Crater (smooth concave floor without terraces)" },
      { id: "caldera", label: "Volcanic Caldera Collapse Trench" }
    ],
    correctAnswer: "complex",
    explanation: "On the Moon, impact craters larger than ~15 km transition from simple bowl shapes to complex craters, characterized by a central uplift peak formed by hydrodynamic crustal rebound and terraced rim walls.",
    xpReward: 50
  },
  {
    id: "site-safety",
    title: "2. Landing Site Safety Comparison",
    description: "Mission Control provides slope gradients and boulder distribution data for three candidate landing zones near Malapert Mountain.",
    options: [
      { id: "zone_a", label: "Zone Alpha: 4° slope gradient, boulder frequency < 1.2 per 100m², 88% direct line-of-sight to Earth" },
      { id: "zone_b", label: "Zone Beta: 19° slope gradient, shadowed crater floor, boulder frequency 14.5 per 100m²" },
      { id: "zone_c", label: "Zone Gamma: 12° slope gradient, crater rim edge with intermittent DSN occultation" }
    ],
    correctAnswer: "zone_a",
    explanation: "Human lunar landers require landing sites with slopes under 7-10° to prevent tipping, low boulder density to avoid puncturing landing pads, and direct line-of-sight to Earth for uninterrupted telemetry.",
    xpReward: 50
  },
  {
    id: "terrain-analysis",
    title: "3. Regolith & Terrain Analysis",
    description: "The Lunar Rover spectrometer analyzes the top 5 cm of surface soil. It detects high concentrations of anorthosite rock rich in calcium-aluminum silicates. What does this indicate?",
    options: [
      { id: "highlands", label: "Ancient Lunar Highlands crust formed during early magma ocean crystallization" },
      { id: "mare_basalt", label: "Recent basaltic lava flow from young lunar volcanic vents" },
      { id: "meteorite_remnant", label: "Pure nickel-iron fragments from a shattered metallic asteroid" }
    ],
    correctAnswer: "highlands",
    explanation: "Anorthosite is the primary constituent of the bright lunar highlands. As the Moon's primordial magma ocean cooled 4.4 billion years ago, low-density plagioclase feldspar floated to the surface, creating the original lunar crust.",
    xpReward: 50
  },
  {
    id: "temperature-graph",
    title: "4. Thermal Gradient Reading",
    description: "Radiometer telemetry records +115°C on the illuminated rim of Shackleton Crater, while the crater interior drops to -238°C (35 Kelvin) just 300 meters away. Why is this extreme temperature differential possible?",
    options: [
      { id: "no_atmosphere", label: "The Moon lacks an atmosphere to conduct or convect heat, and low axial tilt (1.54°) permanently blocks sunlight from reaching crater floors" },
      { id: "nuclear_cooling", label: "Underground cryogenic geothermal geysers cool the crater floor" },
      { id: "magnetic_lens", label: "The lunar magnetic field deflects thermal infrared radiation away from craters" }
    ],
    correctAnswer: "no_atmosphere",
    explanation: "Without an atmosphere, thermal transfer occurs purely through direct radiative exchange. The Moon's tiny axial tilt of 1.54° means sunlight strikes the poles at glancing angles, leaving deep craters in eternal shadow at temperatures colder than Pluto.",
    xpReward: 50
  },
  {
    id: "ice-evidence",
    title: "5. Volatile Water Ice Detection",
    description: "LEND (Lunar Exploration Neutron Detector) records an abrupt dip in epithermal neutron flux over the Cabeus crater basin. What does a suppression of epithermal neutrons signify?",
    options: [
      { id: "hydrogen_ice", label: "High abundance of Hydrogen atoms (confirming subsurface water ice molecules H₂O)" },
      { id: "radioactive_decay", label: "Radioactive Uranium and Thorium deposits emitting gamma radiation" },
      { id: "metallic_iron", label: "Dense deposits of magnetic iron absorbing sensor waves" }
    ],
    correctAnswer: "hydrogen_ice",
    explanation: "Cosmic rays eject neutrons from lunar soil. Because neutrons have approximately the same mass as hydrogen protons, colliding with hydrogen atoms rapidly slows neutrons down from epithermal to thermal energies. A drop in epithermal neutrons is the definitive signature of hydrogen/water.",
    xpReward: 50
  },
  {
    id: "instrument-choice",
    title: "6. Science Instrument Selection",
    description: "You need to determine the subsurface layering and presence of sub-regolith lava tubes up to 50 meters beneath the rover without drilling. Which scientific instrument should you deploy?",
    options: [
      { id: "gpr", label: "Ground-Penetrating Radar (GPR / RIMFAX style high-frequency radar)" },
      { id: "alpha_spectrometer", label: "Alpha Particle X-Ray Spectrometer (APXS)" },
      { id: "wind_anemometer", label: "Acoustic Surface Wind Anemometer" }
    ],
    correctAnswer: "gpr",
    explanation: "Ground-Penetrating Radar transmits electromagnetic radar pulses deep into the bedrock and measures reflected echoes to construct high-resolution subterranean stratigraphic maps.",
    xpReward: 50
  }
];
