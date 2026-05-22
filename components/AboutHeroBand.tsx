'use client';
import { useEffect, useRef } from 'react';

// ── STATIC keywords — core identity, fixed positions ─────────────────────────
const STATIC_KEYWORDS = [
  { text: 'Instructional Design', x: 0.12, y: 0.28 },
  { text: 'Teacher Education',    x: 0.38, y: 0.55 },
  { text: 'Maritime English',     x: 0.62, y: 0.30 },
  { text: 'Project Management',   x: 0.82, y: 0.58 },
  { text: 'PhD Researcher',       x: 0.50, y: 0.20 },
];

// ── DYNAMIC keywords — methods & frameworks, drift around ────────────────────
const DYNAMIC_KEYWORDS = [
  'TPACK by Design',
  'Universal Design for Learning',
  'Blended Learning',
  'Curriculum Design',
  'Mixed Methods',
  'Data Analytics',
  'Multimedia Learning',
  'DBR',
  'STCW',
  'SMCP',
  'Education Technology',
  'Corporate Training & Communication',
  'Finland · Kenya',
];

const DYNAMIC_COLORS = [
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
  x: number;
  y: number;
  vx: number;
  vy: number;
  fontSize: number;
  opacity: number;
  targetOpacity: number;
  opacitySpeed: number;
  color: string;
};

export default function AboutHeroBand() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);
  const driftRef = useRef<DriftWord[]>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      canvas.width = canvas.offsetWidth * window.devicePixelRatio;
      canvas.height = canvas.offsetHeight * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
      initDrift();
    };

    function initDrift() {
      const w = canvas!.offsetWidth;
      const h = canvas!.offsetHeight;
      driftRef.current = DYNAMIC_KEYWORDS.map((text) => ({
        text,
        x: Math.random() * (w - 160) + 80,
        y: Math.random() * (h - 24) + 16,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        fontSize: Math.random() * 4 + 11,
        opacity: Math.random() * 0.35 + 0.15,
        targetOpacity: Math.random() * 0.45 + 0.20,
        opacitySpeed: Math.random() * 0.003 + 0.001,
        color: DYNAMIC_COLORS[Math.floor(Math.random() * DYNAMIC_COLORS.length)],
      }));
    }

    function draw() {
      const w = canvas!.offsetWidth;
      const h = canvas!.offsetHeight;
      ctx!.clearRect(0, 0, w, h);

      // ── Draw dynamic (drifting) words ──────────────────────────────────────
      driftRef.current.forEach((kw) => {
        kw.x += kw.vx;
        kw.y += kw.vy;

        const pad = 90;
        if (kw.x < pad || kw.x > w - pad) kw.vx *= -1;
        if (kw.y < 16  || kw.y > h - 16)  kw.vy *= -1;

        // Pulse opacity
        if (kw.opacity < kw.targetOpacity) {
          kw.opacity = Math.min(kw.opacity + kw.opacitySpeed, kw.targetOpacity);
        } else {
          kw.opacity = Math.max(kw.opacity - kw.opacitySpeed, 0.08);
          if (kw.opacity <= 0.08) kw.targetOpacity = Math.random() * 0.45 + 0.20;
        }

        ctx!.font = `400 ${kw.fontSize}px Inter, sans-serif`;
        ctx!.fillStyle = `${kw.color}${kw.opacity})`;
        ctx!.fillText(kw.text, kw.x, kw.y);
      });

      // ── Draw static (anchored) words ───────────────────────────────────────
      STATIC_KEYWORDS.forEach((kw) => {
        const x = kw.x * w;
        const y = kw.y * h;
        ctx!.font = `600 16px Inter, sans-serif`;
        ctx!.fillStyle = 'rgba(248,255,255,0.72)';
        ctx!.fillText(kw.text, x, y);

        // Subtle underline accent
        const metrics = ctx!.measureText(kw.text);
        ctx!.beginPath();
        ctx!.moveTo(x, y + 4);
        ctx!.lineTo(x + metrics.width, y + 4);
        ctx!.strokeStyle = 'rgba(45,212,191,0.35)';
        ctx!.lineWidth = 1.5;
        ctx!.stroke();
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
      {/* Gradient background */}
      <div className="absolute inset-0 bg-gradient-to-r from-navy-900 via-electric-500/10 to-teal-500/10" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-navy-900/10 to-navy-900" />

      {/* Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        style={{ mixBlendMode: 'screen' }}
      />

      {/* Subtle centre label */}
      <div className="absolute inset-0 flex items-end justify-center pb-3 pointer-events-none">
        <p className="text-xs font-medium text-electric-400/40 uppercase tracking-[0.3em]">
          Research · Education · Innovation
        </p>
      </div>
    </div>
  );
}
