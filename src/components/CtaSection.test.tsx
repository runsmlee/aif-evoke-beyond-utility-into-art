import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { CtaSection } from "./CtaSection";

describe("CtaSection", () => {
  it("renders the CTA heading", () => {
    render(<CtaSection />);
    expect(screen.getByText(/Ready to create something extraordinary/i)).toBeDefined();
  });

  it("renders the email input form", () => {
    render(<CtaSection />);
    expect(screen.getByLabelText("Email address for signup")).toBeDefined();
  });

  it("renders trust badges", () => {
    render(<CtaSection />);
    expect(screen.getByText("Free forever plan")).toBeDefined();
    expect(screen.getByText("No credit card required")).toBeDefined();
    expect(screen.getByText("Cancel anytime")).toBeDefined();
  });

  it("shows success message on valid email submit", () => {
    render(<CtaSection />);
    const input = screen.getByLabelText("Email address for signup");
    const submitButton = screen.getByText("Get Started Free");

    fireEvent.change(input, { target: { value: "test@example.com" } });
    fireEvent.click(submitButton);

    expect(screen.getByText(/Welcome aboard/i)).toBeDefined();
  });

  it("does not submit with empty email", () => {
    render(<CtaSection />);
    const submitButton = screen.getByText("Get Started Free");

    fireEvent.click(submitButton);

    // Should NOT show success message
    expect(screen.queryByText(/Welcome aboard/i)).toBeNull();
    // Submit button should still be visible
    expect(screen.getByText("Get Started Free")).toBeDefined();
  });
});
