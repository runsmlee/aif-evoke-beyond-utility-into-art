import { useEffect, useRef, useCallback } from "react";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  opacity: number;
  hue: number;
}

export function ParticleCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationFrameRef = useRef<number>(0);
  const particlesRef = useRef<Particle[]>([]);
  const mouseRef = useRef({ x: 0, y: 0 });

  const initParticles = useCallback((width: number, height: number) => {
    const count = Math.min(50, Math.floor((width * height) / 15000));
    const particles: Particle[] = [];
    for (let i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        size: Math.random() * 3 + 1.5,
        opacity: Math.random() * 0.3 + 0.1,
        hue: Math.random() * 20 + 350,
      });
    }
    particlesRef.current = particles;
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let resizeTimeout: ReturnType<typeof setTimeout>;
    const resizeCanvas = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        const parent = canvas.parentElement;
        if (!parent) return;
        const rect = parent.getBoundingClientRect();
        const dpr = Math.min(window.devicePixelRatio || 1, 2);
        canvas.width = rect.width * dpr;
        canvas.height = rect.height * dpr;
        canvas.style.width = `${rect.width}px`;
        canvas.style.height = `${rect.height}px`;
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        initParticles(rect.width, rect.height);
      }, 100);
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      };
    };

    canvas.addEventListener("mousemove", handleMouseMove);

    const isMobile = window.matchMedia("(max-width: 768px)").matches;
    const targetInterval = isMobile ? 33 : 16;
    let lastFrameTime = 0;

    const animate = (timestamp: number) => {
      if (!ctx || !canvas) return;

      const elapsed = timestamp - lastFrameTime;
      if (elapsed < targetInterval) {
        animationFrameRef.current = requestAnimationFrame(animate);
        return;
      }
      lastFrameTime = timestamp - (elapsed % targetInterval);

      const w = canvas.width / (Math.min(window.devicePixelRatio || 1, 2));
      const h = canvas.height / (Math.min(window.devicePixelRatio || 1, 2));
      ctx.clearRect(0, 0, w, h);

      const mouse = mouseRef.current;
      const particles = particlesRef.current;

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i]!;

        const dx = mouse.x - p.x;
        const dy = mouse.y - p.y;
        const distSq = dx * dx + dy * dy;
        if (distSq < 22500 && distSq > 0) {
          const dist = Math.sqrt(distSq);
          const force = (150 - dist) / 150 * 0.02;
          p.vx += (dx / dist) * force;
          p.vy += (dy / dist) * force;
        }

        p.x += p.vx;
        p.y += p.vy;
        p.vx *= 0.99;
        p.vy *= 0.99;

        if (p.x < -10) p.x = w + 10;
        if (p.x > w + 10) p.x = -10;
        if (p.y < -10) p.y = h + 10;
        if (p.y > h + 10) p.y = -10;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${p.hue}, 80%, 60%, ${p.opacity})`;
        ctx.fill();
      }

      const maxDistSq = 10000;
      for (let i = 0; i < particles.length; i++) {
        const a = particles[i]!;
        for (let j = i + 1; j < particles.length; j++) {
          const b = particles[j]!;
          const ddx = a.x - b.x;
          const ddy = a.y - b.y;
          const distSq = ddx * ddx + ddy * ddy;
          if (distSq < maxDistSq) {
            const dist = Math.sqrt(distSq);
            const alpha = (1 - dist / 100) * 0.08;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.strokeStyle = `rgba(239, 68, 68, ${alpha})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animationFrameRef.current = requestAnimationFrame(animate);

    return () => {
      clearTimeout(resizeTimeout);
      window.removeEventListener("resize", resizeCanvas);
      canvas.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animationFrameRef.current);
    };
  }, [initParticles]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full -z-10"
      aria-hidden="true"
    />
  );
}
