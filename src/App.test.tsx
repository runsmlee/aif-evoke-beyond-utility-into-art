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

  it("renders the 'Try the Demo' CTA link", () => {
    render(<App />);
    expect(screen.getByText("Try the Demo")).toBeDefined();
  });

  it("has a main content landmark", () => {
    render(<App />);
    const main = screen.getByRole("main");
    expect(main).toBeDefined();
    expect(main).toHaveAttribute("id", "main-content");
  });

  it("renders the Evoke brand name in the Header", () => {
    render(<App />);
    const brandElements = screen.getAllByText("Evoke");
    expect(brandElements.length).toBeGreaterThan(0);
  });

  it("has accessible main navigation in the Header", () => {
    render(<App />);
    const nav = screen.getByRole("navigation", { name: "Main navigation" });
    expect(nav).toBeDefined();
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

  it("renders the Philosophy section after lazy load", async () => {
    render(<App />);
    await waitFor(() => {
      expect(screen.getByText(/Our Philosophy/i)).toBeDefined();
    });
  });

  it("renders the Interactive Demo section after lazy load", async () => {
    render(<App />);
    await waitFor(() => {
      // "Create your" heading text is split across elements, so use heading role
      const demoHeading = document.getElementById("demo-heading");
      expect(demoHeading).not.toBeNull();
    });
  });
});
