// Server-only email sending utility using Resend
// Requires RESEND_API_KEY in environment variables

export async function sendEmail({
  to,
  subject,
  html,
}: {
  to: string;
  subject: string;
  html: string;
}) {
  const RESEND_API_KEY = process.env.RESEND_API_KEY;

  if (!RESEND_API_KEY) {
    console.warn("[email] RESEND_API_KEY not configured — skipping email send");
    return { sent: false, reason: "no_api_key" };
  }

  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "The Bittersweet Co. <orders@bittersweet.co>",
        to,
        subject,
        html,
      }),
    });

    if (!response.ok) {
      const err = await response.text();
      console.error("[email] send failed:", err);
      return { sent: false, reason: "api_error" };
    }

    return { sent: true };
  } catch (error) {
    console.error("[email] send error:", error);
    return { sent: false, reason: "network_error" };
  }
}
