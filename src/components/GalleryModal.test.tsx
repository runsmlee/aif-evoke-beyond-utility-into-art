import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
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
  beforeEach(() => {
    // Reset focus before each test
    document.body.focus();
  });

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

  it("focuses the close button on mount", async () => {
    render(<GalleryModal item={mockItem} onClose={vi.fn()} />);
    const closeButton = screen.getByLabelText("Close modal");
    await waitFor(() => {
      expect(closeButton).toHaveFocus();
    });
  });

  it("has descriptive aria-label for the dialog", () => {
    render(<GalleryModal item={mockItem} onClose={vi.fn()} />);
    const dialog = screen.getByRole("dialog");
    expect(dialog).toHaveAttribute("aria-label", "Test Artwork artwork details");
  });

  it("prevents body scroll while open and restores on unmount", () => {
    const { unmount } = render(<GalleryModal item={mockItem} onClose={vi.fn()} />);
    // Body scroll should be locked (overflow hidden)
    expect(document.body.style.overflow).toBe("hidden");
    unmount();
    // Body scroll should be restored
    expect(document.body.style.overflow).toBe("");
  });
});
