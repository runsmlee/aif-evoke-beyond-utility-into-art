interface SubscriptionRecord {
  email: string;
  source: string;
  subscribedAt: string;
}

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

    // ── Integration point ──────────────────────────────────────────────────
    // Replace this block with your email service provider call:
    //   Resend:    await resend.emails.send({ from, to: email, subject, html })
    //   Mailchimp: await mailchimp.lists.addListMember(listId, { email_address: email, status: "subscribed" })
    //   Loops:     await loops.sendTransactionalEmail({ transactionalId, email, dataVariables: { source } })
    //
    // The record below persists to Vercel function logs (visible in the dashboard)
    // until a real provider is wired in.
    // ─────────────────────────────────────────────────────────────────────────
    const subscription: SubscriptionRecord = {
      email: email.toLowerCase().trim(),
      source: source ?? "unknown",
      subscribedAt: new Date().toISOString(),
    };
    console.log(JSON.stringify({ event: "subscribe", ...subscription }));

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
