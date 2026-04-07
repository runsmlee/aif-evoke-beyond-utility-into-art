import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { Gallery } from "./Gallery";

describe("Gallery", () => {
  it("renders the gallery heading", () => {
    render(<Gallery />);
    expect(screen.getByText("Gallery")).toBeDefined();
  });

  it("renders all gallery items by default", () => {
    render(<Gallery />);
    expect(screen.getByText("Harmonic Resonance")).toBeDefined();
    expect(screen.getByText("Fluid Dynamics")).toBeDefined();
    expect(screen.getByText("Chromatic Shift")).toBeDefined();
    expect(screen.getByText("Woven Light")).toBeDefined();
    expect(screen.getByText("Negative Space")).toBeDefined();
    expect(screen.getByText("Visual Cadence")).toBeDefined();
  });

  it("renders filter category buttons", () => {
    render(<Gallery />);
    const filterButtons = screen.getByRole("tablist");
    expect(filterButtons).toBeDefined();
    expect(screen.getByRole("tab", { name: "All" })).toBeDefined();
    expect(screen.getByRole("tab", { name: "Composition" })).toBeDefined();
  });

  it("filters gallery items when a category is selected", () => {
    render(<Gallery />);

    // Click "Motion" filter
    const motionTab = screen.getByRole("tab", { name: "Motion" });
    fireEvent.click(motionTab);

    // Should only show Motion item
    expect(screen.getByText("Fluid Dynamics")).toBeDefined();
    expect(screen.queryByText("Harmonic Resonance")).toBeNull();
  });

  it("shows all items when All filter is selected after filtering", () => {
    render(<Gallery />);

    // Click a specific filter
    fireEvent.click(screen.getByRole("tab", { name: "Color Theory" }));
    expect(screen.queryByText("Fluid Dynamics")).toBeNull();

    // Click All to reset
    fireEvent.click(screen.getByRole("tab", { name: "All" }));
    expect(screen.getByText("Fluid Dynamics")).toBeDefined();
  });

  it("navigates between tabs with arrow keys", () => {
    render(<Gallery />);

    const allTab = screen.getByRole("tab", { name: "All" });

    // Arrow right should move to next tab
    fireEvent.keyDown(allTab, { key: "ArrowRight" });
    expect(screen.getByRole("tab", { selected: true }).textContent).not.toBe("All");

    // Arrow left should wrap back
    fireEvent.keyDown(screen.getByRole("tab", { selected: true }), { key: "ArrowLeft" });
    expect(screen.getByRole("tab", { selected: true }).textContent).toBe("All");
  });

  it("uses roving tabindex for keyboard accessibility", () => {
    render(<Gallery />);

    const tabs = screen.getAllByRole("tab");
    // Only the active tab should have tabIndex 0
    const activeTab = tabs[0];
    expect(activeTab).toHaveAttribute("tabIndex", "0");
    expect(tabs[1]).toHaveAttribute("tabIndex", "-1");
  });
});
