import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { InteractiveDemo, fisherYatesShuffle } from "./InteractiveDemo";

// Mock localStorage
const localStorageMock = (() => {
  let store: Record<string, string> = {};
  return {
    getItem: vi.fn((key: string) => store[key] ?? null),
    setItem: vi.fn((key: string, value: string) => { store[key] = value; }),
    removeItem: vi.fn((key: string) => { delete store[key]; }),
    clear: vi.fn(() => { store = {}; }),
    get _store() { return store; },
  };
})();

Object.defineProperty(window, "localStorage", { value: localStorageMock });

// Mock clipboard API
Object.defineProperty(navigator, "clipboard", {
  value: {
    writeText: vi.fn().mockResolvedValue(undefined),
  },
  writable: true,
});

describe("InteractiveDemo", () => {
  beforeEach(() => {
    localStorageMock.clear();
    vi.mocked(navigator.clipboard.writeText).mockResolvedValue(undefined);
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("renders the section heading", () => {
    render(<InteractiveDemo />);
    expect(screen.getByText(/Create your/i)).toBeDefined();
  });

  it("renders the section label", () => {
    render(<InteractiveDemo />);
    expect(screen.getByText("Try It")).toBeDefined();
  });

  it("renders the description text", () => {
    render(<InteractiveDemo />);
    expect(screen.getByText(/Mix, match, and explore/i)).toBeDefined();
  });

  it("renders the shuffle button", () => {
    render(<InteractiveDemo />);
    expect(screen.getByLabelText("Shuffle color order")).toBeDefined();
  });

  it("renders the mix button", () => {
    render(<InteractiveDemo />);
    expect(screen.getByLabelText("Generate random color variations")).toBeDefined();
  });

  it("renders the gradient preview", () => {
    render(<InteractiveDemo />);
    const preview = screen.getByRole("img", { name: /Gradient preview/i });
    expect(preview).toBeDefined();
  });

  it("renders angle presets", () => {
    render(<InteractiveDemo />);
    expect(screen.getByLabelText("Set angle to 90 degrees")).toBeDefined();
    expect(screen.getByLabelText("Set angle to 135 degrees")).toBeDefined();
  });

  it("renders palette selector", () => {
    render(<InteractiveDemo />);
    expect(screen.getByLabelText("Palette 1")).toBeDefined();
    expect(screen.getByLabelText("Palette 2")).toBeDefined();
    expect(screen.getByLabelText("Palette 3")).toBeDefined();
  });

  it("renders color swatch buttons", () => {
    render(<InteractiveDemo />);
    expect(screen.getByLabelText(/Copy Primary color/i)).toBeDefined();
  });

  it("renders the CSS output section", () => {
    render(<InteractiveDemo />);
    expect(screen.getByText("CSS")).toBeDefined();
  });

  it("renders copy CSS button", () => {
    render(<InteractiveDemo />);
    expect(screen.getByLabelText("Copy CSS to clipboard")).toBeDefined();
  });

  it("has the demo section with id", () => {
    render(<InteractiveDemo />);
    const section = document.getElementById("demo");
    expect(section).not.toBeNull();
  });

  // FIX 1: Fisher-Yates shuffle tests
  describe("Fisher-Yates shuffle", () => {
    it("is exported from the module", () => {
      expect(typeof fisherYatesShuffle).toBe("function");
    });

    it("returns an array of the same length", () => {
      const input = [1, 2, 3, 4, 5];
      const result = fisherYatesShuffle(input);
      expect(result).toHaveLength(input.length);
    });

    it("does not mutate the original array", () => {
      const input = [1, 2, 3, 4, 5];
      const copy = [...input];
      fisherYatesShuffle(input);
      expect(input).toEqual(copy);
    });

    it("contains all original elements", () => {
      const input = [10, 20, 30, 40, 50];
      const result = fisherYatesShuffle(input);
      expect(result.sort()).toEqual(input.sort());
    });

    it("produces uniform distribution (statistical test)", () => {
      const input = [0, 1, 2, 3];
      const counts = [0, 0, 0, 0];
      const iterations = 40000;
      for (let i = 0; i < iterations; i++) {
        const shuffled = fisherYatesShuffle(input);
        counts[shuffled[0]!]!++;
      }
      // Each element should appear as first ~25% of the time
      // Allow generous margin: 20-30% range
      for (const count of counts) {
        const ratio = count / iterations;
        expect(ratio).toBeGreaterThan(0.2);
        expect(ratio).toBeLessThan(0.3);
      }
    });
  });

  // FIX 3: Palette history tests
  describe("Palette history", () => {
    it("renders the save palette button", () => {
      render(<InteractiveDemo />);
      expect(screen.getByLabelText("Save current palette")).toBeDefined();
    });

    it("renders the saved palettes drawer header", () => {
      render(<InteractiveDemo />);
      expect(screen.getByText(/Saved Palettes/)).toBeDefined();
    });

    it("shows empty state when no palettes saved", () => {
      render(<InteractiveDemo />);
      // Drawer starts collapsed, so open it first
      fireEvent.click(screen.getByText(/Saved Palettes/));
      expect(screen.getByText(/No saved palettes yet/)).toBeDefined();
    });

    it("saves a palette to localStorage on shuffle", () => {
      render(<InteractiveDemo />);
      fireEvent.click(screen.getByLabelText("Shuffle color order"));
      expect(localStorageMock.setItem).toHaveBeenCalledWith(
        "evoke-saved-palettes",
        expect.any(String),
      );
    });

    it("saves a palette to localStorage on mix", () => {
      render(<InteractiveDemo />);
      fireEvent.click(screen.getByLabelText("Generate random color variations"));
      expect(localStorageMock.setItem).toHaveBeenCalledWith(
        "evoke-saved-palettes",
        expect.any(String),
      );
    });

    it("saves a palette via explicit save button", () => {
      render(<InteractiveDemo />);
      fireEvent.click(screen.getByLabelText("Save current palette"));
      expect(localStorageMock.setItem).toHaveBeenCalledWith(
        "evoke-saved-palettes",
        expect.any(String),
      );
    });

    it("shows saved palette count after saving", () => {
      render(<InteractiveDemo />);
      fireEvent.click(screen.getByLabelText("Save current palette"));
      expect(screen.getByText(/Saved Palettes \(1\/12\)/)).toBeDefined();
    });

    it("loads saved palettes from localStorage on mount", () => {
      const savedData = JSON.stringify([
        {
          id: "test-123",
          colors: [{ hex: "#FF0000", name: "Red" }],
          angle: 90,
          savedAt: Date.now(),
        },
      ]);
      localStorageMock.getItem.mockReturnValue(savedData);
      render(<InteractiveDemo />);
      expect(screen.getByText(/Saved Palettes \(1\/12\)/)).toBeDefined();
    });

    it("expands drawer to show saved palette previews", () => {
      localStorageMock.getItem.mockReturnValue(
        JSON.stringify([
          {
            id: "test-456",
            colors: [{ hex: "#00FF00", name: "Green" }],
            angle: 45,
            savedAt: Date.now(),
          },
        ]),
      );
      render(<InteractiveDemo />);
      fireEvent.click(screen.getByText(/Saved Palettes/));
      // The drawer should be visible and show a restore button
      expect(screen.getAllByRole("button").some((btn) =>
        btn.getAttribute("aria-label")?.includes("Restore saved palette")
      )).toBe(true);
    });

    it("caps saved palettes at 12", () => {
      render(<InteractiveDemo />);
      // Save 13 palettes
      for (let i = 0; i < 13; i++) {
        fireEvent.click(screen.getByLabelText("Save current palette"));
      }
      expect(screen.getByText(/Saved Palettes \(12\/12\)/)).toBeDefined();
      // Verify only 12 were stored
      const calls = localStorageMock.setItem.mock.calls;
      const lastCall = calls[calls.length - 1];
      expect(lastCall).toBeDefined();
      const stored = JSON.parse(lastCall![1] as string);
      expect(stored).toHaveLength(12);
    });
  });

  // FIX 4: CSS export tests
  describe("CSS export", () => {
    it("renders Tailwind copy button", () => {
      render(<InteractiveDemo />);
      expect(screen.getByLabelText("Copy as Tailwind config")).toBeDefined();
    });

    it("renders full CSS block with CSS custom properties", () => {
      render(<InteractiveDemo />);
      expect(screen.getByText(/--evoke-primary:/)).toBeDefined();
      expect(screen.getByText(/--evoke-secondary:/)).toBeDefined();
      expect(screen.getByText(/--evoke-accent:/)).toBeDefined();
      expect(screen.getByText(/--evoke-highlight:/)).toBeDefined();
      expect(screen.getByText(/--evoke-base:/)).toBeDefined();
      expect(screen.getByText(/--evoke-gradient:/)).toBeDefined();
    });

    it("renders :root block in CSS output", () => {
      render(<InteractiveDemo />);
      expect(screen.getByText(/:root/)).toBeDefined();
    });

    it("copies full CSS block to clipboard on copy click", () => {
      render(<InteractiveDemo />);
      fireEvent.click(screen.getByLabelText("Copy CSS to clipboard"));
      const calls = vi.mocked(navigator.clipboard.writeText).mock.calls;
      expect(calls.length).toBeGreaterThan(0);
      const lastCall = calls[0];
      expect(lastCall?.[0]).toContain(":root {");
      expect(lastCall?.[0]).toContain("--evoke-primary:");
      expect(lastCall?.[0]).toContain("--evoke-gradient:");
    });

    it("copies Tailwind config on Tailwind button click", () => {
      render(<InteractiveDemo />);
      fireEvent.click(screen.getByLabelText("Copy as Tailwind config"));
      const calls = vi.mocked(navigator.clipboard.writeText).mock.calls;
      expect(calls.length).toBeGreaterThan(0);
      const lastCall = calls[calls.length - 1];
      expect(lastCall?.[0]).toContain("colors:");
      expect(lastCall?.[0]).toContain("evoke-primary");
      expect(lastCall?.[0]).toContain("evoke-secondary");
    });
  });
});
