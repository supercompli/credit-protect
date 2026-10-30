// HTML + plain-text bodies for the two emails an enquiry triggers:
//   - renderConfirmationEmail: to the person who submitted the form
//   - renderAdminEmail:        to the team (MAIL_TO)
//
// Email clients ignore most modern CSS, so both are table-based with inline
// styles, a 600px card, a bulletproof button and a small <style> block for
// mobile and dark mode. Colours mirror app/globals.css.
//
// Every user-supplied value goes through esc() before it reaches the HTML. The
// confirmation email goes to whatever address was typed into the form, so it
// deliberately reflects back almost nothing the submitter wrote (a sanitised
// first name, plus the loan type and balance on quotes) to keep it useless as a
// way to send arbitrary text to someone else under our name.
//
// Before public launch, add the verified legal entity, FSP number and complaints
// contact to footer() once they are in lib/content.ts (they are not configured yet).

export type EnquiryKind = "quote" | "partner" | "contact";
export type RenderedEmail = { subject: string; html: string; text: string };

const SITE_URL = (process.env.SITE_URL || "https://creditcovered.co.za").replace(/\/+$/, "");
const MAX_VALUE_LENGTH = 2000;

const c = {
  navy: "#102e40",
  teal: "#007e7b",
  tealDark: "#00635f",
  text: "#122e40",
  muted: "#536975",
  fine: "#6a7d86",
  border: "#dce5e8",
  soft: "#f1f6f7",
  mint: "#eff7f5",
  mintBorder: "#c9dedd",
  amber: "#fff8eb",
  amberBorder: "#efe0bd",
  amberText: "#7b622d",
};

const FONT = "'DM Sans',-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif";

const KIND = {
  quote: {
    noun: "quote enquiry",
    title: "Quote enquiry",
    eyebrow: "Quote enquiry received",
    subject: "We've received your quote enquiry",
    intro:
      "Thanks for asking about credit life cover. Your details are with our team, and we'll be in touch about the next steps.",
    steps: [
      ["We review your enquiry", "A broker looks at your credit agreement details to work out which product and rating basis may apply."],
      ["We get in touch", "We'll use the email address or mobile number you gave us to talk through your options and anything else we need."],
      ["You decide", "Any quotation will set out the premium, benefits, exclusions and waiting periods, so you can compare before you decide."],
    ],
    notice:
      "This email confirms we've received your enquiry. It is not a quotation and does not confirm insurance cover. If you already have credit life cover, please don't change or cancel it until you've confirmed the replacement arrangements in writing.",
    cta: { label: "Credit life, explained", href: "/credit-life-insurance" },
  },
  partner: {
    noun: "partner application",
    title: "Partner application",
    eyebrow: "Partner application received",
    subject: "We've received your partner application",
    intro:
      "Thanks for applying to work with CreditCovered. Your application is with our team for review.",
    steps: [
      ["We review your application", "We check your organisation's details and the type of partnership you're after."],
      ["We get in touch", "We'll contact you on the email address or mobile number you gave us if we need anything more."],
      ["Access once approved", "Partner registration requires approval. Once approved, you can use the partner workspace."],
    ],
    notice:
      "This email confirms we've received your application. It does not approve an account or give access to borrower information.",
    cta: { label: "See how it works", href: "/how-it-works" },
  },
  contact: {
    noun: "contact message",
    title: "Contact message",
    eyebrow: "Message received",
    subject: "We've received your message",
    intro: "Thanks for getting in touch. We've received your message and will reply to this email address.",
    steps: [
      ["We read your message", "It goes straight to our team."],
      ["We reply by email", "A team member will answer using the email address you gave us."],
      ["Keep your reference", "Quote the reference above if you write to us again about this message."],
    ],
    notice:
      "Please don't send identity documents, bank details or medical information by email. If we need documents from you, we'll point you to a secure way to share them.",
    cta: { label: "Credit life, explained", href: "/credit-life-insurance" },
  },
} as const;

// ---------------------------------------------------------------------------
// helpers

