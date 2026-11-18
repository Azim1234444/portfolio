const ALLOWED_ORIGINS = new Set([
  "https://azimhalim.my",
  "https://www.azimhalim.my",
  "https://muhammadnurazim.vercel.app",
]);

function isAllowedOrigin(origin: string | null): boolean {
  if (!origin) return true; // Same-origin or server-side requests without Origin header
  if (ALLOWED_ORIGINS.has(origin)) return true;
  if (/^https?:\/\/(localhost|127\.0\.0\.1)(:\d+)?$/.test(origin)) return true;
  if (/^https:\/\/[a-z0-9-]+-azim1234444s-projects\.vercel\.app$/.test(origin)) return true;
  return false;
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function json(data: Record<string, unknown>, status = 200): Response {
  return new Response(JSON.stringify(data), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}

export async function POST(request: Request): Promise<Response> {
  const origin = request.headers.get("origin");
  if (!isAllowedOrigin(origin)) {
    return json({ error: "Forbidden origin." }, 403);
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return json(
      { error: "Contact service is not configured on the server yet." },
      503
    );
  }

  let body: Record<string, unknown>;
  try {
    body = (await request.json()) as Record<string, unknown>;
  } catch {
    return json({ error: "Invalid request payload." }, 400);
  }

  // Silently accept and discard bot submissions that fill the honeypot field.
  if (typeof body.company_website === "string" && body.company_website.trim() !== "") {
    return json({ ok: true }, 200);
  }

  const name = typeof body.name === "string" ? body.name.trim() : "";
  const email = typeof body.email === "string" ? body.email.trim() : "";
  const title = typeof body.title === "string" ? body.title.trim() : "";
  const message = typeof body.message === "string" ? body.message.trim() : "";
  const time = typeof body.time === "string" ? body.time.trim() : new Date().toISOString();

  if (!name || !email || !title || !message) {
    return json({ error: "Please fill in all required fields." }, 400);
  }

  if (name.length > 120 || email.length > 200 || title.length > 200 || message.length > 5000) {
    return json({ error: "Input exceeds maximum allowed length." }, 400);
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return json({ error: "Please enter a valid email address." }, 400);
  }

  const fromEmail =
    process.env.RESEND_FROM_EMAIL || "Portfolio Contact <onboarding@resend.dev>";
  const toEmail = process.env.CONTACT_TO_EMAIL || "azimhebat666@gmail.com";

  const html = `
    <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; color: #18181b; background: #ffffff; border: 1px solid #e4e4e7;">
      <p style="font-size: 11px; letter-spacing: 0.16em; text-transform: uppercase; color: #71717a; margin: 0 0 8px;">New Portfolio Inquiry</p>
      <h2 style="font-size: 20px; margin: 0 0 20px; color: #09090b;">${escapeHtml(title)}</h2>
      <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px; font-size: 14px;">
        <tr>
          <td style="padding: 8px 0; border-bottom: 1px solid #e4e4e7; color: #71717a; width: 90px;">Name</td>
          <td style="padding: 8px 0; border-bottom: 1px solid #e4e4e7; font-weight: 600;">${escapeHtml(name)}</td>
        </tr>
        <tr>
          <td style="padding: 8px 0; border-bottom: 1px solid #e4e4e7; color: #71717a;">Email</td>
          <td style="padding: 8px 0; border-bottom: 1px solid #e4e4e7;"><a href="mailto:${escapeHtml(email)}" style="color: #09090b;">${escapeHtml(email)}</a></td>
        </tr>
        <tr>
          <td style="padding: 8px 0; border-bottom: 1px solid #e4e4e7; color: #71717a;">Sent at</td>
          <td style="padding: 8px 0; border-bottom: 1px solid #e4e4e7;">${escapeHtml(time)}</td>
        </tr>
      </table>
      <div style="padding: 16px; background: #f4f4f5; border-left: 3px solid #09090b; white-space: pre-wrap; font-size: 14px; line-height: 1.6;">${escapeHtml(message)}</div>
    </div>
  `.trim();

  const text = [
    `New Portfolio Inquiry`,
    `Subject: ${title}`,
    `Name: ${name}`,
    `Email: ${email}`,
    `Sent at: ${time}`,
    ``,
    message,
  ].join("\n");

  const resendResponse = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: fromEmail,
      to: [toEmail],
      reply_to: email,
      subject: `[Portfolio] ${title}`,
      html,
      text,
    }),
  });

  if (!resendResponse.ok) {
    const errText = await resendResponse.text();
    console.error("Resend API error:", resendResponse.status, errText);
    return json(
      { error: "Failed to send message right now. Please try emailing directly." },
      502
    );
  }

  return json({ ok: true }, 200);
}
