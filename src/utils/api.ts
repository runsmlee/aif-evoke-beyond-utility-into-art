/**
 * Subscribe an email address via the serverless API.
 * Throws on non-ok responses so callers can distinguish success from failure.
 */
export async function subscribeEmail(
  email: string,
  source: string,
): Promise<void> {
  const response = await fetch("/api/subscribe", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, source }),
  });

  if (!response.ok) {
    throw new Error("Subscription failed");
  }
}
