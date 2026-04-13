import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { Footer } from "./Footer";

// Mock the API module
vi.mock("../utils/api", () => ({
  subscribeEmail: vi.fn().mockResolvedValue(undefined),
}));

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

  it("renders social media links with external URLs", () => {
    render(<Footer />);
    const twitterLink = screen.getByLabelText("Evoke on Twitter");
    expect(twitterLink).toHaveAttribute("href", "https://x.com/evokeapp");
    expect(twitterLink).toHaveAttribute("target", "_blank");
    expect(twitterLink).toHaveAttribute("rel", "noopener noreferrer");

    const githubLink = screen.getByLabelText("Evoke on GitHub");
    expect(githubLink).toHaveAttribute("href", "https://github.com/evokeapp");
    expect(githubLink).toHaveAttribute("target", "_blank");

    const linkedinLink = screen.getByLabelText("Evoke on LinkedIn");
    expect(linkedinLink).toHaveAttribute("href", "https://linkedin.com/company/evokeapp");
    expect(linkedinLink).toHaveAttribute("target", "_blank");
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

  it("shows success message on valid email submit", async () => {
    render(<Footer />);
    const input = screen.getByLabelText("Email address for newsletter");
    const submitButton = screen.getByLabelText("Subscribe to newsletter");

    fireEvent.change(input, { target: { value: "test@example.com" } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText(/subscribed/i)).toBeDefined();
    });
  });

  it("calls subscribeEmail on valid submit", async () => {
    const { subscribeEmail } = await import("../utils/api");
    render(<Footer />);
    const input = screen.getByLabelText("Email address for newsletter");
    const submitButton = screen.getByLabelText("Subscribe to newsletter");

    fireEvent.change(input, { target: { value: "test@example.com" } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(subscribeEmail).toHaveBeenCalledWith("test@example.com", "footer-newsletter");
    });
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

  it("legal links use proper paths instead of '#'", () => {
    render(<Footer />);
    expect(screen.getByText("Privacy").closest("a")).toHaveAttribute("href", "/privacy");
    expect(screen.getByText("Terms").closest("a")).toHaveAttribute("href", "/terms");
    expect(screen.getByText("Cookies").closest("a")).toHaveAttribute("href", "/cookies");
  });

  it("footer nav links use proper paths instead of '#'", () => {
    render(<Footer />);
    expect(screen.getByText("Changelog").closest("a")).toHaveAttribute("href", "/changelog");
    expect(screen.getByText("About").closest("a")).toHaveAttribute("href", "/about");
    expect(screen.getByText("Blog").closest("a")).toHaveAttribute("href", "/blog");
    expect(screen.getByText("Careers").closest("a")).toHaveAttribute("href", "/careers");
    expect(screen.getByText("Documentation").closest("a")).toHaveAttribute("href", "/docs");
    expect(screen.getByText("Help Center").closest("a")).toHaveAttribute("href", "/help");
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

  it("brand logo links to home with /", () => {
    render(<Footer />);
    const brandLink = screen.getByLabelText("Evoke — Home");
    expect(brandLink).toHaveAttribute("href", "/");
  });
});
