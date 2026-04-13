import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { CtaSection } from "./CtaSection";

// Mock the API module
vi.mock("../utils/api", () => ({
  subscribeEmail: vi.fn().mockResolvedValue(undefined),
}));

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

  it("shows success message on valid email submit", async () => {
    render(<CtaSection />);
    const input = screen.getByLabelText("Email address for signup");
    const submitButton = screen.getByText("Get Started Free");

    fireEvent.change(input, { target: { value: "test@example.com" } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText(/Welcome aboard/i)).toBeDefined();
    });
  });

  it("calls subscribeEmail with correct arguments on valid submit", async () => {
    const { subscribeEmail } = await import("../utils/api");
    render(<CtaSection />);
    const input = screen.getByLabelText("Email address for signup");
    const submitButton = screen.getByText("Get Started Free");

    fireEvent.change(input, { target: { value: "test@example.com" } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(subscribeEmail).toHaveBeenCalledWith("test@example.com", "cta-section");
    });
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

  it("shows validation error for invalid email on submit", () => {
    render(<CtaSection />);
    const input = screen.getByLabelText("Email address for signup");
    const submitButton = screen.getByText("Get Started Free");

    fireEvent.change(input, { target: { value: "invalid-email" } });
    fireEvent.click(submitButton);

    expect(screen.getByText(/valid email address/i)).toBeDefined();
    expect(screen.queryByText(/Welcome aboard/i)).toBeNull();
  });

  it("shows required error for empty submit", () => {
    render(<CtaSection />);
    const submitButton = screen.getByText("Get Started Free");

    fireEvent.click(submitButton);

    expect(screen.getByRole("alert")).toBeDefined();
    expect(screen.getByRole("alert").textContent).toContain("required");
  });

  it("clears error as user corrects email after touched", () => {
    render(<CtaSection />);
    const input = screen.getByLabelText("Email address for signup");
    const submitButton = screen.getByText("Get Started Free");

    // Submit invalid to trigger error
    fireEvent.change(input, { target: { value: "bad" } });
    fireEvent.click(submitButton);
    expect(screen.getByText(/valid email address/i)).toBeDefined();

    // Fix the email - error should clear
    fireEvent.change(input, { target: { value: "good@example.com" } });
    expect(screen.queryByText(/valid email address/i)).toBeNull();
  });

  it("shows error when API call fails", async () => {
    const { subscribeEmail } = await import("../utils/api");
    vi.mocked(subscribeEmail).mockRejectedValueOnce(new Error("Network error"));

    render(<CtaSection />);
    const input = screen.getByLabelText("Email address for signup");
    const submitButton = screen.getByText("Get Started Free");

    fireEvent.change(input, { target: { value: "test@example.com" } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText(/Something went wrong/i)).toBeDefined();
    });
  });

  it("shows loading state while submitting", async () => {
    // Make the API call hang briefly
    const { subscribeEmail } = await import("../utils/api");
    vi.mocked(subscribeEmail).mockImplementationOnce(
      () => new Promise((resolve) => setTimeout(resolve, 100)),
    );

    render(<CtaSection />);
    const input = screen.getByLabelText("Email address for signup");
    const submitButton = screen.getByText("Get Started Free");

    fireEvent.change(input, { target: { value: "test@example.com" } });
    fireEvent.click(submitButton);

    expect(screen.getByText("Subscribing...")).toBeDefined();

    await waitFor(() => {
      expect(screen.getByText(/Welcome aboard/i)).toBeDefined();
    });
  });

  it("has a contact section with correct id", () => {
    render(<CtaSection />);
    const section = document.getElementById("contact");
    expect(section).not.toBeNull();
  });
});
