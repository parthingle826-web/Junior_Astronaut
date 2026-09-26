export const TRAINING_MODULES = [
  {
    id: "module-science",
    title: "1. Space Science Fundamentals",
    badge: "Orbital Dynamics",
    description: "Understand orbital mechanics, vacuum environments, and the physics of free-fall.",
    lessons: [
      {
        title: "Orbital Free-Fall vs. Zero Gravity",
        content: "Objects in orbit are not outside of Earth's gravity. In Low Earth Orbit (400 km altitude), Earth's gravity is still about 89% as strong as on the surface! Spacecraft stay in orbit because they travel horizontally at ~28,000 km/h, constantly 'falling around' the curve of the Earth. This state of perpetual falling is called microgravity."
      },
      {
        title: "The Hard Vacuum of Space",
        content: "Space has no atmosphere to carry sound or provide atmospheric pressure. Outside a pressurized habitat, boiling temperatures of liquids drop dramatically due to vacuum, requiring pressurized spacesuits to maintain at least 30 kPa of pressure around the astronaut's body."
      }
    ],
    quiz: {
      question: "Why do astronauts float aboard the International Space Station?",
      options: [
        { id: "a", text: "Because Earth has zero gravity once you leave the atmosphere" },
        { id: "b", text: "Because the station is in perpetual free-fall around Earth at orbital velocity" },
        { id: "c", text: "Because magnetic repulsion coils in the station counteract gravity" }
      ],
      correctAnswer: "b",
      explanation: "Astronauts float because both they and the spacecraft are in continuous free-fall toward Earth at high horizontal velocity (~7.6 km/s), creating the sensation of weightlessness (microgravity)."
    }
  },
  {
    id: "module-survival",
    title: "2. Astronaut Survival & Physiology",
    badge: "Life Support",
    description: "Learn how the human body survives cosmic radiation, bone density loss, and closed-loop life support.",
    lessons: [
      {
        title: "Closed-Loop Water & Air Recycling",
        content: "Deep space missions cannot rely on resupply. NASA's Environmental Control and Life Support System (ECLSS) recovers over 98% of all water from astronaut sweat, respiration, and urine using vacuum distillation and catalytic oxidation."
      },
      {
        title: "Deep Space Radiation Hazards",
        content: "Beyond the protective shield of Earth's magnetosphere, astronauts face Galactic Cosmic Rays (GCRs) and Solar Particle Events (SPEs). Water tanks and hydrogen-rich polyethylene polymers are positioned around crew sleeping quarters to absorb penetrating energetic protons."
      }
    ],
    quiz: {
      question: "What is the most effective material for shielding astronauts from high-energy solar proton events in deep space?",
      options: [
        { id: "a", text: "Lead plating, because of its extreme heavy metal density" },
        { id: "b", text: "Hydrogen-rich compounds like water and polyethylene polymers" },
        { id: "c", text: "Thin copper foil sheets grounded to the spacecraft hull" }
      ],
      correctAnswer: "b",
      explanation: "High-energy cosmic protons fragment heavy lead atoms into dangerous secondary neutron radiation. Light atoms like hydrogen (present in high density in water H₂O and polymers) efficiently absorb protons without generating deadly secondary radiation."
    }
  },
  {
    id: "module-systems",
    title: "3. Spacecraft Systems & Power",
    badge: "Systems Expert",
    description: "Master primary avionics, solar photovoltaic arrays, and reaction control thrusters.",
    lessons: [
      {
        title: "Electrical Power Architecture",
        content: "Solar panels convert sunlight to direct current (DC) electricity to recharge lithium-ion batteries. In lunar shadow (eclipse), battery conservation is critical: non-essential avionics and science payloads are powered down to sustain life support heaters."
      },
      {
        title: "Attitude Control & RCS",
        content: "Spacecraft use Reaction Control System (RCS) hypergolic thrusters and control moment gyroscopes (CMGs) to rotate in three axes: Pitch, Roll, and Yaw without relying on aerodynamic rudders."
      }
    ],
    quiz: {
      question: "During a 45-minute lunar eclipse pass in shadow, what is the primary protocol for spacecraft electrical management?",
      options: [
        { id: "a", text: "Turn on high-power exterior floodlights to search for landmarks" },
        { id: "b", text: "Shed non-essential secondary loads and rely on primary Li-ion battery banks" },
        { id: "c", text: "Fire the main chemical engine continuously to generate alternator electricity" }
      ],
      correctAnswer: "b",
      explanation: "Without sunlight falling on solar arrays, the spacecraft relies exclusively on battery reserves. Non-essential experiments and secondary telemetry must be throttled to prioritize ECLSS heaters and guidance navigation computers."
    }
  },
  {
    id: "module-decisions",
    title: "4. Mission Decision Making & Triage",
    badge: "Flight Commander",
    description: "Practice the NASA decision tree: Fly, Navigate, Communicate, and Systematic Fault Isolation.",
    lessons: [
      {
        title: "The Golden Rule: Aviate, Navigate, Communicate",
        content: "When an alarm blares in space: First, stabilize the spacecraft's life and trajectory (Aviate). Second, confirm your orbital position and hazards (Navigate). Third, establish communication with Mission Control on Earth (Communicate). Never rush to flip switches without consulting procedural checklists."
      },
      {
        title: "Root Cause Verification",
        content: "Sensors can fail or glitch due to radiation. Always cross-check redundant sensors (e.g. Tank 1 pressure vs Tank 2 pressure vs manifold flow rate) before venting or isolating a critical system."
      }
    ],
    quiz: {
      question: "If an unexpected pressure warning sounds during orbital transfer, what is the immediate first step for the crew?",
      options: [
        { id: "a", text: "Immediately vent all cabin atmosphere into space" },
        { id: "b", text: "Don spacesuit visors, confirm physical gauge telemetry against secondary sensors, and run the isolation checklist" },
        { id: "c", text: "Hit the master abort lever and disconnect all computer batteries" }
      ],
      correctAnswer: "b",
      explanation: "Securing visors guarantees individual crew oxygen independently of cabin pressure. Cross-verifying redundant sensor channels confirms whether the leak is physical or a sensor fault before executing procedural isolation steps."
    }
  }
];
