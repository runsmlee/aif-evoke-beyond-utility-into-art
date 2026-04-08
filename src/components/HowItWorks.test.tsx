import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { HowItWorks } from "./HowItWorks";

describe("HowItWorks", () => {
  it("renders the section heading", () => {
    render(<HowItWorks />);
    expect(screen.getByText(/From idea to/i)).toBeDefined();
    expect(screen.getByText("masterpiece")).toBeDefined();
  });

  it("renders all four steps", () => {
    render(<HowItWorks />);
    expect(screen.getByText("Sign Up")).toBeDefined();
    expect(screen.getByText("Create")).toBeDefined();
    expect(screen.getByText("Collaborate")).toBeDefined();
    expect(screen.getByText("Share")).toBeDefined();
  });

  it("renders step descriptions", () => {
    render(<HowItWorks />);
    expect(screen.getByText(/Create your free account/i)).toBeDefined();
    expect(screen.getByText(/Explore powerful creative tools/i)).toBeDefined();
  });

  it("has an accessible section with heading", () => {
    render(<HowItWorks />);
    const heading = screen.getByRole("heading", { level: 2, name: /From idea to/i });
    expect(heading).toBeDefined();
    const section = heading.closest("section");
    expect(section).toBeDefined();
    expect(section?.getAttribute("aria-labelledby")).toBe("how-it-works-heading");
  });
});
