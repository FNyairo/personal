// ── Constellation data for per-page star backgrounds ─────────────────────────
// All coordinates normalised 0–1 (mapped to viewport width/height at render).
// r = star dot radius in px; omit to use the default (1.2px).

export type CStar = { x: number; y: number; r?: number };
export type Constellation = { stars: CStar[]; lines: [number, number][] };

// ── Individual constellations ─────────────────────────────────────────────────

/** Orion — the hunter. Left sky, upper half. Universal and immediately readable. */
export const ORION: Constellation = {
  stars: [
    { x: 0.08, y: 0.12, r: 2.0 }, // Betelgeuse (warm giant)
    { x: 0.15, y: 0.08, r: 1.6 }, // Bellatrix
    { x: 0.09, y: 0.19 },          // shoulder connector
    { x: 0.08, y: 0.35 },          // Mintaka  (belt)
    { x: 0.11, y: 0.38 },          // Alnilam  (belt)
    { x: 0.14, y: 0.41 },          // Alnitak  (belt)
    { x: 0.08, y: 0.60 },          // Saiph
    { x: 0.16, y: 0.64, r: 2.2 }, // Rigel (brightest, blue supergiant)
  ],
  lines: [[0,2],[2,1],[0,3],[1,5],[3,4],[4,5],[5,7],[3,6],[6,7]],
};

/** Ursa Major (Big Dipper) — the navigator's star. Upper right. Points to Polaris. */
export const URSA_MAJOR: Constellation = {
  stars: [
    { x: 0.62, y: 0.10 }, // Phecda
    { x: 0.67, y: 0.05 }, // Merak
    { x: 0.72, y: 0.08 }, // Dubhe  (pointer star, brightest)
    { x: 0.68, y: 0.16 }, // Megrez
    { x: 0.74, y: 0.23 }, // Alioth
    { x: 0.78, y: 0.31 }, // Mizar
    { x: 0.83, y: 0.40 }, // Alkaid (handle tip)
  ],
  lines: [[0,1],[1,2],[2,3],[3,0],[2,4],[4,5],[5,6]],
};

/** Cassiopeia — the queen. Upper center. W shape, circumpolar from Finland. */
export const CASSIOPEIA: Constellation = {
  stars: [
    { x: 0.34, y: 0.08 },
    { x: 0.39, y: 0.18 },
    { x: 0.44, y: 0.06 },
    { x: 0.49, y: 0.16 },
    { x: 0.54, y: 0.04 },
  ],
  lines: [[0,1],[1,2],[2,3],[3,4]],
};

/** Leo — the lion. Center sky. Regal; fits research and intellectual achievement. */
export const LEO: Constellation = {
  stars: [
    { x: 0.52, y: 0.50, r: 2.0 }, // Regulus (brightest, blue-white)
    { x: 0.50, y: 0.40 },          // Eta Leonis
    { x: 0.46, y: 0.35 },          // Gamma Leonis (Algieba)
    { x: 0.42, y: 0.38 },          // Zeta Leonis
    { x: 0.40, y: 0.46 },          // Lambda Leonis
    { x: 0.58, y: 0.48 },          // Delta Leonis
    { x: 0.64, y: 0.44, r: 1.6 }, // Beta Leonis (Denebola — tail)
  ],
  lines: [[0,1],[1,2],[2,3],[3,4],[0,5],[5,6]],
};

/** Scorpius — the scorpion. Lower right. Expressive arc with a hooked tail. */
export const SCORPIUS: Constellation = {
  stars: [
    { x: 0.72, y: 0.42, r: 2.0 }, // Antares (fiery red supergiant)
    { x: 0.70, y: 0.35 },
    { x: 0.68, y: 0.30 },
    { x: 0.74, y: 0.50 },
    { x: 0.76, y: 0.58 },
    { x: 0.78, y: 0.66 },
    { x: 0.80, y: 0.74 },
    { x: 0.82, y: 0.80 },
    { x: 0.85, y: 0.76 }, // stinger tip
  ],
  lines: [[2,1],[1,0],[0,3],[3,4],[4,5],[5,6],[6,7],[7,8]],
};

/** Southern Cross (Crux) — lower right corner. Visible from Kenya; symbolic. */
export const SOUTHERN_CROSS: Constellation = {
  stars: [
    { x: 0.88, y: 0.72, r: 1.8 }, // Acrux  (top)
    { x: 0.88, y: 0.92 },          // Gacrux (bottom)
    { x: 0.81, y: 0.82 },          // Mimosa (left)
    { x: 0.95, y: 0.82, r: 1.6 }, // Delta Crucis (right)
    { x: 0.86, y: 0.76 },          // Epsilon Crucis (fifth star)
  ],
  lines: [[0,1],[2,3],[0,4]],
};

/** Perseus — the hero. Upper center-left. Bridges Cassiopeia and the Pleiades. */
export const PERSEUS: Constellation = {
  stars: [
    { x: 0.26, y: 0.06 },
    { x: 0.29, y: 0.13 },
    { x: 0.33, y: 0.10 },
    { x: 0.31, y: 0.20 },
    { x: 0.27, y: 0.25 },
    { x: 0.35, y: 0.28 },
  ],
  lines: [[0,1],[1,2],[1,3],[3,4],[3,5]],
};

