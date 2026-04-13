import { EMAIL_REGEX } from "../utils/validation";
import { describe, it, expect } from "vitest";

describe("EMAIL_REGEX", () => {
  it("matches valid email addresses", () => {
    expect(EMAIL_REGEX.test("user@example.com")).toBe(true);
    expect(EMAIL_REGEX.test("first.last@domain.org")).toBe(true);
    expect(EMAIL_REGEX.test("user+tag@company.co.uk")).toBe(true);
    expect(EMAIL_REGEX.test("123@numbers.io")).toBe(true);
  });

  it("rejects invalid email addresses", () => {
    expect(EMAIL_REGEX.test("")).toBe(false);
    expect(EMAIL_REGEX.test("notanemail")).toBe(false);
    expect(EMAIL_REGEX.test("missing@")).toBe(false);
    expect(EMAIL_REGEX.test("@nodomain.com")).toBe(false);
    expect(EMAIL_REGEX.test("spaces in@email.com")).toBe(false);
  });
});
