
export const CLIENT_FALLBACK_EARTH = [
  {
    identifier: "20240315003633",
    caption: "Earth observed by NASA's Earth Polychromatic Imaging Camera (EPIC) aboard the DSCOVR satellite at Lagrange Point 1 (1.5 million km away).",
    date: "2024-03-15",
    image_url: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1200&auto=format&fit=crop",
    source: "NASA DSCOVR / EPIC Instrument (L1 Orbit)",
    is_fallback: true,
    scientific_context: "EPIC captures 10 narrow-band spectral channels from ultraviolet to near-infrared to measure global ozone, aerosol levels, cloud heights, and planetary vegetation indices."
  }
];

export const CLIENT_FALLBACK_MOON = [
  {
    id: "shackleton-crater",
    title: "Shackleton Crater — Lunar South Pole",
    date: "2023-09-12",
    description: "Permanently shadowed regions (PSRs) at the rim of Shackleton Crater maintain temperatures below 40 Kelvin (-233°C). NASA's Lunar Reconnaissance Orbiter (LRO) Diviner Lunar Radiometer confirms anomalous dielectric constants consistent with subsurface volatile water ice reserves.",
    image_url: "https://images.unsplash.com/photo-1522030299830-16b8d3d049fe?q=80&w=1200&auto=format&fit=crop",
    source: "NASA Lunar Reconnaissance Orbiter (LRO) / Diviner Instrument",
    is_fallback: true,
    scientific_context: "Water ice can be electrolyzed into hydrogen and oxygen to manufacture propellant for deep space exploration and provide life support water for the Artemis base camp."
  }
];

export const CLIENT_FALLBACK_MARS = [
  {
    title: "Jezero Crater Delta Ancient Lakebed Sediments",
    rover: "Perseverance",
    date: "2024-02-05",
    description: "Perseverance rover sampled fine-grained mudstones containing high proportions of smectite clay minerals and carbonate rocks formed in a warm lacustrine environment 3.5 billion years ago, ideal for biosignature preservation.",
    image_url: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1200&auto=format&fit=crop",
    source: "NASA Mars 2020 Perseverance Science Archive",
    is_fallback: true,
    scientific_context: "Samples sealed in titanium tubes for future retrieval by the NASA/ESA Mars Sample Return campaign."
  }
];

export const CLIENT_FALLBACK_SPACE_WEATHER = [
  {
    flrID: "2024-03-23T01:33:00-FLR-001",
    classType: "X1.1",
    sourceLocation: "N24E48 (Active Region AR3615)",
    beginTime: "2024-03-23T01:15Z",
    peakTime: "2024-03-23T01:33Z",
    endTime: "2024-03-23T01:52Z",
    source: "NASA Space Weather Database Of Notifications, Knowledge, Information (DONKI) / SDO AIA",
    is_fallback: true,
    scientific_context: "Major X-class solar flare induced strong R3 High Frequency radio blackouts on the sunlit side of Earth and prompted astronaut shelter protocols on cislunar simulated trajectories."
  }
];