/** Gemini — the twins. Upper left-center. Two parallel lines: duality and dialogue. */
export const GEMINI: Constellation = {
  stars: [
    { x: 0.22, y: 0.06, r: 1.8 }, // Castor  (left twin's head)
    { x: 0.28, y: 0.04, r: 1.8 }, // Pollux  (right twin's head, slightly brighter)
    { x: 0.21, y: 0.14 },          // Castor's body
    { x: 0.27, y: 0.13 },          // Pollux's body
    { x: 0.20, y: 0.24 },          // Castor mid
    { x: 0.26, y: 0.22 },          // Pollux mid
    { x: 0.19, y: 0.34 },          // Castor foot
    { x: 0.25, y: 0.32 },          // Pollux foot
  ],
  lines: [[0,2],[2,4],[4,6],[1,3],[3,5],[5,7],[2,3],[4,5]],
};

// ── Ambient fills — scattered stars with no connecting lines ──────────────────

/** 40 ambient stars — rich fill for feature pages */
export const AMBIENT: Constellation = {
  stars: [
    { x: 0.02, y: 0.50 }, { x: 0.04, y: 0.75 }, { x: 0.06, y: 0.88 },
    { x: 0.10, y: 0.72 }, { x: 0.13, y: 0.50 }, { x: 0.17, y: 0.80 },
    { x: 0.18, y: 0.32 }, { x: 0.20, y: 0.55 }, { x: 0.23, y: 0.70 },
    { x: 0.24, y: 0.88 }, { x: 0.30, y: 0.45 }, { x: 0.32, y: 0.62 },
    { x: 0.35, y: 0.80 }, { x: 0.37, y: 0.30 }, { x: 0.40, y: 0.60 },
    { x: 0.42, y: 0.82 }, { x: 0.45, y: 0.22 }, { x: 0.47, y: 0.68 },
    { x: 0.50, y: 0.78 }, { x: 0.52, y: 0.30 }, { x: 0.55, y: 0.62 },
    { x: 0.57, y: 0.88 }, { x: 0.58, y: 0.35 }, { x: 0.60, y: 0.72 },
    { x: 0.62, y: 0.55 }, { x: 0.64, y: 0.82 }, { x: 0.66, y: 0.28 },
    { x: 0.68, y: 0.62 }, { x: 0.70, y: 0.88 }, { x: 0.72, y: 0.18 },
    { x: 0.75, y: 0.55 }, { x: 0.77, y: 0.82 }, { x: 0.80, y: 0.45 },
    { x: 0.82, y: 0.62 }, { x: 0.84, y: 0.18 }, { x: 0.86, y: 0.55 },
    { x: 0.88, y: 0.35 }, { x: 0.92, y: 0.60 }, { x: 0.95, y: 0.20 },
    { x: 0.98, y: 0.48 },
  ],
  lines: [],
};

/** 20 ambient stars — sparser fill for quieter pages */
export const AMBIENT_SPARSE: Constellation = {
  stars: [
    { x: 0.04, y: 0.70 }, { x: 0.10, y: 0.88 }, { x: 0.18, y: 0.55 },
    { x: 0.24, y: 0.78 }, { x: 0.32, y: 0.42 }, { x: 0.38, y: 0.82 },
    { x: 0.45, y: 0.60 }, { x: 0.50, y: 0.88 }, { x: 0.56, y: 0.32 },
    { x: 0.62, y: 0.75 }, { x: 0.68, y: 0.50 }, { x: 0.72, y: 0.85 },
    { x: 0.78, y: 0.28 }, { x: 0.82, y: 0.68 }, { x: 0.86, y: 0.90 },
    { x: 0.90, y: 0.42 }, { x: 0.92, y: 0.14 }, { x: 0.94, y: 0.72 },
    { x: 0.96, y: 0.55 }, { x: 0.99, y: 0.30 },
  ],
  lines: [],
};

// ── Per-page sky presets ──────────────────────────────────────────────────────

/** Home — Orion (universal welcome) + Ursa Major (navigator's star) */
export const HOME_SKY        = [ORION, URSA_MAJOR, AMBIENT];

/** About — Southern Cross (Kenya) + Cassiopeia (Finnish night sky) + Perseus (personal journey) */
export const ABOUT_SKY       = [SOUTHERN_CROSS, CASSIOPEIA, PERSEUS, AMBIENT];

/** Research — Leo (intellectual power) + Gemini (Finland ↔ Kenya duality) */
export const RESEARCH_SKY    = [LEO, GEMINI, AMBIENT];

/** Blog list — Scorpius (passionate writing) + Perseus (storytelling hero) */
export const BLOG_SKY        = [SCORPIUS, PERSEUS, AMBIENT];

/** Blog post — Perseus only; focused, single-story reading experience */
export const BLOG_POST_SKY   = [PERSEUS, AMBIENT_SPARSE];

/** Contact — Cassiopeia's W like a welcoming wave; sparse and open */
export const CONTACT_SKY     = [CASSIOPEIA, AMBIENT_SPARSE];

/** Resume — Orion (presence/stature) + Leo (achievement and leadership) */
export const RESUME_SKY      = [ORION, LEO, AMBIENT];

/** Book a Chat — Ursa Major (navigation/direction) + sparse */
export const BOOK_SKY        = [URSA_MAJOR, AMBIENT_SPARSE];

/** Discussion thread — Gemini (two perspectives in dialogue) */
export const DISCUSS_SKY     = [GEMINI, AMBIENT];
