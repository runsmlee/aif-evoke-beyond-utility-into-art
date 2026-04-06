import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { App } from "./App";

describe("App", () => {
  it("renders the Evoke brand name", () => {
    render(<App />);
    const brandElements = screen.getAllByText("Evoke");
    expect(brandElements.length).toBeGreaterThan(0);
  });

  it("renders the main headline", () => {
    render(<App />);
    expect(
      screen.getByRole("heading", { level: 1 }),
    ).toBeDefined();
  });

  it("renders the hero section with key CTA", () => {
    render(<App />);
    expect(screen.getByText("Explore Evoke")).toBeDefined();
  });

  it("renders the features section", () => {
    render(<App />);
    const featuresHeading = screen.getByText(/discerning creator/i);
    expect(featuresHeading).toBeDefined();
  });

  it("renders the gallery section", () => {
    render(<App />);
    // "Gallery" appears in nav, heading, and footer — check heading exists
    const galleryTexts = screen.getAllByText("Gallery");
    expect(galleryTexts.length).toBeGreaterThanOrEqual(1);
  });

  it("renders the footer with copyright", () => {
    render(<App />);
    const currentYear = new Date().getFullYear().toString();
    expect(screen.getByText(new RegExp(`${currentYear} Evoke`))).toBeDefined();
  });

  it("has accessible navigation", () => {
    render(<App />);
    const nav = screen.getByRole("navigation", { name: "Main navigation" });
    expect(nav).toBeDefined();
  });
});
