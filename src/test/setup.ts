import "@testing-library/jest-dom/vitest";
import { vi } from "vitest";

// Ensure React uses the development build which includes act()
process.env.NODE_ENV = "development";

// Mock IntersectionObserver for components that use useInView
class MockIntersectionObserver {
  observe = vi.fn();
  unobserve = vi.fn();
  disconnect = vi.fn();
}

Object.defineProperty(window, "IntersectionObserver", {
  writable: true,
  value: MockIntersectionObserver,
});
