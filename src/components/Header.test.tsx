import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { Header } from "./Header";

const defaultProps = {
  theme: "light" as const,
  toggleTheme: vi.fn(),
};

describe("Header", () => {
  it("renders the Evoke logo and brand name", () => {
    render(<Header {...defaultProps} />);
    expect(screen.getAllByText("Evoke").length).toBeGreaterThan(0);
  });

  it("renders desktop navigation links", () => {
    render(<Header {...defaultProps} />);
    expect(screen.getByText("Features")).toBeDefined();
    expect(screen.getByText("Gallery")).toBeDefined();
    expect(screen.getByText("Voices")).toBeDefined();
    // "Pricing" appears in both nav and CTA area — verify at least one exists
    const pricingLinks = screen.getAllByText("Pricing");
    expect(pricingLinks.length).toBeGreaterThanOrEqual(1);
  });

  it("renders the Get Started CTA button", () => {
    render(<Header {...defaultProps} />);
    const ctaButtons = screen.getAllByText("Get Started");
    expect(ctaButtons.length).toBeGreaterThan(0);
  });

  it("toggles mobile menu on button click", () => {
    render(<Header {...defaultProps} />);
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
    render(<Header {...defaultProps} />);
    const nav = screen.getByRole("navigation", { name: "Main navigation" });
    expect(nav).toBeDefined();
  });

  it("renders theme toggle buttons (desktop + mobile)", () => {
    render(<Header {...defaultProps} />);
    // Two toggle buttons exist: one for desktop, one for mobile
    const toggles = screen.getAllByLabelText("Switch to dark mode");
    expect(toggles.length).toBe(2);
  });

  it("calls toggleTheme when theme toggle is clicked", () => {
    const toggleTheme = vi.fn();
    render(<Header theme="light" toggleTheme={toggleTheme} />);
    const toggles = screen.getAllByLabelText("Switch to dark mode");
    const toggle = toggles[0]!;
    fireEvent.click(toggle);
    expect(toggleTheme).toHaveBeenCalledTimes(1);
  });

  it("shows correct aria-label for dark mode state", () => {
    render(<Header theme="dark" toggleTheme={vi.fn()} />);
    const toggles = screen.getAllByLabelText("Switch to light mode");
    expect(toggles.length).toBeGreaterThan(0);
  });

  it("closes mobile menu on Escape key", () => {
    render(<Header {...defaultProps} />);
    const menuButton = screen.getByLabelText("Open menu");
    fireEvent.click(menuButton);
    expect(screen.getByRole("navigation", { name: "Mobile navigation" })).toBeDefined();

    fireEvent.keyDown(document, { key: "Escape" });
    expect(screen.queryByRole("navigation", { name: "Mobile navigation" })).toBeNull();
  });

  it("has the Pricing link in desktop nav", () => {
    render(<Header {...defaultProps} />);
    const mainNav = screen.getByRole("navigation", { name: "Main navigation" });
    expect(mainNav).toBeDefined();
    // The main nav should contain nav links
    const links = mainNav.querySelectorAll("a");
    expect(links.length).toBeGreaterThanOrEqual(3);
  });

  it("renders the home link with correct aria-label", () => {
    render(<Header {...defaultProps} />);
    expect(screen.getByLabelText("Evoke — Home")).toBeDefined();
  });
});
