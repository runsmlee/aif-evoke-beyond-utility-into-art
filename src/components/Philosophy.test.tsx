import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { Philosophy } from "./Philosophy";

describe("Philosophy", () => {
  it("renders the section with correct heading", () => {
    render(<Philosophy />);
    const heading = screen.getByRole("heading", { level: 2 });
    expect(heading).toBeDefined();
    expect(heading.textContent).toContain("inspire");
  });

  it("renders the section label", () => {
    render(<Philosophy />);
    expect(screen.getByText("Our Philosophy")).toBeDefined();
  });

  it("renders the supporting paragraph", () => {
    render(<Philosophy />);
    expect(screen.getByText(/Every interface is a conversation/i)).toBeDefined();
  });

  it("renders interactive word chips", () => {
    render(<Philosophy />);
    expect(screen.getByLabelText("Intentional design principle")).toBeDefined();
    expect(screen.getByLabelText("Emotional design principle")).toBeDefined();
    expect(screen.getByLabelText("Meticulous design principle")).toBeDefined();
    expect(screen.getByLabelText("Human design principle")).toBeDefined();
  });

  it("has the philosophy section with aria-labelledby", () => {
    render(<Philosophy />);
    const section = document.querySelector("section[aria-labelledby='philosophy-heading']");
    expect(section).not.toBeNull();
  });

  it("renders floating decorative words", () => {
    render(<Philosophy />);
    expect(screen.getByText("Imagine")).toBeDefined();
    expect(screen.getByText("Craft")).toBeDefined();
    expect(screen.getByText("Feel")).toBeDefined();
  });

  it("word chips have aria-pressed attribute for accessibility", () => {
    render(<Philosophy />);
    const intentionalChip = screen.getByLabelText("Intentional design principle");
    expect(intentionalChip).toHaveAttribute("aria-pressed", "false");

    fireEvent.click(intentionalChip);
    expect(intentionalChip).toHaveAttribute("aria-pressed", "true");
  });

  it("word chips respond to click to toggle pressed state", () => {
    render(<Philosophy />);
    const emotionalChip = screen.getByLabelText("Emotional design principle");
    expect(emotionalChip).toHaveAttribute("aria-pressed", "false");

    fireEvent.click(emotionalChip);
    expect(emotionalChip).toHaveAttribute("aria-pressed", "true");

    fireEvent.click(emotionalChip);
    expect(emotionalChip).toHaveAttribute("aria-pressed", "false");
  });
});
