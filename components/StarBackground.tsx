'use client';
import { useEffect, useRef } from 'react';
import type { Constellation } from '@/lib/constellations';

interface Props {
  constellations: Constellation[];
}

export default function StarBackground({ constellations }: Props) {
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
  }, [constellations]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none"
      style={{ zIndex: 0 }}
      aria-hidden="true"
    />
  );
}
