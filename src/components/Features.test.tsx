import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { Features } from "./Features";

describe("Features", () => {
  it("renders the features section heading", () => {
    render(<Features />);
    expect(screen.getByText(/discerning creator/i)).toBeDefined();
  });

  it("renders all six feature cards", () => {
    render(<Features />);
    expect(screen.getByText("Intentional Design")).toBeDefined();
    expect(screen.getByText("Emotional Resonance")).toBeDefined();
    expect(screen.getByText("Craftsmanship")).toBeDefined();
    expect(screen.getByText("Creative Tools")).toBeDefined();
    expect(screen.getByText("Seamless Flow")).toBeDefined();
    expect(screen.getByText("Community")).toBeDefined();
  });

  it("renders feature descriptions", () => {
    render(<Features />);
    expect(screen.getByText(/Every pixel is placed with purpose/)).toBeDefined();
    expect(screen.getByText(/Tools that understand the human/)).toBeDefined();
  });

  it("has an accessible section with heading", () => {
    render(<Features />);
    const heading = screen.getByRole("heading", { level: 2, name: /discerning creator/i });
    expect(heading).toBeDefined();
    const section = heading.closest("section");
    expect(section).toBeDefined();
    expect(section?.getAttribute("aria-labelledby")).toBe("features-heading");
  });

  it("has the features section id for anchor navigation", () => {
    render(<Features />);
    const section = document.getElementById("features");
    expect(section).not.toBeNull();
  });

  it("renders each feature card with a heading", () => {
    render(<Features />);
    const featureHeadings = [
      "Intentional Design",
      "Emotional Resonance",
      "Craftsmanship",
      "Creative Tools",
      "Seamless Flow",
      "Community",
    ];
    for (const title of featureHeadings) {
      const heading = screen.getByRole("heading", { level: 3, name: title });
      expect(heading).toBeDefined();
    }
  });

  it("renders feature section label", () => {
    render(<Features />);
    expect(screen.getByText("Features")).toBeDefined();
  });

  it("renders the section subtitle", () => {
    render(<Features />);
    expect(screen.getByText(/Every feature is crafted/)).toBeDefined();
  });
});
