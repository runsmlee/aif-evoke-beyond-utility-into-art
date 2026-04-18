import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { ErrorBoundary } from "./ErrorBoundary";

function ThrowingComponent({ shouldThrow }: { shouldThrow: boolean }) {
  if (shouldThrow) {
    throw new Error("Test error");
  }
  return <div>Working content</div>;
}

describe("ErrorBoundary", () => {
  // Suppress console.error for expected error boundary logs
  const originalError = console.error;
  beforeEach(() => {
    console.error = vi.fn();
  });
  afterEach(() => {
    console.error = originalError;
  });

  it("renders children when no error occurs", () => {
    render(
      <ErrorBoundary>
        <ThrowingComponent shouldThrow={false} />
      </ErrorBoundary>,
    );
    expect(screen.getByText("Working content")).toBeDefined();
  });

  it("renders fallback UI when an error occurs", () => {
    render(
      <ErrorBoundary>
        <ThrowingComponent shouldThrow={true} />
      </ErrorBoundary>,
    );
    expect(
      screen.getByText("Something went wrong loading this section."),
    ).toBeDefined();
  });

  it("renders custom fallback when provided", () => {
    render(
      <ErrorBoundary fallback={<div>Custom error UI</div>}>
        <ThrowingComponent shouldThrow={true} />
      </ErrorBoundary>,
    );
    expect(screen.getByText("Custom error UI")).toBeDefined();
  });

  it("has a Try again button to recover from error", () => {
    render(
      <ErrorBoundary>
        <ThrowingComponent shouldThrow={true} />
      </ErrorBoundary>,
    );
    const retryButton = screen.getByText("Try again");
    expect(retryButton).toBeDefined();
  });

  it("renders error state as an alert for accessibility", () => {
    render(
      <ErrorBoundary>
        <ThrowingComponent shouldThrow={true} />
      </ErrorBoundary>,
    );
    expect(screen.getByRole("alert")).toBeDefined();
  });

  it("shows refresh message after max retries exceeded", () => {
    render(
      <ErrorBoundary>
        <ThrowingComponent shouldThrow={true} />
      </ErrorBoundary>,
    );

    // Click "Try again" 3 times (MAX_RETRIES)
    for (let i = 0; i < 3; i++) {
      const retryButton = screen.getByText("Try again");
      fireEvent.click(retryButton);
    }

    // After 3 retries, should show refresh message instead of Try again
    expect(screen.getByText("Please refresh the page to try again.")).toBeDefined();
    expect(screen.queryByText("Try again")).toBeNull();
  });
});
