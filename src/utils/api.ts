const REQUEST_TIMEOUT_MS = 10_000;

/**
 * Subscribe an email address via the serverless API.
 * Throws on non-ok responses so callers can distinguish success from failure.
 * Automatically aborts after a timeout to prevent hanging UI.
 */
export async function subscribeEmail(
  email: string,
  source: string,
): Promise<void> {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);

  try {
    const response = await fetch("/api/subscribe", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, source }),
      signal: controller.signal,
    });

    if (!response.ok) {
      throw new Error("Subscription failed");
    }
  } finally {
    clearTimeout(timeoutId);
  }
}
