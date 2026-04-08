import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { LogoCloud } from "./LogoCloud";

describe("LogoCloud", () => {
  it("renders the section with company logos", () => {
    render(<LogoCloud />);
    expect(screen.getByText("Adobe")).toBeDefined();
    expect(screen.getByText("Figma")).toBeDefined();
    expect(screen.getByText("Spotify")).toBeDefined();
    expect(screen.getByText("Stripe")).toBeDefined();
    expect(screen.getByText("Notion")).toBeDefined();
    expect(screen.getByText("Vercel")).toBeDefined();
  });

  it("renders the trusted-by heading text", () => {
    render(<LogoCloud />);
    expect(screen.getByText(/Trusted by teams/i)).toBeDefined();
  });

  it("has an accessible section label", () => {
    render(<LogoCloud />);
    const section = screen.getByLabelText("Trusted by leading companies");
    expect(section).toBeDefined();
  });
});
