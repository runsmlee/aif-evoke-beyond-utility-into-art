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
});
