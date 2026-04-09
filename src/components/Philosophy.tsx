import { useInView } from "../hooks/useInView";
import { useReducedMotion } from "../hooks/useReducedMotion";
import { useState, useEffect, useCallback, useRef } from "react";

interface FloatingWord {
  id: number;
  text: string;
  x: number;
  y: number;
  opacity: number;
  scale: number;
  rotation: number;
}

const manifestoLines = [
  "We believe tools should",
  "inspire, not just function.",
];

const floatingWords: Omit<FloatingWord, "id">[] = [
  { text: "Imagine", x: 8, y: 15, opacity: 0.12, scale: 1, rotation: -3 },
  { text: "Craft", x: 72, y: 20, opacity: 0.10, scale: 0.9, rotation: 2 },
  { text: "Feel", x: 45, y: 75, opacity: 0.11, scale: 1.1, rotation: -1 },
  { text: "Wonder", x: 15, y: 70, opacity: 0.09, scale: 0.85, rotation: 4 },
  { text: "Create", x: 80, y: 65, opacity: 0.13, scale: 1, rotation: -2 },
  { text: "Dream", x: 55, y: 10, opacity: 0.08, scale: 0.95, rotation: 3 },
];

function Philosophy() {
  const { ref, isInView } = useInView({ threshold: 0.15 });
  const prefersReducedMotion = useReducedMotion();
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationFrameRef = useRef<number>(0);
  const particlesRef = useRef<Array<{ x: number; y: number; vx: number; vy: number; size: number; opacity: number }>>([]);

  // Subtle floating particle system
  const initParticles = useCallback((width: number, height: number) => {
    const count = Math.min(30, Math.floor((width * height) / 20000));
    const particles: typeof particlesRef.current = [];
    for (let i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        size: Math.random() * 2 + 1,
        opacity: Math.random() * 0.15 + 0.05,
      });
    }
    particlesRef.current = particles;
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || prefersReducedMotion) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resizeCanvas = () => {
      const rect = canvas.parentElement?.getBoundingClientRect();
      if (rect) {
        canvas.width = rect.width;
        canvas.height = rect.height;
        initParticles(canvas.width, canvas.height);
      }
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    const animate = () => {
      if (!ctx || !canvas) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (const p of particlesRef.current) {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(239, 68, 68, ${p.opacity})`;
        ctx.fill();
      }

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      cancelAnimationFrame(animationFrameRef.current);
    };
  }, [prefersReducedMotion, initParticles]);

  return (
    <section
      ref={ref}
      className="relative py-24 sm:py-32 lg:py-40 overflow-hidden bg-surface-900 dark:bg-black"
      aria-labelledby="philosophy-heading"
    >
      {/* Particle canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        aria-hidden="true"
      />

      {/* Floating decorative words */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        {floatingWords.map((word, i) => (
          <span
            key={word.text}
            className={`absolute text-white font-extrabold text-lg sm:text-2xl select-none transition-all duration-700 ${
              isInView ? "opacity-100" : "opacity-0"
            }`}
            style={{
              left: `${word.x}%`,
              top: `${word.y}%`,
              opacity: word.opacity,
              transform: `scale(${word.scale}) rotate(${word.rotation}deg)`,
              animationDelay: `${i * 0.2}s`,
              transition: `opacity 1s ease ${i * 0.2}s`,
            }}
          >
            {word.text}
          </span>
        ))}
      </div>

      {/* Decorative lines */}
      <div className="absolute inset-0" aria-hidden="true">
        <div
          className={`absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary-500/30 to-transparent transition-opacity duration-1000 ${
            isInView ? "opacity-100" : "opacity-0"
          }`}
        />
        <div
          className={`absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary-500/30 to-transparent transition-opacity duration-1000 ${
            isInView ? "opacity-100" : "opacity-0"
          }`}
        />
      </div>

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Section Label */}
        <span
          className={`inline-block text-sm font-semibold text-primary-400 uppercase tracking-[0.2em] mb-12 ${
            isInView ? "animate-fade-in" : "opacity-0"
          }`}
        >
          Our Philosophy
        </span>

        {/* Manifesto text */}
        <h2
          id="philosophy-heading"
          className="text-3xl sm:text-5xl lg:text-6xl xl:text-7xl font-extrabold tracking-tight text-white leading-[1.1]"
        >
          {manifestoLines.map((line, lineIndex) => (
            <span
              key={lineIndex}
              className={`block ${
                isInView ? "animate-slide-up" : "opacity-0"
              }`}
              style={{ animationDelay: `${0.2 + lineIndex * 0.15}s` }}
            >
              {lineIndex === manifestoLines.length - 1 ? (
                <span className="gradient-text">{line}</span>
              ) : (
                line
              )}
            </span>
          ))}
        </h2>

        {/* Supporting text */}
        <p
          className={`mt-8 sm:mt-10 text-lg sm:text-xl text-surface-400 max-w-2xl mx-auto leading-relaxed ${
            isInView ? "animate-fade-in" : "opacity-0"
          }`}
          style={{ animationDelay: "0.6s" }}
        >
          Every interface is a conversation. We design tools that listen, adapt,
          and elevate — turning routine interactions into moments of genuine
          connection.
        </p>

        {/* Interactive word chips */}
        <div
          className={`mt-12 flex flex-wrap items-center justify-center gap-3 ${
            isInView ? "animate-fade-in" : "opacity-0"
          }`}
          style={{ animationDelay: "0.8s" }}
        >
          {["Intentional", "Emotional", "Meticulous", "Human"].map(
            (word, i) => (
              <button
                key={word}
                type="button"
                className={`px-4 sm:px-5 py-2 sm:py-2.5 rounded-full text-sm font-medium border transition-all duration-300 cursor-default ${
                  hoveredIndex === i
                    ? "bg-primary-500 text-white border-primary-500 shadow-lg shadow-primary-500/25"
                    : "bg-transparent text-surface-300 border-surface-700 hover:border-primary-500/50 hover:text-primary-400"
                }`}
                onMouseEnter={() => setHoveredIndex(i)}
                onMouseLeave={() => setHoveredIndex(null)}
                onFocus={() => setHoveredIndex(i)}
                onBlur={() => setHoveredIndex(null)}
                aria-label={word}
              >
                {word}
              </button>
            )
          )}
        </div>

        {/* Visual divider */}
        <div
          className={`mt-16 flex items-center justify-center gap-4 ${
            isInView ? "animate-fade-in" : "opacity-0"
          }`}
          style={{ animationDelay: "1s" }}
          aria-hidden="true"
        >
          <div className="w-12 h-px bg-surface-700" />
          <div className="w-2 h-2 rounded-full bg-primary-500" />
          <div className="w-12 h-px bg-surface-700" />
        </div>
      </div>
    </section>
  );
}

export { Philosophy };
