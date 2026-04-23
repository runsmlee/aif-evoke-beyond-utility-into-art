import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { Faq } from "./Faq";

describe("Faq", () => {
  it("renders the FAQ section heading", () => {
    render(<Faq />);
    expect(screen.getByRole("heading", { level: 2, name: /Common/i })).toBeDefined();
  });

  it("renders all FAQ questions", () => {
    render(<Faq />);
    expect(screen.getByText(/What makes Evoke different/i)).toBeDefined();
    expect(screen.getByText(/Is there a free plan/i)).toBeDefined();
    expect(screen.getByText(/Can I collaborate/i)).toBeDefined();
  });

  it("expands an answer when question is clicked", () => {
    render(<Faq />);
    const firstQuestion = screen.getByText(/What makes Evoke different/i);
    const button = firstQuestion.closest("button")!;

    // Answer should be hidden initially
    expect(button).toHaveAttribute("aria-expanded", "false");

    // Click to expand
    fireEvent.click(button);
    expect(button).toHaveAttribute("aria-expanded", "true");
    expect(screen.getByText(/goes beyond utility/i)).toBeDefined();
  });

  it("collapses previous answer when another is clicked", () => {
    render(<Faq />);
    const questions = screen.getAllByRole("button", { expanded: false });

    // Open first question
    fireEvent.click(questions[0]!);
    expect(questions[0]).toHaveAttribute("aria-expanded", "true");

    // Open second question
    fireEvent.click(questions[1]!);
    expect(questions[0]).toHaveAttribute("aria-expanded", "false");
    expect(questions[1]).toHaveAttribute("aria-expanded", "true");
  });

  it("has accessible section with heading", () => {
    render(<Faq />);
    const heading = screen.getByRole("heading", { level: 2, name: /Common/i });
    expect(heading).toBeDefined();
    const section = heading.closest("section");
    expect(section?.getAttribute("aria-labelledby")).toBe("faq-heading");
  });

  it("navigates to next FAQ item with ArrowDown key", () => {
    render(<Faq />);
    const buttons = screen.getAllByRole("button", { expanded: false });
    expect(buttons.length).toBeGreaterThanOrEqual(2);

    // Press ArrowDown on first button — focus should move to second
    fireEvent.keyDown(buttons[0]!, { key: "ArrowDown" });
    expect(document.activeElement).toBe(buttons[1]);
  });

  it("navigates to previous FAQ item with ArrowUp key", () => {
    render(<Faq />);
    const buttons = screen.getAllByRole("button", { expanded: false });

    // Press ArrowUp on first button — should wrap to last
    fireEvent.keyDown(buttons[0]!, { key: "ArrowUp" });
    expect(document.activeElement).toBe(buttons[buttons.length - 1]);
  });

  it("navigates to first FAQ item with Home key", () => {
    render(<Faq />);
    const buttons = screen.getAllByRole("button", { expanded: false });

    // Focus last button, press Home
    fireEvent.keyDown(buttons[buttons.length - 1]!, { key: "Home" });
    expect(document.activeElement).toBe(buttons[0]);
  });

  it("navigates to last FAQ item with End key", () => {
    render(<Faq />);
    const buttons = screen.getAllByRole("button", { expanded: false });

    // Press End on first button
    fireEvent.keyDown(buttons[0]!, { key: "End" });
    expect(document.activeElement).toBe(buttons[buttons.length - 1]);
  });

  it("navigates with ArrowRight and ArrowLeft keys", () => {
    render(<Faq />);
    const buttons = screen.getAllByRole("button", { expanded: false });

    // ArrowRight on first moves to second
    fireEvent.keyDown(buttons[0]!, { key: "ArrowRight" });
    expect(document.activeElement).toBe(buttons[1]);

    // ArrowLeft on second moves back to first
    fireEvent.keyDown(buttons[1]!, { key: "ArrowLeft" });
    expect(document.activeElement).toBe(buttons[0]);
  });

  it("wraps around when navigating past the last item", () => {
    render(<Faq />);
    const buttons = screen.getAllByRole("button", { expanded: false });

    // ArrowDown on last wraps to first
    fireEvent.keyDown(buttons[buttons.length - 1]!, { key: "ArrowDown" });
    expect(document.activeElement).toBe(buttons[0]);
  });

  it("has a group role for the FAQ list container", () => {
    render(<Faq />);
    const group = screen.getByRole("group", { name: /frequently asked questions/i });
    expect(group).toBeDefined();
  });
});
