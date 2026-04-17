import { render, screen, fireEvent } from "@testing-library/react";
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

  it("has carousel region with aria-roledescription", () => {
    render(<Testimonials />);
    const region = screen.getByRole("region", { name: /Testimonials carousel/i });
    expect(region).toBeDefined();
    expect(region).toHaveAttribute("aria-roledescription", "carousel");
  });

  it("renders mobile navigation dots", () => {
    render(<Testimonials />);
    const tablist = screen.getByRole("tablist", { name: "Testimonial navigation" });
    expect(tablist).toBeDefined();
    const dots = tablist.querySelectorAll('button[role="tab"]');
    expect(dots.length).toBe(3);
  });

  it("navigates to a specific testimonial when dot is clicked", () => {
    render(<Testimonials />);
    const dots = screen.getAllByRole("tab");
    // Click the second dot
    fireEvent.click(dots[1]!);
    // The second dot should be selected
    expect(dots[1]).toHaveAttribute("aria-selected", "true");
    expect(dots[0]).toHaveAttribute("aria-selected", "false");
  });

  it("blockquotes have slide role descriptions", () => {
    render(<Testimonials />);
    const quotes = document.querySelectorAll("blockquote");
    expect(quotes[0]).toHaveAttribute("aria-roledescription", "slide");
    expect(quotes[0]).toHaveAttribute("aria-label", "Testimonial 1 of 3");
    expect(quotes[1]).toHaveAttribute("aria-label", "Testimonial 2 of 3");
    expect(quotes[2]).toHaveAttribute("aria-label", "Testimonial 3 of 3");
  });

  it("non-active slides have aria-hidden for screen reader accessibility", () => {
    render(<Testimonials />);
    const quotes = document.querySelectorAll("blockquote");
    // First slide is active by default, so it should NOT have aria-hidden
    expect(quotes[0]).not.toHaveAttribute("aria-hidden");
    // Second and third slides should have aria-hidden since they are not active
    expect(quotes[1]).toHaveAttribute("aria-hidden", "true");
    expect(quotes[2]).toHaveAttribute("aria-hidden", "true");
  });

  it("updates aria-hidden when navigating to a different slide", () => {
    render(<Testimonials />);
    const dots = screen.getAllByRole("tab");
    const quotes = document.querySelectorAll("blockquote");

    // Click second dot
    fireEvent.click(dots[1]!);

    // Now second slide should be visible, first and third hidden
    expect(quotes[0]).toHaveAttribute("aria-hidden", "true");
    expect(quotes[1]).not.toHaveAttribute("aria-hidden");
    expect(quotes[2]).toHaveAttribute("aria-hidden", "true");
  });
});
