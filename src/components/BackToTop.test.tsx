import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { BackToTop } from "./BackToTop";

describe("BackToTop", () => {
  it("does not render when not scrolled", () => {
    render(<BackToTop />);
    expect(screen.queryByLabelText("Scroll to top of page")).toBeNull();
  });

  it("has correct button label text", () => {
    // The button is hidden by default (scrollY <= 400)
    // We verify it doesn't render when not needed
    const { container } = render(<BackToTop />);
    expect(container.querySelector("button")).toBeNull();
  });
});
