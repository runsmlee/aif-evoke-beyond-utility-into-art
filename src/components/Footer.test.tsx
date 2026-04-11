import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { Footer } from "./Footer";

describe("Footer", () => {
  it("renders the Evoke brand name", () => {
    render(<Footer />);
    const brandElements = screen.getAllByText("Evoke");
    expect(brandElements.length).toBeGreaterThan(0);
  });

  it("renders the tagline", () => {
    render(<Footer />);
    expect(screen.getByText(/Beyond utility, into art/i)).toBeDefined();
  });

  it("renders all footer link columns", () => {
    render(<Footer />);
    expect(screen.getByText("Product")).toBeDefined();
    expect(screen.getByText("Company")).toBeDefined();
    expect(screen.getByText("Support")).toBeDefined();
  });

  it("renders product links", () => {
    render(<Footer />);
    expect(screen.getByText("Features")).toBeDefined();
    expect(screen.getByText("Gallery")).toBeDefined();
    expect(screen.getByText("Changelog")).toBeDefined();
  });

  it("renders company links", () => {
    render(<Footer />);
    expect(screen.getByText("About")).toBeDefined();
    expect(screen.getByText("Blog")).toBeDefined();
    expect(screen.getByText("Careers")).toBeDefined();
  });

  it("renders support links", () => {
    render(<Footer />);
    expect(screen.getByText("Documentation")).toBeDefined();
    expect(screen.getByText("Help Center")).toBeDefined();
    expect(screen.getByText("Community")).toBeDefined();
    expect(screen.getByText("Status")).toBeDefined();
  });

  it("renders social media links", () => {
    render(<Footer />);
    expect(screen.getByLabelText("Evoke on Twitter")).toBeDefined();
    expect(screen.getByLabelText("Evoke on GitHub")).toBeDefined();
    expect(screen.getByLabelText("Evoke on LinkedIn")).toBeDefined();
  });

  it("renders the newsletter signup form", () => {
    render(<Footer />);
    expect(screen.getByLabelText("Email address for newsletter")).toBeDefined();
    expect(screen.getByLabelText("Subscribe to newsletter")).toBeDefined();
  });

  it("renders the Stay inspired heading", () => {
    render(<Footer />);
    expect(screen.getByText("Stay inspired")).toBeDefined();
  });

  it("shows success message on valid email submit", () => {
    render(<Footer />);
    const input = screen.getByLabelText("Email address for newsletter");
    const submitButton = screen.getByLabelText("Subscribe to newsletter");

    fireEvent.change(input, { target: { value: "test@example.com" } });
    fireEvent.click(submitButton);

    expect(screen.getByText(/subscribed/i)).toBeDefined();
  });

  it("does not submit with invalid email", () => {
    render(<Footer />);
    const input = screen.getByLabelText("Email address for newsletter");
    const submitButton = screen.getByLabelText("Subscribe to newsletter");

    fireEvent.change(input, { target: { value: "invalid" } });
    fireEvent.click(submitButton);

    expect(screen.queryByText(/subscribed/i)).toBeNull();
  });

  it("renders the copyright notice with current year", () => {
    render(<Footer />);
    const currentYear = new Date().getFullYear();
    expect(screen.getByText(new RegExp(`${currentYear} Evoke`))).toBeDefined();
  });

  it("renders legal links", () => {
    render(<Footer />);
    expect(screen.getByText("Privacy")).toBeDefined();
    expect(screen.getByText("Terms")).toBeDefined();
    expect(screen.getByText("Cookies")).toBeDefined();
  });

  it("has accessible footer landmark", () => {
    render(<Footer />);
    const footer = screen.getByRole("contentinfo");
    expect(footer).toBeDefined();
    expect(footer).toHaveAttribute("aria-label", "Site footer");
  });

  it("has accessible legal navigation", () => {
    render(<Footer />);
    const legalNav = screen.getByRole("navigation", { name: "Legal links" });
    expect(legalNav).toBeDefined();
  });
});
