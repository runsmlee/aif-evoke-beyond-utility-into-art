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
});
