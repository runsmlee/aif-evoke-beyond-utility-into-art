import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { ThemeToggle } from "./ThemeToggle";

describe("ThemeToggle", () => {
  it("renders button for light mode", () => {
    render(<ThemeToggle theme="light" toggleTheme={vi.fn()} />);
    expect(screen.getByLabelText("Switch to dark mode")).toBeDefined();
  });

  it("renders button for dark mode", () => {
    render(<ThemeToggle theme="dark" toggleTheme={vi.fn()} />);
    expect(screen.getByLabelText("Switch to light mode")).toBeDefined();
  });

  it("calls toggleTheme on click", () => {
    const toggleTheme = vi.fn();
    render(<ThemeToggle theme="light" toggleTheme={toggleTheme} />);
    fireEvent.click(screen.getByLabelText("Switch to dark mode"));
    expect(toggleTheme).toHaveBeenCalledTimes(1);
  });
});
