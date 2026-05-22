'use client';
import { useEffect, useRef } from 'react';

// ── STATIC anchors — core identity ───────────────────────────────────────────
const STATIC_KEYWORDS = [
  { text: 'Instructional Design', x: 0.02, y: 0.52, align: 'left'   },
  { text: 'Teacher Education',    x: 0.25, y: 0.18, align: 'center' },
  { text: 'Doctoral Researcher',  x: 0.50, y: 0.52, align: 'center' },
  { text: 'Maritime English',     x: 0.75, y: 0.86, align: 'center' },
  { text: 'Project Management',   x: 0.98, y: 0.52, align: 'right'  },
];

// ── DYNAMIC clusters — each word orbits its anchor ───────────────────────────
const CLUSTERS = [
  // Instructional Design (index 0) — Far Left
  { text: 'Blended Learning',        anchorIndex: 0, orbitR: 0.14 },
  { text: 'Learning Analytics',      anchorIndex: 0, orbitR: 0.13 },
  { text: 'Design-Based Research',   anchorIndex: 0, orbitR: 0.16 },

  // Teacher Education (index 1) — Top Left
  { text: 'TPACK by Design',               anchorIndex: 1, orbitR: 0.13 },
  { text: 'Universal Design for Learning', anchorIndex: 1, orbitR: 0.16 },
  { text: 'Mixed Methods',                 anchorIndex: 1, orbitR: 0.12 },

  // Doctoral Researcher (index 2) — Center
  { text: 'Education Technology', anchorIndex: 2, orbitR: 0.13 },
  { text: 'Finland · Kenya',      anchorIndex: 2, orbitR: 0.14 },

  // Maritime English (index 3) — Bottom Right
  { text: 'STCW', anchorIndex: 3, orbitR: 0.10 },
  { text: 'SMCP', anchorIndex: 3, orbitR: 0.10 },

  // Project Management (index 4) — Far Right
  { text: 'Corporate Training & Communication', anchorIndex: 4, orbitR: 0.15 },
  { text: 'Data Analytics',                     anchorIndex: 4, orbitR: 0.12 },
];

const COLORS = [
  'rgba(96,165,250,',    // electric blue
  'rgba(45,212,191,',    // teal
  'rgba(167,139,250,',   // soft purple
  'rgba(125,211,252,',   // sky blue
  'rgba(94,234,212,',    // mint
  'rgba(196,181,253,',   // lavender
  'rgba(147,197,253,',   // pale blue
  'rgba(248,255,255,',   // near white
];

type DriftWord = {
  text: string;
  anchorXRatio: number;
  anchorYRatio: number;
  orbitR: number;
  angle: number;
  angleSpeed: number;
  fontSize: number;
  opacity: number;
  targetOpacity: number;
  opacitySpeed: number;
  color: string;
};

export default function AboutHeroBand() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef   = useRef<number>(0);
  const wordsRef  = useRef<DriftWord[]>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      canvas.width  = canvas.offsetWidth  * window.devicePixelRatio;
      canvas.height = canvas.offsetHeight * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
      init();
    };

    function init() {
      wordsRef.current = CLUSTERS.map((c) => {
        const anchor = STATIC_KEYWORDS[c.anchorIndex];
        return {
          text: c.text,
          anchorXRatio: anchor.x,
          anchorYRatio: anchor.y,
          orbitR: c.orbitR,
          angle: Math.random() * Math.PI * 2,
          angleSpeed: (Math.random() * 0.003 + 0.001) * (Math.random() < 0.5 ? 1 : -1),
          fontSize: Math.random() * 3 + 15,
          opacity: Math.random() * 0.35 + 0.20,
          targetOpacity: Math.random() * 0.50 + 0.25,
          opacitySpeed: Math.random() * 0.003 + 0.001,
          color: COLORS[Math.floor(Math.random() * COLORS.length)],
        };
      });
    }

    function draw() {
      const w = canvas!.offsetWidth;
      const h = canvas!.offsetHeight;
      ctx!.clearRect(0, 0, w, h);

      // ── Dynamic clustered words ─────────────────────────────────────────
      wordsRef.current.forEach((kw) => {
        kw.angle += kw.angleSpeed;

        const ax = kw.anchorXRatio * w;
        const ay = kw.anchorYRatio * h;
        const rx = kw.orbitR * w;
        const ry = kw.orbitR * h * 0.7;

        const x = ax + Math.cos(kw.angle) * rx;
        const y = ay + Math.sin(kw.angle) * ry;

        // Pulse opacity
        if (kw.opacity < kw.targetOpacity) {
          kw.opacity = Math.min(kw.opacity + kw.opacitySpeed, kw.targetOpacity);
        } else {
          kw.opacity = Math.max(kw.opacity - kw.opacitySpeed, 0.10);
          if (kw.opacity <= 0.10) kw.targetOpacity = Math.random() * 0.50 + 0.25;
        }

        ctx!.font = `400 ${kw.fontSize}px Inter, sans-serif`;
        ctx!.textAlign = 'center';
        ctx!.fillStyle = `${kw.color}${kw.opacity})`;
        ctx!.fillText(kw.text, x, y);
      });

      // ── Static anchor words ─────────────────────────────────────────────
      STATIC_KEYWORDS.forEach((kw) => {
        const x = kw.x * w;
        const y = kw.y * h;
        ctx!.font = `600 20px Inter, sans-serif`;
        ctx!.textAlign = kw.align as CanvasTextAlign;
        ctx!.fillStyle = 'rgba(248,255,255,0.82)';
        ctx!.fillText(kw.text, x, y);

        // Teal underline
        const metrics = ctx!.measureText(kw.text);
        let lx = x;
        if (kw.align === 'center') lx = x - metrics.width / 2;
        if (kw.align === 'right')  lx = x - metrics.width;
        ctx!.beginPath();
        ctx!.moveTo(lx, y + 4);
        ctx!.lineTo(lx + metrics.width, y + 4);
        ctx!.strokeStyle = 'rgba(45,212,191,0.45)';
        ctx!.lineWidth = 1.5;
        ctx!.stroke();

        ctx!.textAlign = 'left';
      });

      animRef.current = requestAnimationFrame(draw);
    }

    resize();
    draw();
    window.addEventListener('resize', resize);
    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <div className="relative h-48 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-navy-900 via-electric-500/10 to-teal-500/10" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-navy-900/10 to-navy-900" />
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        style={{ mixBlendMode: 'screen' }}
      />
      <div className="absolute inset-0 flex items-end justify-center pb-3 pointer-events-none">
        <p className="text-xs font-medium text-electric-400/40 uppercase tracking-[0.3em]">
          Research · Education · Innovation
        </p>
      </div>
    </div>
  );
}