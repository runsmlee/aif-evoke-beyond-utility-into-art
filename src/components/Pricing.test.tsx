import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { Pricing } from "./Pricing";

describe("Pricing", () => {
  it("renders the pricing section heading", () => {
    render(<Pricing />);
    expect(screen.getByText(/creative craft/i)).toBeDefined();
  });

  it("renders the Pricing label", () => {
    render(<Pricing />);
    expect(screen.getByText("Pricing")).toBeDefined();
  });

  it("renders all three pricing tiers", () => {
    render(<Pricing />);
    expect(screen.getByText("Starter")).toBeDefined();
    expect(screen.getByText("Pro")).toBeDefined();
    expect(screen.getByText("Studio")).toBeDefined();
  });

  it("renders feature lists for each tier", () => {
    render(<Pricing />);
    expect(screen.getByText("5 creative projects")).toBeDefined();
    expect(screen.getByText("Unlimited projects")).toBeDefined();
    expect(screen.getByText("Team collaboration")).toBeDefined();
  });

  it("renders CTA buttons for each tier", () => {
    render(<Pricing />);
    expect(screen.getByText("Start Free")).toBeDefined();
    expect(screen.getByText("Start Creating")).toBeDefined();
    expect(screen.getByText("Contact Sales")).toBeDefined();
  });

  it("renders the Most Popular badge on Pro tier", () => {
    render(<Pricing />);
    expect(screen.getByText("Most Popular")).toBeDefined();
  });

  it("renders the billing toggle switch", () => {
    render(<Pricing />);
    expect(screen.getByLabelText("Toggle annual billing")).toBeDefined();
  });

  it("renders Monthly and Annual labels", () => {
    render(<Pricing />);
    expect(screen.getByText("Monthly")).toBeDefined();
    expect(screen.getByText("Annual")).toBeDefined();
  });

  it("shows annual pricing when toggle is clicked", () => {
    render(<Pricing />);
    const toggle = screen.getByLabelText("Toggle annual billing");
    fireEvent.click(toggle);
    // Annual prices should now be displayed - multiple "Save 20%" elements appear
    const saveBadges = screen.getAllByText(/Save 20%/);
    expect(saveBadges.length).toBeGreaterThan(0);
  });

  it("renders monthly price for Pro tier by default", () => {
    render(<Pricing />);
    expect(screen.getByText("$19")).toBeDefined();
  });

  it("switches to annual pricing on toggle", () => {
    render(<Pricing />);
    const toggle = screen.getByLabelText("Toggle annual billing");
    fireEvent.click(toggle);
    // Annual price for Pro tier
    expect(screen.getByText("$15")).toBeDefined();
  });

  it("has an accessible section with heading", () => {
    render(<Pricing />);
    const heading = screen.getByRole("heading", { level: 2, name: /creative craft/i });
    expect(heading).toBeDefined();
    const section = heading.closest("section");
    expect(section).toBeDefined();
    expect(section?.getAttribute("aria-labelledby")).toBe("pricing-heading");
  });

  it("has the pricing section with correct id", () => {
    render(<Pricing />);
    const section = document.getElementById("pricing");
    expect(section).not.toBeNull();
  });

  it("billing toggle has correct switch role", () => {
    render(<Pricing />);
    const toggle = screen.getByRole("switch");
    expect(toggle).toHaveAttribute("aria-checked", "false");
    fireEvent.click(toggle);
    expect(toggle).toHaveAttribute("aria-checked", "true");
  });

  it("clicking Monthly label switches to monthly billing", () => {
    render(<Pricing />);
    // First switch to annual
    const toggle = screen.getByRole("switch");
    fireEvent.click(toggle);
    expect(toggle).toHaveAttribute("aria-checked", "true");

    // Click Monthly label to switch back
    const monthlyButton = screen.getByLabelText("Select monthly billing");
    fireEvent.click(monthlyButton);
    expect(toggle).toHaveAttribute("aria-checked", "false");
  });

  it("clicking Annual label switches to annual billing", () => {
    render(<Pricing />);
    const annualButton = screen.getByLabelText("Select annual billing");
    fireEvent.click(annualButton);
    const toggle = screen.getByRole("switch");
    expect(toggle).toHaveAttribute("aria-checked", "true");
  });

  it("renders the description text", () => {
    render(<Pricing />);
    expect(screen.getByText(/Simple, transparent pricing/i)).toBeDefined();
  });

  it("renders tier descriptions", () => {
    render(<Pricing />);
    expect(screen.getByText("Perfect for exploring your creative potential.")).toBeDefined();
    expect(screen.getByText("For creators ready to push boundaries.")).toBeDefined();
    expect(screen.getByText("For teams crafting at the highest level.")).toBeDefined();
  });
});
