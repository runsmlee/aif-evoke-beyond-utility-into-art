import { useEffect, useRef } from "react";

export function ScrollProgress() {
  const barRef = useRef<HTMLDivElement>(null);
  const tickingRef = useRef(false);

  useEffect(() => {
    const updateProgress = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      const clamped = Math.min(100, Math.max(0, scrollPercent));

      // Direct DOM update — avoids React re-render on every scroll tick
      const el = barRef.current;
      if (el) {
        el.style.transform = `scaleX(${clamped / 100})`;
        el.setAttribute("aria-valuenow", String(Math.round(clamped)));
      }
      tickingRef.current = false;
    };

    const handleScroll = () => {
      if (!tickingRef.current) {
        requestAnimationFrame(updateProgress);
        tickingRef.current = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    updateProgress();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      ref={barRef}
      className="scroll-progress"
      style={{ width: "100%", transform: "scaleX(0)", transformOrigin: "left" }}
      role="progressbar"
      aria-valuenow={0}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label="Page scroll progress"
    />
  );
}
