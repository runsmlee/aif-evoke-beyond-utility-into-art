import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { ScrollProgress } from "./ScrollProgress";

describe("ScrollProgress", () => {
  it("renders with progressbar role", () => {
    render(<ScrollProgress />);
    const progress = screen.getByRole("progressbar");
    expect(progress).toBeDefined();
  });

  it("has accessible label", () => {
    render(<ScrollProgress />);
    expect(screen.getByLabelText("Page scroll progress")).toBeDefined();
  });

  it("has correct aria values", () => {
    render(<ScrollProgress />);
    const progress = screen.getByRole("progressbar");
    expect(progress).toHaveAttribute("aria-valuemin", "0");
    expect(progress).toHaveAttribute("aria-valuemax", "100");
  });
});
