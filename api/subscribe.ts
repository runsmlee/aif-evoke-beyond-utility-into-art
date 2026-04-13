export default async function handler(req: Request): Promise<Response> {
  if (req.method !== "POST") {
    return new Response(JSON.stringify({ error: "Method not allowed" }), {
      status: 405,
      headers: { "Content-Type": "application/json" },
    });
  }

  try {
    const body: unknown = await req.json();

    if (
      typeof body !== "object" ||
      body === null ||
      !("email" in body) ||
      typeof (body as Record<string, unknown>).email !== "string"
    ) {
      return new Response(JSON.stringify({ error: "Email is required" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    const { email, source } = body as { email: string; source?: string };

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return new Response(
        JSON.stringify({ error: "Invalid email address" }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        },
      );
    }

    // In production, integrate with an email service (Resend, Mailchimp, Loops, etc.)
    // For now, log the subscription. Vercel function logs are visible in the dashboard.
    console.log(`[subscribe] New subscriber from ${source ?? "unknown"}: ${email}`);

    return new Response(
      JSON.stringify({ success: true, message: "Subscribed successfully" }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      },
    );
  } catch {
    return new Response(JSON.stringify({ error: "Invalid request body" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }
}
