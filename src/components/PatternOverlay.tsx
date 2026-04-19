type PatternType = "circles" | "lines" | "dots" | "rings" | "grid" | "waves";

interface PatternOverlayProps {
  pattern: PatternType;
}

export function PatternOverlay({ pattern }: PatternOverlayProps) {
  switch (pattern) {
    case "circles":
      return (
        <div className="absolute inset-0 opacity-20" aria-hidden="true">
          <div className="absolute top-1/4 left-1/4 w-1/2 h-1/2 border-2 border-white/40 rounded-full" />
          <div className="absolute bottom-1/4 right-1/4 w-1/3 h-1/3 border border-white/30 rounded-full" />
          <div className="absolute top-1/3 right-1/4 w-4 h-4 bg-white/30 rounded-full animate-float" />
        </div>
      );
    case "lines":
      return (
        <div className="absolute inset-0 opacity-15" aria-hidden="true">
          {[0, 1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="absolute h-[2px] bg-white/40"
              style={{
                top: `${20 + i * 15}%`,
                left: "10%",
                right: "10%",
                transform: `rotate(${-5 + i * 2.5}deg)`,
              }}
            />
          ))}
        </div>
      );
    case "dots":
      return (
        <div
          className="absolute inset-0 opacity-20"
          aria-hidden="true"
          style={{
            backgroundImage:
              "radial-gradient(circle, rgba(255,255,255,0.5) 1px, transparent 1px)",
            backgroundSize: "16px 16px",
          }}
        />
      );
    case "rings":
      return (
        <div className="absolute inset-0 opacity-20" aria-hidden="true">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2/3 h-2/3 border-4 border-white/30 rounded-full" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1/3 h-1/3 border-2 border-white/40 rounded-full" />
        </div>
      );
    case "grid":
      return (
        <div
          className="absolute inset-0 opacity-10"
          aria-hidden="true"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.3) 1px, transparent 1px)",
            backgroundSize: "24px 24px",
          }}
        />
      );
    case "waves":
      return (
        <div className="absolute inset-0 opacity-20 overflow-hidden" aria-hidden="true">
          <svg className="absolute bottom-0 w-full" viewBox="0 0 400 100" fill="none">
            <path
              d="M0 50 Q50 20 100 50 T200 50 T300 50 T400 50 V100 H0Z"
              fill="rgba(255,255,255,0.15)"
            />
            <path
              d="M0 60 Q50 30 100 60 T200 60 T300 60 T400 60 V100 H0Z"
              fill="rgba(255,255,255,0.1)"
            />
          </svg>
        </div>
      );
  }
}
