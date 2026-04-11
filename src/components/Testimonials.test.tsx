import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { Testimonials } from "./Testimonials";

describe("Testimonials", () => {
  it("renders the testimonials section heading", () => {
    render(<Testimonials />);
    expect(screen.getByText(/community/i)).toBeDefined();
  });

  it("renders the Testimonials label", () => {
    render(<Testimonials />);
    expect(screen.getByText("Testimonials")).toBeDefined();
  });

  it("renders all three testimonials", () => {
    render(<Testimonials />);
    expect(screen.getByText("Maya Rodriguez")).toBeDefined();
    expect(screen.getByText("James Chen")).toBeDefined();
    expect(screen.getByText("Aria Nakamura")).toBeDefined();
  });

  it("renders testimonial roles", () => {
    render(<Testimonials />);
    expect(screen.getByText(/Art Director, Studio Volta/i)).toBeDefined();
    expect(screen.getByText(/Senior Designer, Parallel/i)).toBeDefined();
    expect(screen.getByText(/Creative Lead, Bloom Co./i)).toBeDefined();
  });

  it("renders testimonial quotes", () => {
    render(<Testimonials />);
    expect(screen.getByText(/Evoke changed how I think/i)).toBeDefined();
    expect(screen.getByText(/attention to detail is extraordinary/i)).toBeDefined();
    expect(screen.getByText(/makes me smile every time/i)).toBeDefined();
  });

  it("renders author initials", () => {
    render(<Testimonials />);
    expect(screen.getByText("MR")).toBeDefined();
    expect(screen.getByText("JC")).toBeDefined();
    expect(screen.getByText("AN")).toBeDefined();
  });

  it("has an accessible section with heading", () => {
    render(<Testimonials />);
    const heading = screen.getByRole("heading", { level: 2, name: /community/i });
    expect(heading).toBeDefined();
    const section = heading.closest("section");
    expect(section).toBeDefined();
    expect(section?.getAttribute("aria-labelledby")).toBe("testimonials-heading");
  });

  it("has the testimonials section with correct id", () => {
    render(<Testimonials />);
    const section = document.getElementById("testimonials");
    expect(section).not.toBeNull();
  });

  it("renders testimonial cards as blockquotes for accessibility", () => {
    render(<Testimonials />);
    const quotes = document.querySelectorAll("blockquote");
    expect(quotes.length).toBe(3);
  });

  it("renders star ratings for each testimonial", () => {
    render(<Testimonials />);
    const starLabels = screen.getAllByLabelText("5 out of 5 stars");
    expect(starLabels.length).toBe(3);
  });
});
