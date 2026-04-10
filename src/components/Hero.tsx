import { useState, useEffect, useRef, useCallback } from "react";
import { useInView } from "../hooks/useInView";
import { useReducedMotion } from "../hooks/useReducedMotion";

interface StatItem {
  value: string;
  numericValue: number;
  suffix: string;
  label: string;
}

const stats: StatItem[] = [
  { value: "10K+", numericValue: 10, suffix: "K+", label: "Active Creators" },
  { value: "50K+", numericValue: 50, suffix: "K+", label: "Artworks Created" },
  { value: "99%", numericValue: 99, suffix: "%", label: "Satisfaction Rate" },
];

const rotatingWords = ["Art", "Experience", "Emotion", "Expression", "Craft"];

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  opacity: number;
  hue: number;
}

function RotatingWord({ words, interval = 3000 }: { words: string[]; interval?: number }) {
  const [index, setIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion || words.length <= 1) return;

    const timer = setInterval(() => {
      setIsTransitioning(true);
      setTimeout(() => {
        setIndex((prev) => (prev + 1) % words.length);
        setIsTransitioning(false);
      }, 300);
    }, interval);

    return () => clearInterval(timer);
  }, [words.length, interval, prefersReducedMotion]);

  return (
    <span
      className="gradient-text inline-block transition-all duration-300"
      style={{
        opacity: isTransitioning ? 0 : 1,
        transform: isTransitioning ? "translateY(8px)" : "translateY(0)",
      }}
      aria-live="polite"
      aria-atomic="true"
    >
      {words[index] ?? words[0]}
    </span>
  );
}

function AnimatedCounter({ target, suffix, isInView }: { target: number; suffix: string; isInView: boolean }) {
  const [count, setCount] = useState(0);
  const prefersReducedMotion = useReducedMotion();
  const hasAnimated = useRef(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (!isInView) return;

    if (hasAnimated.current) return;

    if (prefersReducedMotion) {
      setCount(target);
      hasAnimated.current = true;
      return;
    }

    hasAnimated.current = true;

    const duration = 1500;
    const steps = 60;
    const increment = target / steps;
    let current = 0;
    const stepTime = duration / steps;

    timerRef.current = setInterval(() => {
      current += increment;
      if (current >= target) {
        setCount(target);
        if (timerRef.current) clearInterval(timerRef.current);
      } else {
        setCount(Math.floor(current));
      }
    }, stepTime);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isInView, prefersReducedMotion, target]);

  return (
    <span>
      {count}
      {suffix}
    </span>
  );
}

