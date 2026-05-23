'use client';
import { useEffect, useRef } from 'react';
import type { Constellation } from '@/lib/constellations';

interface Props {
  constellations: Constellation[];
  milkyWay?: boolean;
}

// ── Milky Way micro-stars ─────────────────────────────────────────────────────
// Pre-generated with a seeded PRNG so positions are deterministic across
// renders (no flickering from Math.random() in the draw loop).
function seededRng(seed: number) {
  let s = seed;
  return () => {
    s = Math.imul(s, 1664525) + 1013904223 | 0;
    return (s >>> 0) / 0xffffffff;
  };
}

const MW_STARS = (() => {
  const rng = seededRng(42);
  const stars: { bx: number; by: number; opacity: number }[] = [];
  for (let i = 0; i < 300; i++) {
    const bx = rng() * 1.5 - 0.25;           // -0.25→1.25 along band
    const raw = (rng() - 0.5) * 2;            // -1→1 uniform
    const by  = Math.sign(raw) * raw * raw * 0.5; // cubic: dense at centre
    const distFromMid = Math.abs(bx - 0.5);   // 0 = galactic core
    const coreBoost   = Math.max(0, 1 - distFromMid * 1.6);
    const opacity     = Math.min((rng() * 0.16 + 0.10) * (1 + coreBoost * 0.8), 0.35);
    stars.push({ bx, by, opacity });
  }
  return stars;
})();

// Draws the Milky Way band as a diagonal gradient + micro-star field.
// Everything is rendered in a rotated coordinate space so the band is
// diagonal without needing to calculate rotated positions by hand.
function drawMilkyWay(ctx: CanvasRenderingContext2D, w: number, h: number) {
  // ── Galactic core blob (normal coordinate space, no rotation) ────────────
  // A soft radial glow near the visual centre of the page.
  const coreX = w * 0.52;
  const coreY = h * 0.48;
  const coreR = Math.min(w, h) * 0.28;
  const coreGrad = ctx.createRadialGradient(coreX, coreY, 0, coreX, coreY, coreR);
  coreGrad.addColorStop(0,   'rgba(210,205,255,0.14)');
  coreGrad.addColorStop(0.45,'rgba(185,190,255,0.07)');
  coreGrad.addColorStop(1,   'rgba(160,170,255,0)');
  ctx.fillStyle = coreGrad;
  ctx.fillRect(0, 0, w, h);

  // ── Diagonal band (rotated coordinate space) ──────────────────────────────
  ctx.save();
  ctx.translate(w / 2, h / 2);
  ctx.rotate(-Math.PI / 6.5);      // ~28° diagonal
  ctx.translate(-w / 2, -h / 2);

  const bandCY  = h / 2;
  const halfH   = h * 0.17;        // half-height of the star-dense region

  // Soft gradient glow across the band
  const bandGrad = ctx.createLinearGradient(0, bandCY - halfH * 2.4, 0, bandCY + halfH * 2.4);
  bandGrad.addColorStop(0,    'rgba(155,170,255,0)');
  bandGrad.addColorStop(0.22, 'rgba(160,175,255,0.06)');
  bandGrad.addColorStop(0.44, 'rgba(185,195,255,0.11)');
  bandGrad.addColorStop(0.5,  'rgba(200,208,255,0.14)');  // core glow
  bandGrad.addColorStop(0.56, 'rgba(185,195,255,0.11)');
  bandGrad.addColorStop(0.78, 'rgba(160,175,255,0.06)');
  bandGrad.addColorStop(1,    'rgba(155,170,255,0)');
  ctx.fillStyle = bandGrad;
  ctx.fillRect(-w * 0.2, bandCY - halfH * 2.4, w * 1.4, halfH * 4.8);

  // Micro-star field within the band
  MW_STARS.forEach(({ bx, by, opacity }) => {
    const sx = bx * w;
    const sy = bandCY + by * halfH;
    ctx.beginPath();
    ctx.arc(sx, sy, 0.65, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(230,240,255,${opacity})`;
    ctx.fill();
  });

  ctx.restore();
}

export default function StarBackground({ constellations, milkyWay = false }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef   = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // One twinkle state per star, flattened across all constellations
    const twinkle: { opacity: number; target: number; speed: number }[] = [];

    const resize = () => {
      canvas.width  = window.innerWidth  * window.devicePixelRatio;
      canvas.height = window.innerHeight * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    };

    function initTwinkle() {
      twinkle.length = 0;
      constellations.forEach((c) => {
        c.stars.forEach(() => {
          const base = Math.random() * 0.08 + 0.08;
          twinkle.push({ opacity: base, target: base, speed: Math.random() * 0.0008 + 0.0002 });
        });
      });
    }

    function draw() {
      const w = window.innerWidth;
      const h = window.innerHeight;
      ctx!.clearRect(0, 0, w, h);

      // ── Milky Way — deepest layer ───────────────────────────────────────
      if (milkyWay) drawMilkyWay(ctx!, w, h);

      // ── Constellations ──────────────────────────────────────────────────
      let idx = 0;
      constellations.forEach((constellation) => {
        // Connection lines
        ctx!.strokeStyle = 'rgba(180,210,255,0.055)';
        ctx!.lineWidth = 0.6;
        constellation.lines.forEach(([a, b]) => {
          const sa = constellation.stars[a];
          const sb = constellation.stars[b];
          ctx!.beginPath();
          ctx!.moveTo(sa.x * w, sa.y * h);
          ctx!.lineTo(sb.x * w, sb.y * h);
          ctx!.stroke();
        });

        // Star dots with slow independent twinkle
        constellation.stars.forEach((star) => {
          const t = twinkle[idx];
          if (t.opacity < t.target) {
            t.opacity = Math.min(t.opacity + t.speed, t.target);
          } else {
            t.opacity = Math.max(t.opacity - t.speed, 0.05);
            if (t.opacity <= 0.05) t.target = Math.random() * 0.10 + 0.10;
          }
          ctx!.beginPath();
          ctx!.arc(star.x * w, star.y * h, star.r ?? 1.2, 0, Math.PI * 2);
          ctx!.fillStyle = `rgba(215,232,255,${t.opacity})`;
          ctx!.fill();
          idx++;
        });
      });

      animRef.current = requestAnimationFrame(draw);
    }

    resize();
    initTwinkle();
    draw();
    window.addEventListener('resize', resize);
    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener('resize', resize);
    };
  }, [constellations, milkyWay]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none"
      style={{ zIndex: 0, mixBlendMode: 'screen' }}
      aria-hidden="true"
    />
  );
}
