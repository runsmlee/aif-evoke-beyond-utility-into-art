import { render, screen, waitFor } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { App } from "./App";

describe("App", () => {
  it("renders the skip-to-content link for accessibility", () => {
    render(<App />);
    const skipLink = screen.getByText("Skip to content");
    expect(skipLink).toBeDefined();
    expect(skipLink).toHaveAttribute("href", "#main-content");
  });

  it("renders the main headline", () => {
    render(<App />);
    expect(screen.getByRole("heading", { level: 1 })).toBeDefined();
  });

  it("renders the hero section with key CTA", () => {
    render(<App />);
    expect(screen.getByText("Explore Evoke")).toBeDefined();
  });

  it("has a main content landmark", () => {
    render(<App />);
    const main = screen.getByRole("main");
    expect(main).toBeDefined();
    expect(main).toHaveAttribute("id", "main-content");
  });

  it("renders the Evoke brand name after lazy-loaded Header resolves", async () => {
    render(<App />);
    await waitFor(() => {
      const brandElements = screen.getAllByText("Evoke");
      expect(brandElements.length).toBeGreaterThan(0);
    });
  });

  it("has accessible main navigation after Header loads", async () => {
    render(<App />);
    await waitFor(() => {
      const nav = screen.getByRole("navigation", { name: "Main navigation" });
      expect(nav).toBeDefined();
    });
  });

  it("renders lazy-loaded sections after suspense resolves", async () => {
    render(<App />);

    await waitFor(() => {
      expect(screen.getByText(/discerning creator/i)).toBeDefined();
    });

    await waitFor(() => {
      expect(screen.getByText(/creative craft/i)).toBeDefined();
    });
  });
});
