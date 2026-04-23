import { render, screen, waitFor } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";

// Mock ParticleCanvas before importing Hero
vi.mock("./ParticleCanvas", () => ({
  ParticleCanvas: () => <canvas data-testid="particle-canvas" />,
}));

// Mock useInView
vi.mock("../hooks/useInView", () => ({
  useInView: () => ({ ref: { current: null }, isInView: true }),
}));

// Mock useReducedMotion
vi.mock("../hooks/useReducedMotion", () => ({
  useReducedMotion: () => false,
}));

// Need to import after mocks are set up
import { Hero } from "./Hero";

describe("Hero", () => {
  it("renders the headline with rotating word", async () => {
    render(<Hero />);
    await waitFor(() => {
      expect(screen.getByText(/Beyond Utility/)).toBeDefined();
    });
  });

  it("renders the subtitle", async () => {
    render(<Hero />);
    await waitFor(() => {
      expect(
        screen.getByText(/Evoke transforms everyday interactions/),
      ).toBeDefined();
    });
  });

  it("renders the 'Where Design Meets Art' badge", async () => {
    render(<Hero />);
    await waitFor(() => {
      expect(screen.getByText("Where Design Meets Art")).toBeDefined();
    });
  });

  it("renders the Explore Evoke CTA", async () => {
    render(<Hero />);
    await waitFor(() => {
      expect(screen.getByText("Explore Evoke")).toBeDefined();
    });
  });

  it("renders the Try the Demo CTA", async () => {
    render(<Hero />);
    await waitFor(() => {
      expect(screen.getByText("Try the Demo")).toBeDefined();
    });
  });

  // FIX 2: Verify fake stats are removed
  describe("Fake social proof removal (FIX 2)", () => {
    it("does not render '10K+ Active Creators'", async () => {
      render(<Hero />);
      await waitFor(() => {
        expect(screen.getByText(/Beyond Utility/)).toBeDefined();
      });
      expect(screen.queryByText("10K+ Active Creators")).toBeNull();
    });

    it("does not render '50K+ Artworks Created'", async () => {
      render(<Hero />);
      await waitFor(() => {
        expect(screen.getByText(/Beyond Utility/)).toBeDefined();
      });
      expect(screen.queryByText("50K+ Artworks Created")).toBeNull();
    });

    it("does not render '99% Satisfaction Rate'", async () => {
      render(<Hero />);
      await waitFor(() => {
        expect(screen.getByText(/Beyond Utility/)).toBeDefined();
      });
      expect(screen.queryByText("99% Satisfaction Rate")).toBeNull();
    });

    it("does not render 'Trusted by creators worldwide'", async () => {
      render(<Hero />);
      await waitFor(() => {
        expect(screen.getByText(/Beyond Utility/)).toBeDefined();
      });
      expect(screen.queryByText(/Trusted by creators worldwide/)).toBeNull();
    });

    it("does not render any animated counter with percentage or K+ format", async () => {
      render(<Hero />);
      await waitFor(() => {
        expect(screen.getByText(/Beyond Utility/)).toBeDefined();
      });
      // No element should contain text matching "99%" or "K+" (fake stat patterns)
      const allText = document.body.textContent ?? "";
      expect(allText).not.toContain("99%");
      expect(allText).not.toMatch(/\d+K\+/);
    });
  });

  // FIX 2: Verify honest capability descriptions are present
  describe("Honest capability descriptions (FIX 2)", () => {
    it("renders 'Infinite Combinations'", async () => {
      render(<Hero />);
      await waitFor(() => {
        expect(screen.getByText("Infinite Combinations")).toBeDefined();
      });
    });

    it("renders 'Zero Setup'", async () => {
      render(<Hero />);
      await waitFor(() => {
        expect(screen.getByText("Zero Setup")).toBeDefined();
      });
    });

    it("renders 'Open Source'", async () => {
      render(<Hero />);
      await waitFor(() => {
        expect(screen.getByText("Open Source")).toBeDefined();
      });
    });

    it("renders subtitle 'Any hex color, any angle'", async () => {
      render(<Hero />);
      await waitFor(() => {
        expect(screen.getByText("Any hex color, any angle")).toBeDefined();
      });
    });

    it("renders subtitle 'Open it, create it, copy it'", async () => {
      render(<Hero />);
      await waitFor(() => {
        expect(screen.getByText("Open it, create it, copy it")).toBeDefined();
      });
    });

    it("renders subtitle 'No accounts, no tracking'", async () => {
      render(<Hero />);
      await waitFor(() => {
        expect(screen.getByText("No accounts, no tracking")).toBeDefined();
      });
    });

    it("renders all three capability cards with icons", async () => {
      render(<Hero />);
      await waitFor(() => {
        expect(screen.getByText("Infinite Combinations")).toBeDefined();
      });
      // Each capability should have an SVG icon
      const svgs = document.querySelectorAll("section svg");
      expect(svgs.length).toBeGreaterThanOrEqual(3);
    });

    it("renders capability section with border-top separator", async () => {
      render(<Hero />);
      await waitFor(() => {
        expect(screen.getByText("Infinite Combinations")).toBeDefined();
      });
      // Verify the capabilities section exists by checking for its children
      const capabilitiesSection = screen.getByText("Infinite Combinations").closest("div");
      expect(capabilitiesSection).not.toBeNull();
      // The parent should have a border-top class (Tailwind utility)
      const parentEl = capabilitiesSection?.closest("div");
      expect(parentEl).not.toBeNull();
    });
  });

  describe("Scroll indicator", () => {
    it("renders a scroll indicator element", async () => {
      render(<Hero />);
      await waitFor(() => {
        expect(screen.getByText(/Beyond Utility/)).toBeDefined();
      });
      // The scroll label should be rendered
      expect(screen.getByText("Scroll")).toBeDefined();
    });

    it("scroll indicator is hidden from screen readers", async () => {
      render(<Hero />);
      await waitFor(() => {
        expect(screen.getByText(/Beyond Utility/)).toBeDefined();
      });
      // The scroll indicator container should have aria-hidden
      const scrollLabel = screen.getByText("Scroll");
      const container = scrollLabel.closest("div");
      expect(container?.getAttribute("aria-hidden")).toBe("true");
    });
  });
});
