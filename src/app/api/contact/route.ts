import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

// Route Handlers are not cached by default; this one is always dynamic since
// it reads the request body and sends mail.
export const runtime = "nodejs";

type Payload = {
  category?: string;
  volume?: string;
  market?: string;
  country?: string;
  fullname?: string;
  company?: string;
  email?: string;
  phone?: string;
  message?: string;
  lang?: string;
};

const MAX = 5000;
const str = (v: unknown, limit = 500) =>
  typeof v === "string" ? v.slice(0, limit).trim() : "";
const isEmail = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
const esc = (v: string) =>
  v.replace(/[&<>"']/g, (c) =>
    c === "&"
      ? "&amp;"
      : c === "<"
        ? "&lt;"
        : c === ">"
          ? "&gt;"
          : c === '"'
            ? "&quot;"
            : "&#39;",
  );

export async function POST(request: Request) {
  let body: Payload;
  try {
    const raw = await request.text();
    if (raw.length > MAX) {
      return NextResponse.json({ error: "Payload too large" }, { status: 413 });
    }
    body = JSON.parse(raw) as Payload;
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  const fullname = str(body.fullname, 200);
  const email = str(body.email, 200);

  // fullname + a valid email are the only hard requirements (mirrors the client).
  if (!fullname || !isEmail(email)) {
    return NextResponse.json(
      { error: "Name and a valid email are required" },
      { status: 422 },
    );
  }

  const category = str(body.category, 120);
  const volume = str(body.volume, 120);
  const market = str(body.market, 120);
  const country = str(body.country, 120);
  const company = str(body.company, 200);
  const phone = str(body.phone, 60);
  const message = str(body.message, 4000);
  const lang = str(body.lang, 8) || "fr";

  const host = process.env.SMTP_HOST;
  const port = Number(process.env.SMTP_PORT ?? 465);
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;
  const to = process.env.CONTACT_TO ?? user;
  const from = process.env.CONTACT_FROM ?? user;

  if (!host || !user || !pass || !to || !from) {
    console.error("[contact] Missing SMTP configuration");
    return NextResponse.json(
      { error: "Email service is not configured" },
      { status: 500 },
    );
  }

  const destination = [market, country].filter(Boolean).join(" · ");

  // Localized labels — the site owner reads this; default to French.
  const en = lang === "en";
  const L = {
    eyebrow: en ? "NEW REQUEST" : "NOUVELLE DEMANDE",
    title: en ? "New enquiry" : "Demande de renseignements",
    intro: en
      ? "A visitor just submitted a request on your website."
      : "Un visiteur vient d’envoyer une demande depuis votre site.",
    request: en ? "Request" : "Demande",
    contact: en ? "Contact details" : "Coordonnées",
    category: en ? "Category" : "Catégorie",
    volume: en ? "Volume" : "Volume",
    destination: en ? "Destination" : "Destination",
    name: en ? "Name" : "Nom",
    company: en ? "Company" : "Société",
    email: en ? "Email" : "Email",
    phone: en ? "Phone" : "Téléphone",
    message: en ? "Message" : "Message",
    replyHint: en
      ? "Reply to this email to answer the customer directly."
      : "Répondez à cet email pour recontacter le client directement.",
    footer: en
      ? "Sent automatically from the YATEX website."
      : "Envoyé automatiquement depuis le site YATEX.",
    langLabel: en ? "Visitor language" : "Langue du visiteur",
  };

  // ---- Plain-text fallback ----
  const textRows: [string, string][] = [
    [L.category, category],
    [L.volume, volume],
    [L.destination, destination],
    [L.name, fullname],
    [L.company, company],
    [L.email, email],
    [L.phone, phone],
    [L.langLabel, lang],
  ].filter(([, v]) => v) as [string, string][];

  const text =
    `${L.title}\n${"=".repeat(L.title.length)}\n\n` +
    textRows.map(([k, v]) => `${k}: ${v}`).join("\n") +
    (message ? `\n\n${L.message}:\n${message}` : "");

  // ---- Branded HTML (email-safe: tables + inline styles) ----
  // Brand palette from the site: ink #283618, canvas #FEFAE0, paper #fffdf2,
  // gold #DDA15E, orange #BC6C25, muted #6a7150, hairline #e3deb6.
  const detailRow = (k: string, v: string, isLink = false) =>
    v
      ? `<tr>
          <td style="padding:11px 0;border-bottom:1px solid #e3deb6;color:#6a7150;font-size:12px;letter-spacing:0.06em;text-transform:uppercase;vertical-align:top;white-space:nowrap;font-family:Arial,Helvetica,sans-serif">${esc(k)}</td>
          <td style="padding:11px 0 11px 20px;border-bottom:1px solid #e3deb6;color:#283618;font-size:15px;font-weight:600;text-align:right;font-family:Arial,Helvetica,sans-serif">${
            isLink
              ? `<a href="mailto:${esc(v)}" style="color:#BC6C25;text-decoration:none">${esc(v)}</a>`
              : esc(v)
          }</td>
        </tr>`
      : "";

  const requestRows =
    detailRow(L.category, category) +
    detailRow(L.volume, volume) +
    detailRow(L.destination, destination);
  const contactRows =
    detailRow(L.name, fullname) +
    detailRow(L.company, company) +
    detailRow(L.email, email, true) +
    detailRow(L.phone, phone);

  const html = `<!DOCTYPE html>
<html lang="${esc(lang)}">
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#FEFAE0;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#FEFAE0;padding:32px 12px;">
    <tr><td align="center">
      <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="width:600px;max-width:100%;background:#fffdf2;border:1px solid #e3deb6;border-radius:14px;overflow:hidden;box-shadow:0 22px 60px -20px rgba(40,54,24,0.35);">

        <!-- Header -->
        <tr><td style="background:#283618;padding:34px 40px;">
          <div style="font-size:12px;font-weight:700;letter-spacing:0.22em;text-transform:uppercase;color:#DDA15E;font-family:Arial,Helvetica,sans-serif;">${L.eyebrow}</div>
          <div style="margin-top:12px;font-family:Georgia,'Times New Roman',serif;font-size:30px;line-height:1.1;color:#FEFAE0;letter-spacing:-0.01em;">${L.title}</div>
          <div style="margin-top:14px;height:2px;width:44px;background:#BC6C25;line-height:2px;font-size:0;">&nbsp;</div>
        </td></tr>

        <!-- Intro -->
        <tr><td style="padding:28px 40px 6px;">
          <p style="margin:0;font-family:Arial,Helvetica,sans-serif;font-size:15px;line-height:1.55;color:#3a4a22;">${L.intro}</p>
        </td></tr>

        <!-- Request panel -->
        <tr><td style="padding:20px 40px 6px;">
          <div style="font-family:Arial,Helvetica,sans-serif;font-size:11px;font-weight:700;letter-spacing:0.16em;text-transform:uppercase;color:#606C38;margin-bottom:6px;">${L.request}</div>
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f6efcf;border:1px solid #e3deb6;border-radius:10px;padding:4px 18px;">
            ${requestRows || `<tr><td style="padding:12px 0;color:#6a7150;font-family:Arial,Helvetica,sans-serif;font-size:14px;">—</td></tr>`}
          </table>
        </td></tr>

        <!-- Contact -->
        <tr><td style="padding:20px 40px 6px;">
          <div style="font-family:Arial,Helvetica,sans-serif;font-size:11px;font-weight:700;letter-spacing:0.16em;text-transform:uppercase;color:#606C38;margin-bottom:2px;">${L.contact}</div>
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
            ${contactRows}
          </table>
        </td></tr>

        ${
          message
            ? `<!-- Message -->
        <tr><td style="padding:14px 40px 6px;">
          <div style="font-family:Arial,Helvetica,sans-serif;font-size:11px;font-weight:700;letter-spacing:0.16em;text-transform:uppercase;color:#606C38;margin-bottom:8px;">${L.message}</div>
          <div style="border-left:3px solid #DDA15E;background:#f6efcf;border-radius:0 8px 8px 0;padding:14px 18px;font-family:Arial,Helvetica,sans-serif;font-size:15px;line-height:1.6;color:#283618;white-space:pre-wrap;">${esc(message)}</div>
        </td></tr>`
            : ""
        }

        <!-- Reply CTA -->
        <tr><td style="padding:24px 40px 8px;">
          <a href="mailto:${esc(email)}" style="display:inline-block;background:#BC6C25;color:#FEFAE0;font-family:Arial,Helvetica,sans-serif;font-size:14px;font-weight:600;text-decoration:none;padding:12px 22px;border-radius:8px;">${en ? "Reply to" : "Répondre à"} ${esc(fullname)}</a>
          <p style="margin:12px 0 0;font-family:Arial,Helvetica,sans-serif;font-size:13px;color:#6a7150;">${L.replyHint}</p>
        </td></tr>

        <!-- Footer -->
        <tr><td style="padding:24px 40px 30px;border-top:1px solid #e3deb6;margin-top:12px;">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0"><tr>
            <td style="font-family:Georgia,'Times New Roman',serif;font-size:16px;color:#283618;letter-spacing:0.02em;">YATEX</td>
            <td style="text-align:right;font-family:Arial,Helvetica,sans-serif;font-size:12px;color:#9aa185;">${L.footer}</td>
          </tr></table>
        </td></tr>

      </table>
    </td></tr>
  </table>
</body>
</html>`;

  const transporter = nodemailer.createTransport({
    host,
    port,
    secure: port === 465,
    auth: { user, pass },
    // Fail fast instead of hanging until the serverless function times out.
    connectionTimeout: 10_000,
    greetingTimeout: 10_000,
    socketTimeout: 15_000,
  });

  try {
    const info = await transporter.sendMail({
      from: `YATEX <${from}>`,
      to,
      replyTo: `${fullname} <${email}>`,
      subject: `${en ? "New request" : "Nouvelle demande"} — ${fullname}${
        company ? ` (${company})` : ""
      }`,
      text,
      html,
    });
    // Shows up in Vercel function logs — proof the message was accepted.
    console.log(
      "[contact] sent",
      JSON.stringify({
        messageId: info.messageId,
        accepted: info.accepted,
        rejected: info.rejected,
        response: info.response,
        to,
      }),
    );
  } catch (err) {
    console.error("[contact] sendMail failed", err);
    return NextResponse.json({ error: "Failed to send" }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
