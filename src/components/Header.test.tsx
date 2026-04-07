import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { Header } from "./Header";

describe("Header", () => {
  it("renders the Evoke logo and brand name", () => {
    render(<Header />);
    expect(screen.getByText("Evoke")).toBeDefined();
  });

  it("renders desktop navigation links", () => {
    render(<Header />);
    expect(screen.getByText("Features")).toBeDefined();
    expect(screen.getByText("Gallery")).toBeDefined();
    expect(screen.getByText("Voices")).toBeDefined();
    // "Pricing" appears in both nav and CTA area — verify at least one exists
    const pricingLinks = screen.getAllByText("Pricing");
    expect(pricingLinks.length).toBeGreaterThanOrEqual(1);
  });

  it("renders the Get Started CTA button", () => {
    render(<Header />);
    const ctaButtons = screen.getAllByText("Get Started");
    expect(ctaButtons.length).toBeGreaterThan(0);
  });

  it("toggles mobile menu on button click", () => {
    render(<Header />);
    const menuButton = screen.getByLabelText("Open menu");

    // Open menu
    fireEvent.click(menuButton);
    expect(screen.getByLabelText("Close menu")).toBeDefined();
    expect(screen.getByRole("navigation", { name: "Mobile navigation" })).toBeDefined();

    // Close menu
    const closeButton = screen.getByLabelText("Close menu");
    fireEvent.click(closeButton);
    expect(screen.getByLabelText("Open menu")).toBeDefined();
  });

  it("has accessible main navigation landmark", () => {
    render(<Header />);
    const nav = screen.getByRole("navigation", { name: "Main navigation" });
    expect(nav).toBeDefined();
  });
});