export function Hero() {
  const { ref, isInView } = useInView({ threshold: 0.1 });
  const [statsVisible, setStatsVisible] = useState(false);
  const statsRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationFrameRef = useRef<number>(0);
  const particlesRef = useRef<Particle[]>([]);
  const mouseRef = useRef({ x: 0, y: 0 });
  const prefersReducedMotion = useReducedMotion();

  // Initialize particle system
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
        hue: Math.random() * 20 + 350, // Red-ish hues
      });
    }
    particlesRef.current = particles;
  }, []);

  // Canvas animation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || prefersReducedMotion) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resizeCanvas = () => {
      const parent = canvas.parentElement;
      if (!parent) return;
      const rect = parent.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;
      ctx.scale(dpr, dpr);
      initParticles(rect.width, rect.height);
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

    const animate = () => {
      if (!ctx || !canvas) return;
      const w = canvas.width / (window.devicePixelRatio || 1);
      const h = canvas.height / (window.devicePixelRatio || 1);
      ctx.clearRect(0, 0, w, h);

      const mouse = mouseRef.current;

      for (const p of particlesRef.current) {
        // Subtle mouse attraction
        const dx = mouse.x - p.x;
        const dy = mouse.y - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 150 && dist > 0) {
          const force = (150 - dist) / 150 * 0.02;
          p.vx += (dx / dist) * force;
          p.vy += (dy / dist) * force;
        }

        // Apply velocity with damping
        p.x += p.vx;
        p.y += p.vy;
        p.vx *= 0.99;
        p.vy *= 0.99;

        // Wrap around
        if (p.x < -10) p.x = w + 10;
        if (p.x > w + 10) p.x = -10;
        if (p.y < -10) p.y = h + 10;
        if (p.y > h + 10) p.y = -10;

        // Draw particle
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${p.hue}, 80%, 60%, ${p.opacity})`;
        ctx.fill();
      }

      // Draw connections between close particles
      const maxDist = 100;
      for (let i = 0; i < particlesRef.current.length; i++) {
        const a = particlesRef.current[i]!;
        for (let j = i + 1; j < particlesRef.current.length; j++) {
          const b = particlesRef.current[j]!;
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < maxDist) {
            const alpha = (1 - dist / maxDist) * 0.08;
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

    animate();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      canvas.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animationFrameRef.current);
    };
  }, [prefersReducedMotion, initParticles]);

  // Stats observer
  useEffect(() => {
    if (!statsRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry?.isIntersecting) {
          setStatsVisible(true);
        }
      },
      { threshold: 0.5 }
    );

    observer.observe(statsRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={ref}
      className="relative pt-28 pb-20 sm:pt-36 sm:pb-28 lg:pt-44 lg:pb-36 overflow-hidden"
      aria-label="Introduction"
    >
      {/* Canvas particle background */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full -z-10"
        aria-hidden="true"
      />

      {/* Decorative gradient blobs */}
      <div className="absolute inset-0 -z-10" aria-hidden="true">
        <div className="absolute top-20 left-1/4 w-72 h-72 bg-primary-100/60 dark:bg-primary-900/20 rounded-full blur-3xl animate-pulse-slow" />
        <div className="absolute bottom-10 right-1/4 w-96 h-96 bg-primary-50/80 dark:bg-primary-900/10 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: "1.5s" }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-br from-primary-200/20 dark:from-primary-800/10 to-transparent rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center">
          {/* Badge */}
          <div
            className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary-50 dark:bg-primary-900/30 border border-primary-200/80 dark:border-primary-800/50 mb-8 ${
              isInView ? "animate-fade-in" : "opacity-0"
            }`}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-primary-500 animate-pulse" aria-hidden="true" />
            <span className="text-xs font-semibold text-primary-700 dark:text-primary-300 tracking-wide uppercase">
              Where Design Meets Art
            </span>
          </div>

          {/* Headline */}
          <h1
            className={`text-4xl sm:text-5xl lg:text-7xl font-extrabold tracking-tight text-surface-900 dark:text-white leading-[1.08] ${
              isInView ? "animate-slide-up" : "opacity-0"
            }`}
          >
            Beyond Utility,{" "}
            <span className="gradient-text">Into <RotatingWord words={rotatingWords} /></span>
          </h1>

          {/* Subtitle */}
          <p
            className={`mt-6 text-lg sm:text-xl text-surface-500 dark:text-surface-400 leading-relaxed max-w-2xl mx-auto ${
              isInView ? "animate-slide-up" : "opacity-0"
            }`}
            style={{ animationDelay: "0.15s" }}
          >
            Evoke transforms everyday interactions into meaningful experiences.
            We craft digital tools that don&apos;t just work — they inspire.
          </p>

          {/* CTA Buttons */}
          <div
            className={`mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 ${
              isInView ? "animate-slide-up" : "opacity-0"
            }`}
            style={{ animationDelay: "0.3s" }}
          >
            <a
              href="#features"
              className="group inline-flex items-center px-7 py-3.5 text-base font-semibold text-white bg-gradient-to-r from-primary-500 to-primary-600 rounded-xl hover:from-primary-600 hover:to-primary-700 transition-all duration-200 shadow-lg shadow-primary-500/25 hover:shadow-xl hover:shadow-primary-500/30 focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-surface-950"
            >
              Explore Evoke
              <svg
                className="ml-2 w-4 h-4 transition-transform duration-200 group-hover:translate-x-1"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </a>
            <a
              href="#demo"
              className="inline-flex items-center px-7 py-3.5 text-base font-semibold text-surface-700 dark:text-surface-200 bg-white dark:bg-surface-800 border border-surface-200 dark:border-surface-700 rounded-xl hover:border-surface-300 dark:hover:border-surface-600 hover:bg-surface-50 dark:hover:bg-surface-700 hover:shadow-md transition-all duration-200 focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-surface-950"
            >
              Try the Demo
            </a>
          </div>

          {/* Social proof bar with animated counters */}
          <div
            ref={statsRef}
            className={`mt-16 pt-10 border-t border-surface-200/60 dark:border-surface-700/60 ${
              isInView ? "animate-fade-in" : "opacity-0"
            }`}
            style={{ animationDelay: "0.5s" }}
          >
            <p className="text-sm font-medium text-surface-400 dark:text-surface-500 mb-6">
              Trusted by creators worldwide
            </p>
            <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-4">
              {stats.map((stat) => (
                <div key={stat.label} className="text-center px-4">
                  <div className="text-2xl sm:text-3xl font-extrabold text-surface-900 dark:text-white">
                    {statsVisible ? (
                      <AnimatedCounter
                        target={stat.numericValue}
                        suffix={stat.suffix}
                        isInView={statsVisible}
                      />
                    ) : (
                      "\u2014"
                    )}
                  </div>
                  <div className="text-sm text-surface-500 dark:text-surface-400 mt-0.5">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
