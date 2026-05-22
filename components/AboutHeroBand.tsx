'use client';
import { useEffect, useRef } from 'react';

// ── STATIC keywords — core identity, fixed positions ─────────────────────────
// align: 'left' | 'center' | 'right'
const STATIC_KEYWORDS = [
  { text: 'Instructional Design', x: 0.02, y: 0.52, align: 'left'   }, // Far left, middle
  { text: 'Teacher Education',    x: 0.25, y: 0.18, align: 'center' }, // Left-center, top
  { text: 'Doctoral Researcher',  x: 0.50, y: 0.52, align: 'center' }, // Center, middle
  { text: 'Maritime English',     x: 0.75, y: 0.86, align: 'center' }, // Right-center, bottom
  { text: 'Project Management',   x: 0.98, y: 0.52, align: 'right'  }, // Far right, middle
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
      // Keep words well inside — use 20%–80% of width, 15%–85% of height
      driftRef.current = DYNAMIC_KEYWORDS.map((text) => ({
        text,
        x: w * 0.20 + Math.random() * w * 0.55,
        y: h * 0.15 + Math.random() * h * 0.70,
        vx: (Math.random() - 0.5) * 0.28,
        vy: (Math.random() - 0.5) * 0.28,
        fontSize: Math.random() * 4 + 16,
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

        // Measure text width so long phrases bounce before clipping
        ctx!.font = `400 ${kw.fontSize}px Inter, sans-serif`;
        const textW = ctx!.measureText(kw.text).width;
        const leftBound  = w * 0.12;
        const rightBound = w * 0.88 - textW;
        const topBound   = h * 0.12;
        const botBound   = h * 0.88;

        if (kw.x < leftBound)  { kw.x = leftBound;  kw.vx = Math.abs(kw.vx); }
        if (kw.x > rightBound) { kw.x = rightBound; kw.vx = -Math.abs(kw.vx); }
        if (kw.y < topBound)   { kw.y = topBound;   kw.vy = Math.abs(kw.vy); }
        if (kw.y > botBound)   { kw.y = botBound;   kw.vy = -Math.abs(kw.vy); }

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
        ctx!.font = `600 20px Inter, sans-serif`;
        ctx!.textAlign = kw.align as CanvasTextAlign;
        ctx!.fillStyle = 'rgba(248,255,255,0.78)';
        ctx!.fillText(kw.text, x, y);

        // Subtle teal underline accent
        const metrics = ctx!.measureText(kw.text);
        let lineX = x;
        if (kw.align === 'center') lineX = x - metrics.width / 2;
        if (kw.align === 'right')  lineX = x - metrics.width;
        ctx!.beginPath();
        ctx!.moveTo(lineX, y + 4);
        ctx!.lineTo(lineX + metrics.width, y + 4);
        ctx!.strokeStyle = 'rgba(45,212,191,0.40)';
        ctx!.lineWidth = 1.5;
        ctx!.stroke();

        // Reset alignment for dynamic words
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
