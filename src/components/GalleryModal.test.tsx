import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { GalleryModal } from "./GalleryModal";

const mockItem = {
  id: "test-1",
  title: "Test Artwork",
  category: "Composition",
  gradient: "from-primary-400 to-rose-300",
  pattern: "circles" as const,
  description: "A beautiful test artwork description for the modal view.",
};

describe("GalleryModal", () => {
  it("renders the artwork title", () => {
    render(<GalleryModal item={mockItem} onClose={vi.fn()} />);
    expect(screen.getByText("Test Artwork")).toBeDefined();
  });

  it("renders the category badge", () => {
    render(<GalleryModal item={mockItem} onClose={vi.fn()} />);
    expect(screen.getByText("Composition")).toBeDefined();
  });

  it("renders the description", () => {
    render(<GalleryModal item={mockItem} onClose={vi.fn()} />);
    expect(screen.getByText(/beautiful test artwork/i)).toBeDefined();
  });

  it("renders a close button", () => {
    render(<GalleryModal item={mockItem} onClose={vi.fn()} />);
    expect(screen.getByLabelText("Close modal")).toBeDefined();
  });

  it("calls onClose when close button is clicked", () => {
    const onClose = vi.fn();
    render(<GalleryModal item={mockItem} onClose={onClose} />);
    fireEvent.click(screen.getByLabelText("Close modal"));
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it("calls onClose when backdrop is clicked", () => {
    const onClose = vi.fn();
    render(<GalleryModal item={mockItem} onClose={onClose} />);
    const backdrop = screen.getByRole("dialog").firstChild as HTMLElement;
    fireEvent.click(backdrop);
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it("calls onClose when Escape key is pressed", () => {
    const onClose = vi.fn();
    render(<GalleryModal item={mockItem} onClose={onClose} />);
    const dialog = screen.getByRole("dialog");
    fireEvent.keyDown(dialog, { key: "Escape" });
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it("has dialog role and aria-modal attribute", () => {
    render(<GalleryModal item={mockItem} onClose={vi.fn()} />);
    const dialog = screen.getByRole("dialog");
    expect(dialog).toHaveAttribute("aria-modal", "true");
  });
});
