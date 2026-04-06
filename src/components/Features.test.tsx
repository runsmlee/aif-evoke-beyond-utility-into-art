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
});
