import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { LogoCloud } from "./LogoCloud";

describe("LogoCloud", () => {
  it("renders the trusted-by heading text", () => {
    render(<LogoCloud />);
    expect(screen.getByText(/Trusted by teams/i)).toBeDefined();
  });

  it("has an accessible section label", () => {
    render(<LogoCloud />);
    const section = screen.getByLabelText("Trusted by leading companies");
    expect(section).toBeDefined();
  });

  it("renders company logo names in the accessible list", () => {
    render(<LogoCloud />);
    expect(screen.getAllByText("Adobe").length).toBeGreaterThan(0);
    expect(screen.getAllByText("Figma").length).toBeGreaterThan(0);
    expect(screen.getAllByText("Spotify").length).toBeGreaterThan(0);
    expect(screen.getAllByText("Stripe").length).toBeGreaterThan(0);
    expect(screen.getAllByText("Notion").length).toBeGreaterThan(0);
    expect(screen.getAllByText("Vercel").length).toBeGreaterThan(0);
  });

  it("renders the additional logos", () => {
    render(<LogoCloud />);
    expect(screen.getAllByText("Linear").length).toBeGreaterThan(0);
    expect(screen.getAllByText("Framer").length).toBeGreaterThan(0);
  });
});
