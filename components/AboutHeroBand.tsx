'use client';
import { useEffect, useRef } from 'react';

const KEYWORDS = [
  { text: 'Teacher Education', size: 2.2 },
  { text: 'Education Technology', size: 2.0 },
  { text: 'Instructional Design', size: 2.3 },
  { text: 'TPACK by Design', size: 2.1 },
  { text: 'Universal Design for Learning', size: 1.6 },
  { text: 'Maritime English', size: 2.0 },
  { text: 'Corporate Training & Communication', size: 1.5 },
  { text: 'Project Management', size: 1.9 },
  { text: 'Blended Learning', size: 1.7 },
  { text: 'iMASTER', size: 1.8 },
  { text: 'DigiMar', size: 1.7 },
  { text: 'Finland · Kenya', size: 1.6 },
  { text: 'Curriculum Design', size: 1.6 },
  { text: 'Mixed Methods', size: 1.5 },
  { text: 'PhD Researcher', size: 1.8 },
  { text: 'STCW', size: 2.0 },
  { text: 'SMCP', size: 1.9 },
  { text: 'Data Analytics', size: 1.7 },
  { text: 'Multimedia Learning', size: 1.6 },
  { text: 'DBR', size: 1.8 },
];

type Keyword = {
  text: string;
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  opacity: number;
  targetOpacity: number;
  opacitySpeed: number;
  color: string;
};

const COLORS = [
  'rgba(96,165,250,',    // electric blue
  'rgba(45,212,191,',    // teal
  'rgba(167,139,250,',   // soft purple
  'rgba(248,255,255,',   // near white
  'rgba(125,211,252,',   // sky blue
  'rgba(94,234,212,',    // mint
  'rgba(196,181,253,',   // lavender
  'rgba(147,197,253,',   // pale blue
];

export default function AboutHeroBand() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);
  const keywordsRef = useRef<Keyword[]>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      canvas.width = canvas.offsetWidth * window.devicePixelRatio;
      canvas.height = canvas.offsetHeight * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
      initKeywords();
    };

    function initKeywords() {
      const w = canvas!.offsetWidth;
      const h = canvas!.offsetHeight;
      keywordsRef.current = KEYWORDS.map((kw) => ({
        text: kw.text,
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.35,
        vy: (Math.random() - 0.5) * 0.35,
        size: kw.size,
        opacity: Math.random() * 0.5 + 0.2,
        targetOpacity: Math.random() * 0.6 + 0.25,
        opacitySpeed: Math.random() * 0.004 + 0.002,
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
      }));
    }

    function draw() {
      const w = canvas!.offsetWidth;
      const h = canvas!.offsetHeight;
      ctx!.clearRect(0, 0, w, h);

      keywordsRef.current.forEach((kw) => {
        // Move
        kw.x += kw.vx;
        kw.y += kw.vy;

        // Bounce off edges with padding
        const pad = 80;
        if (kw.x < pad || kw.x > w - pad) kw.vx *= -1;
        if (kw.y < 16 || kw.y > h - 16) kw.vy *= -1;

        // Pulse opacity
        if (kw.opacity < kw.targetOpacity) {
          kw.opacity = Math.min(kw.opacity + kw.opacitySpeed, kw.targetOpacity);
        } else {
          kw.opacity = Math.max(kw.opacity - kw.opacitySpeed, 0.12);
          if (kw.opacity <= 0.12) kw.targetOpacity = Math.random() * 0.6 + 0.25;
        }

        // Draw text
        const fontSize = kw.size * 13;
        ctx!.font = `${kw.opacity > 0.45 ? '600' : '400'} ${fontSize}px Inter, sans-serif`;
        ctx!.fillStyle = `${kw.color}${kw.opacity})`;
        ctx!.fillText(kw.text, kw.x, kw.y);
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
      {/* Animated gradient background */}
      <div className="absolute inset-0 bg-gradient-to-r from-navy-900 via-electric-500/10 to-teal-500/10 animate-gradient" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-navy-900/20 to-navy-900" />

      {/* Floating keyword canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        style={{ mixBlendMode: 'screen' }}
      />

      {/* Centre label */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="text-center">
          <p className="text-xs font-medium text-electric-400/60 uppercase tracking-[0.3em]">
            Research · Education · Innovation
          </p>
        </div>
      </div>
    </div>
  );
}