function esc(value: unknown): string {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

/** Escaped text with line breaks kept. No line of the result is ever a lone "." (see lib/mail.ts). */
function multiline(value: string): string {
  return esc(value).replace(/\r\n?|\n/g, "<br>");
}

function clean(value: unknown, max = MAX_VALUE_LENGTH): string {
  return typeof value === "boolean"
    ? value
      ? "Yes"
      : "No"
    : String(value ?? "").replace(/\r\n?/g, "\n").trim().slice(0, max);
}

function label(key: string): string {
  const words = key.replace(/([A-Z])/g, " $1").trim().toLowerCase();
  return words.charAt(0).toUpperCase() + words.slice(1);
}

function rand(value: unknown): string {
  const n = Number(value);
  return Number.isFinite(n) && n > 0
    ? new Intl.NumberFormat("en-ZA", { style: "currency", currency: "ZAR", maximumFractionDigits: 0 }).format(n)
    : "";
}

function when(date: Date): string {
  const text = new Intl.DateTimeFormat("en-ZA", {
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
    timeZone: "Africa/Johannesburg",
  }).format(date);
  return `${text} SAST`;
}

/** Short single-line plain text (a loan type such as "Home loan"), or "" if the value looks like anything else. */
function plainLabel(value: unknown): string {
  const text = String(value ?? "").trim();
  return /^[\p{L}\p{N} ,.'’&()/-]{1,40}$/u.test(text) ? text : "";
}

/** A first name safe to put in a greeting, or "" if the value looks like anything else. */
function firstNameOf(value: unknown): string {
  const first = String(value ?? "").trim().split(/\s+/)[0] ?? "";
  return /^[\p{L}][\p{L}'’-]{0,29}$/u.test(first) ? first : "";
}

function greetingName(kind: EnquiryKind, data: Record<string, unknown>): string {
  return firstNameOf(kind === "quote" ? data.firstName : kind === "partner" ? data.contact : data.name);
}

function url(path: string): string {
  return `${SITE_URL}${path}`;
}

// ---------------------------------------------------------------------------
// shared layout

function button(href: string, text: string, fill: string = c.teal): string {
  return `<table role="presentation" cellpadding="0" cellspacing="0" border="0"><tr><td align="center" bgcolor="${fill}" style="background:${fill};border-radius:8px;">
<a href="${esc(href)}" style="display:inline-block;padding:14px 26px;font-family:${FONT};font-size:15px;font-weight:700;line-height:1;color:#ffffff;text-decoration:none;border-radius:8px;">${esc(text)}</a>
</td></tr></table>`;
}

function shell(opts: { title: string; preheader: string; header: string; body: string; footer: string }): string {
  return `<!doctype html>
<html lang="en-ZA">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<meta name="color-scheme" content="light dark">
<meta name="supported-color-schemes" content="light dark">
<title>${esc(opts.title)}</title>
<style>
body{margin:0;padding:0;-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%}
table{border-collapse:collapse}
img{border:0;outline:none;text-decoration:none}
a{color:${c.teal}}
@media (max-width:620px){
.px{padding-left:22px!important;padding-right:22px!important}
.h1{font-size:27px!important;line-height:1.2!important}
.col{display:block!important;width:100%!important}
.col-gap{padding-top:14px!important}
}
@media (prefers-color-scheme:dark){
.bg{background:#0b1b26!important}
.card{background:#112a3a!important;border-color:#244456!important}
.tx{color:#e6f0f3!important}
.mut{color:#a9bcc5!important}
.fine{color:#8da4af!important}
.mint{background:#0f3a3b!important;border-color:#1c5a58!important}
.warn{background:#2f2713!important;border-color:#5a4a21!important}
.warn-tx{color:#ecd9a6!important}
.rule{border-color:#244456!important}
.teal{color:#4fd1c7!important}
.stripe{background:#163246!important}
}
</style>
</head>
<body class="bg" style="margin:0;padding:0;background:${c.soft};">
<div style="display:none;max-height:0;overflow:hidden;opacity:0;color:transparent;mso-hide:all;">${esc(opts.preheader)}&#8199;&#847;&#8199;&#847;&#8199;&#847;&#8199;&#847;&#8199;&#847;&#8199;&#847;&#8199;&#847;&#8199;&#847;&#8199;&#847;</div>
<table role="presentation" class="bg" width="100%" cellpadding="0" cellspacing="0" border="0" bgcolor="${c.soft}" style="background:${c.soft};">
<tr><td align="center" style="padding:28px 12px 40px;">
<table role="presentation" class="card" width="600" cellpadding="0" cellspacing="0" border="0" style="width:100%;max-width:600px;background:#ffffff;border:1px solid ${c.border};border-radius:16px;overflow:hidden;">
${opts.header}
${opts.body}
</table>
${opts.footer}
</td></tr>
</table>
</body>
</html>`;
}

function header(rightText: string): string {
  return `<tr><td bgcolor="${c.navy}" class="px" style="background:${c.navy};padding:24px 36px;">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0"><tr>
<td style="font-family:${FONT};font-size:22px;font-weight:700;letter-spacing:-0.6px;color:#ffffff;">Credit<span style="font-weight:400;color:#9fd7d3;">Covered</span></td>
<td align="right" style="font-family:${FONT};font-size:11px;font-weight:700;letter-spacing:1.6px;text-transform:uppercase;color:#9fb6c0;">${esc(rightText)}</td>
</tr></table>
</td></tr>`;
}

function publicFooter(): string {
  const link = (path: string, text: string) =>
    `<a href="${esc(url(path))}" style="color:#6a7d86;text-decoration:underline;">${text}</a>`;
  return `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="max-width:600px;"><tr><td align="center" class="fine" style="padding:22px 20px 0;font-family:${FONT};font-size:12px;line-height:1.7;color:${c.fine};">
You're receiving this because an enquiry was submitted with this email address on <a href="${esc(SITE_URL)}" style="color:#6a7d86;text-decoration:underline;">creditcovered.co.za</a>. It's a service message about that enquiry, not marketing.<br>
${link("/privacy", "Privacy")} &nbsp;&middot;&nbsp; ${link("/complaints", "Complaints")} &nbsp;&middot;&nbsp; ${link("/disclosures", "Disclosures")}<br>
CreditCovered &middot; South Africa
</td></tr></table>`;
}

function internalFooter(): string {
  return `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="max-width:600px;"><tr><td align="center" class="fine" style="padding:22px 20px 0;font-family:${FONT};font-size:12px;line-height:1.7;color:${c.fine};">
Sent automatically by the CreditCovered website. This email contains personal information, so please keep it inside the team.
</td></tr></table>`;
}

function infoRows(rows: { label: string; value: string; html?: boolean }[]): string {
  return rows
    .map(
      (row, i) => `<tr>
<td class="${i % 2 ? "" : "stripe"} mut" valign="top" width="38%" style="padding:12px 16px;background:${i % 2 ? "#ffffff" : "#f8fafb"};border-bottom:1px solid ${c.border};font-family:${FONT};font-size:13px;line-height:1.5;color:${c.muted};">${esc(row.label)}</td>
<td class="${i % 2 ? "" : "stripe"} tx" valign="top" style="padding:12px 16px;background:${i % 2 ? "#ffffff" : "#f8fafb"};border-bottom:1px solid ${c.border};font-family:${FONT};font-size:14px;line-height:1.5;font-weight:600;color:${c.text};">${row.html ? row.value : multiline(row.value)}</td>
</tr>`,
    )
    .join("\n");
}

// ---------------------------------------------------------------------------
// confirmation email (to the submitter)

export function renderConfirmationEmail(input: {
  id: string;
  kind: EnquiryKind;
  data: Record<string, unknown>;
  submittedAt: Date;
}): RenderedEmail {
  const { id, kind, data, submittedAt } = input;
  const copy = KIND[kind];
  const name = greetingName(kind, data);
  const submitted = when(submittedAt);
  const heading = name ? `Thanks, ${name}. We've got your ${copy.noun}.` : `Thanks. We've got your ${copy.noun}.`;

  const summary: { label: string; value: string }[] = [
    { label: "Reference", value: id },
    { label: "Type", value: copy.title },
  ];
  if (kind === "quote") {
    const credit = plainLabel(data.creditType);
    const balance = rand(data.balance);
    if (credit) summary.push({ label: "Credit type", value: credit });
    if (balance) summary.push({ label: "Outstanding balance", value: balance });
  }
  summary.push({ label: "Submitted", value: submitted });

  const steps = copy.steps
    .map(
      ([title, text], i) => `<tr>
<td valign="top" width="44" style="padding:0 0 20px;"><table role="presentation" cellpadding="0" cellspacing="0" border="0"><tr><td align="center" valign="middle" width="32" height="32" bgcolor="#e4f2ee" class="mint teal" style="width:32px;height:32px;background:#e4f2ee;border-radius:16px;font-family:${FONT};font-size:14px;font-weight:700;color:${c.teal};">${i + 1}</td></tr></table></td>
<td valign="top" style="padding:0 0 20px;font-family:${FONT};">
<div class="tx" style="font-size:15px;font-weight:700;line-height:1.4;color:${c.text};">${esc(title)}</div>
<div class="mut" style="margin-top:3px;font-size:14px;line-height:1.6;color:${c.muted};">${esc(text)}</div>
</td></tr>`,
    )
    .join("\n");

  const body = `<tr><td class="px" style="padding:40px 36px 8px;font-family:${FONT};" align="left">
<table role="presentation" cellpadding="0" cellspacing="0" border="0"><tr><td align="center" valign="middle" width="56" height="56" bgcolor="#e4f2ee" style="width:56px;height:56px;background:#e4f2ee;border-radius:28px;font-family:${FONT};font-size:28px;line-height:56px;font-weight:700;color:${c.teal};">&#10003;</td></tr></table>
<div class="teal" style="margin-top:22px;font-size:12px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:${c.teal};">${esc(copy.eyebrow)}</div>
<h1 class="h1 tx" style="margin:10px 0 0;font-size:32px;line-height:1.15;letter-spacing:-1px;font-weight:700;color:${c.text};">${esc(heading)}</h1>
<p class="mut" style="margin:16px 0 0;font-size:16px;line-height:1.7;color:${c.muted};">${esc(copy.intro)}</p>
</td></tr>
<tr><td class="px" style="padding:26px 36px 4px;">
<table role="presentation" class="mint" width="100%" cellpadding="0" cellspacing="0" border="0" bgcolor="${c.mint}" style="background:${c.mint};border:1px solid ${c.mintBorder};border-radius:12px;">
<tr><td style="padding:20px 24px;">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0"><tr>
<td class="col" valign="top" style="font-family:${FONT};">
<div class="mut" style="font-size:11px;font-weight:700;letter-spacing:1.6px;text-transform:uppercase;color:${c.muted};">Your reference</div>
<div class="tx" style="margin-top:4px;font-family:'SFMono-Regular',Consolas,'Liberation Mono',Menlo,monospace;font-size:24px;font-weight:700;letter-spacing:1px;color:${c.text};">${esc(id)}</div>
</td>
<td class="col col-gap" valign="top" align="right" style="font-family:${FONT};font-size:13px;line-height:1.6;color:${c.muted};">
<div class="mut" style="font-size:11px;font-weight:700;letter-spacing:1.6px;text-transform:uppercase;color:${c.muted};">Submitted</div>
<div class="tx" style="margin-top:4px;font-size:14px;font-weight:600;color:${c.text};">${esc(submitted)}</div>
</td>
</tr></table>
</td></tr></table>
</td></tr>
<tr><td class="px" style="padding:30px 36px 0;">
<div class="tx" style="font-family:${FONT};font-size:18px;font-weight:700;letter-spacing:-0.3px;color:${c.text};padding-bottom:18px;">What happens next</div>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
${steps}
</table>
</td></tr>
<tr><td class="px" style="padding:6px 36px 0;">
<table role="presentation" class="warn" width="100%" cellpadding="0" cellspacing="0" border="0" bgcolor="${c.amber}" style="background:${c.amber};border:1px solid ${c.amberBorder};border-radius:10px;">
<tr><td class="warn-tx" style="padding:16px 20px;font-family:${FONT};font-size:14px;line-height:1.65;color:${c.amberText};"><strong>Please note.</strong> ${esc(copy.notice)}</td></tr>
</table>
</td></tr>
<tr><td class="px" style="padding:30px 36px 0;">
<div class="tx" style="font-family:${FONT};font-size:18px;font-weight:700;letter-spacing:-0.3px;color:${c.text};padding-bottom:14px;">Your enquiry at a glance</div>
<table role="presentation" class="rule" width="100%" cellpadding="0" cellspacing="0" border="0" style="border:1px solid ${c.border};border-radius:10px;overflow:hidden;">
${infoRows(summary)}
</table>
</td></tr>
<tr><td class="px" style="padding:30px 36px 0;">
${button(url(copy.cta.href), copy.cta.label)}
</td></tr>
<tr><td class="px" style="padding:30px 36px 38px;">
<div class="rule" style="border-top:1px solid ${c.border};padding-top:20px;font-family:${FONT};font-size:13px;line-height:1.7;color:${c.fine};"><span class="fine">Didn't make this enquiry? Reply to this email and let us know. Otherwise there's nothing more you need to do.</span></div>
</td></tr>`;

  const html = shell({
    title: copy.subject,
    preheader: `Your reference is ${id}. Here's what happens next.`,
    header: header("Enquiry received"),
    body,
    footer: publicFooter(),
  });

  const text = [
    name ? `Hi ${name},` : "Hello,",
    "",
    copy.intro,
    "",
    `Your reference: ${id}`,
    `Submitted: ${submitted}`,
    "",
    "WHAT HAPPENS NEXT",
    ...copy.steps.map(([title, line], i) => `${i + 1}. ${title}: ${line}`),
    "",
    `Please note: ${copy.notice}`,
    "",
    `${copy.cta.label}: ${url(copy.cta.href)}`,
    "",
    "Didn't make this enquiry? Reply to this email and let us know.",
    "",
    "--",
    "CreditCovered, South Africa",
    `Privacy: ${url("/privacy")}`,
    `Complaints: ${url("/complaints")}`,
    `Disclosures: ${url("/disclosures")}`,
  ].join("\n");

  return { subject: `${copy.subject} - ${id}`, html, text };
}

// ---------------------------------------------------------------------------
// admin notification (to the team)

const CONTACT_KEYS = new Set(["firstName", "lastName", "name", "email", "phone", "consent", "marketing"]);

export function renderAdminEmail(input: {
  id: string;
  kind: EnquiryKind;
  data: Record<string, unknown>;
  submittedAt: Date;
}): RenderedEmail {
  const { id, kind, data, submittedAt } = input;
  const copy = KIND[kind];
  const submitted = when(submittedAt);

  const who = clean(
    kind === "quote" ? `${data.firstName ?? ""} ${data.lastName ?? ""}` : kind === "partner" ? data.business : data.name,
    200,
  ).replace(/\s+/g, " ");
  const email = clean(data.email, 200);
  const phone = clean(data.phone, 40);
  const phoneDial = phone.replace(/[^\d+]/g, "");
  const consent = data.consent === true;
  const marketing = data.marketing === true;

  const details = Object.entries(data)
    .filter(([key, value]) => !CONTACT_KEYS.has(key) && value !== undefined && value !== null && clean(value) !== "")
    .map(([key, value]) => ({
      label: label(key),
      value: key === "balance" && rand(value) ? rand(value) : clean(value),
    }));

  const replySubject = `Re: your CreditCovered ${copy.noun} (${id})`;
  const replyHref = `mailto:${email}?subject=${encodeURIComponent(replySubject)}`;

  const chip = (text: string, on: boolean) =>
    `<span style="display:inline-block;margin:0 8px 8px 0;padding:5px 11px;border-radius:6px;font-family:${FONT};font-size:12px;font-weight:700;background:${on ? "#e5f4ee" : "#edf3f6"};color:${on ? "#20795b" : "#536975"};">${esc(text)}</span>`;

  const body = `<tr><td class="px" style="padding:36px 36px 6px;font-family:${FONT};">
<div class="teal" style="font-size:12px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:${c.teal};">New ${esc(copy.noun)}</div>
<h1 class="h1 tx" style="margin:10px 0 0;font-size:30px;line-height:1.15;letter-spacing:-1px;font-weight:700;color:${c.text};">${esc(who || "A new enquiry")}</h1>
<p class="mut" style="margin:10px 0 0;font-size:14px;line-height:1.6;color:${c.muted};">Reference <strong class="tx" style="color:${c.text};font-family:'SFMono-Regular',Consolas,'Liberation Mono',Menlo,monospace;">${esc(id)}</strong> &nbsp;&middot;&nbsp; ${esc(submitted)}</p>
</td></tr>
<tr><td class="px" style="padding:22px 36px 0;">
<table role="presentation" class="mint" width="100%" cellpadding="0" cellspacing="0" border="0" bgcolor="${c.mint}" style="background:${c.mint};border:1px solid ${c.mintBorder};border-radius:12px;">
<tr><td style="padding:20px 24px;font-family:${FONT};">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0"><tr>
<td class="col" valign="top" style="padding-right:12px;">
<div class="mut" style="font-size:11px;font-weight:700;letter-spacing:1.6px;text-transform:uppercase;color:${c.muted};">Email</div>
<div style="margin-top:4px;font-size:15px;font-weight:600;word-break:break-all;"><a href="mailto:${esc(email)}" class="teal" style="color:${c.teal};text-decoration:none;">${esc(email)}</a></div>
</td>
<td class="col col-gap" valign="top">
<div class="mut" style="font-size:11px;font-weight:700;letter-spacing:1.6px;text-transform:uppercase;color:${c.muted};">Mobile</div>
<div style="margin-top:4px;font-size:15px;font-weight:600;"><a href="tel:${esc(phoneDial)}" class="teal" style="color:${c.teal};text-decoration:none;">${esc(phone)}</a></div>
</td>
</tr></table>
<div style="margin-top:16px;">${chip(consent ? "Consent to contact: given" : "Consent to contact: not given", consent)}${chip(marketing ? "Marketing: opted in" : "Marketing: not opted in", marketing)}</div>
</td></tr></table>
</td></tr>
<tr><td class="px" style="padding:24px 36px 0;">
${button(replyHref, who ? `Reply to ${firstNameOf(kind === "quote" ? data.firstName : kind === "partner" ? data.contact : data.name) || "sender"}` : "Reply to sender")}
</td></tr>
<tr><td class="px" style="padding:32px 36px 0;">
<div class="tx" style="font-family:${FONT};font-size:18px;font-weight:700;letter-spacing:-0.3px;color:${c.text};padding-bottom:14px;">Submitted details</div>
<table role="presentation" class="rule" width="100%" cellpadding="0" cellspacing="0" border="0" style="border:1px solid ${c.border};border-radius:10px;overflow:hidden;">
${infoRows(details.length ? details : [{ label: "Details", value: "None provided" }])}
</table>
</td></tr>
<tr><td class="px" style="padding:26px 36px 36px;">
<div class="fine" style="font-family:${FONT};font-size:13px;line-height:1.7;color:${c.fine};">Reply to this email to answer the sender directly.</div>
</td></tr>`;

  const html = shell({
    title: `New ${copy.noun} ${id}`,
    preheader: `${who || "Someone"} sent a ${copy.noun}. Reference ${id}.`,
    header: header("Team notification"),
    body,
    footer: internalFooter(),
  });

  const indent = (value: string) => value.split("\n").join("\n    ");
  const text = [
    `A new ${copy.noun} was submitted on the CreditCovered website.`,
    "",
    `Reference: ${id}`,
    `Submitted: ${submitted}`,
    who ? `Name: ${indent(who)}` : "",
    `Email: ${indent(email)}`,
    `Mobile: ${indent(phone)}`,
    `Consent to contact: ${consent ? "Yes" : "No"}`,
    `Marketing opt-in: ${marketing ? "Yes" : "No"}`,
    "",
    ...details.map((d) => `${d.label}: ${indent(d.value)}`),
    "",
    "Reply to this email to answer the sender directly.",
  ]
    .filter((line, i, all) => line !== "" || all[i - 1] !== "")
    .join("\n");

  return { subject: `New ${copy.noun} ${id}${who ? ` - ${who}` : ""}`, html, text };
}
