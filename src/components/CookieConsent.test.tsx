import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, beforeEach } from "vitest";
import { CookieConsent } from "./CookieConsent";

describe("CookieConsent", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("renders the cookie consent banner when not yet accepted", () => {
    render(<CookieConsent />);
    expect(
      screen.getByText(/We use cookies to enhance your experience/i),
    ).toBeDefined();
  });

  it("does not render banner when cookies already accepted", () => {
    localStorage.setItem("evoke-cookie-consent", "accepted");
    render(<CookieConsent />);
    expect(
      screen.queryByText(/We use cookies to enhance your experience/i),
    ).toBeNull();
  });

  it("renders the Accept button", () => {
    render(<CookieConsent />);
    expect(screen.getByText("Accept")).toBeDefined();
  });

  it("renders the Decline button", () => {
    render(<CookieConsent />);
    expect(screen.getByText("Decline")).toBeDefined();
  });

  it("stores consent in localStorage when Accept is clicked", () => {
    render(<CookieConsent />);
    fireEvent.click(screen.getByText("Accept"));
    expect(localStorage.getItem("evoke-cookie-consent")).toBe("accepted");
  });

  it("stores decline in localStorage when Decline is clicked", () => {
    render(<CookieConsent />);
    fireEvent.click(screen.getByText("Decline"));
    expect(localStorage.getItem("evoke-cookie-consent")).toBe("declined");
  });

  it("hides banner after Accept is clicked", () => {
    render(<CookieConsent />);
    fireEvent.click(screen.getByText("Accept"));
    expect(
      screen.queryByText(/We use cookies to enhance your experience/i),
    ).toBeNull();
  });

  it("hides banner after Decline is clicked", () => {
    render(<CookieConsent />);
    fireEvent.click(screen.getByText("Decline"));
    expect(
      screen.queryByText(/We use cookies to enhance your experience/i),
    ).toBeNull();
  });

  it("does not render banner when cookies declined", () => {
    localStorage.setItem("evoke-cookie-consent", "declined");
    render(<CookieConsent />);
    expect(
      screen.queryByText(/We use cookies to enhance your experience/i),
    ).toBeNull();
  });

  it("has Privacy link pointing to /privacy", () => {
    render(<CookieConsent />);
    const privacyLink = screen.getByText("Privacy Policy");
    expect(privacyLink).toHaveAttribute("href", "/privacy");
  });

  it("has accessible role as a dialog/banner", () => {
    render(<CookieConsent />);
    const banner = screen.getByRole("region", {
      name: /cookie consent/i,
    });
    expect(banner).toBeDefined();
  });

  it("renders with role=none when dismissed", () => {
    localStorage.setItem("evoke-cookie-consent", "accepted");
    const { container } = render(<CookieConsent />);
    expect(container.innerHTML).toBe("");
  });

  it("decline button has accessible label", () => {
    render(<CookieConsent />);
    const declineButton = screen.getByText("Decline");
    expect(declineButton).toBeDefined();
  });

  it("accept button has accessible label", () => {
    render(<CookieConsent />);
    const acceptButton = screen.getByText("Accept");
    expect(acceptButton).toBeDefined();
  });
});
