import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { InteractiveDemo } from "./InteractiveDemo";

describe("InteractiveDemo", () => {
  it("renders the section heading", () => {
    render(<InteractiveDemo />);
    expect(screen.getByText(/Create your/i)).toBeDefined();
  });

  it("renders the section label", () => {
    render(<InteractiveDemo />);
    expect(screen.getByText("Try It")).toBeDefined();
  });

  it("renders the description text", () => {
    render(<InteractiveDemo />);
    expect(screen.getByText(/Mix, match, and explore/i)).toBeDefined();
  });

  it("renders the shuffle button", () => {
    render(<InteractiveDemo />);
    expect(screen.getByLabelText("Shuffle color order")).toBeDefined();
  });

  it("renders the mix button", () => {
    render(<InteractiveDemo />);
    expect(screen.getByLabelText("Generate random color variations")).toBeDefined();
  });

  it("renders the gradient preview", () => {
    render(<InteractiveDemo />);
    const preview = screen.getByRole("img", { name: /Gradient preview/i });
    expect(preview).toBeDefined();
  });

  it("renders angle presets", () => {
    render(<InteractiveDemo />);
    expect(screen.getByLabelText("Set angle to 90 degrees")).toBeDefined();
    expect(screen.getByLabelText("Set angle to 135 degrees")).toBeDefined();
  });

  it("renders palette selector", () => {
    render(<InteractiveDemo />);
    expect(screen.getByLabelText("Palette 1")).toBeDefined();
    expect(screen.getByLabelText("Palette 2")).toBeDefined();
    expect(screen.getByLabelText("Palette 3")).toBeDefined();
  });

  it("renders color swatch buttons", () => {
    render(<InteractiveDemo />);
    expect(screen.getByLabelText(/Copy Primary color/i)).toBeDefined();
  });

  it("renders the CSS output section", () => {
    render(<InteractiveDemo />);
    expect(screen.getByText("CSS")).toBeDefined();
  });

  it("renders copy CSS button", () => {
    render(<InteractiveDemo />);
    expect(screen.getByLabelText("Copy CSS to clipboard")).toBeDefined();
  });

  it("has the demo section with id", () => {
    render(<InteractiveDemo />);
    const section = document.getElementById("demo");
    expect(section).not.toBeNull();
  });
});
