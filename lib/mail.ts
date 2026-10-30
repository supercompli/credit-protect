import sendmail from "sendmail";
import nodemailer from "nodemailer";
import { renderAdminEmail, renderConfirmationEmail, type EnquiryKind } from "./email-templates";

// All outgoing email goes through this file, so changing transport (for example
// to an authenticated TLS SMTP provider) only touches sendToInbox().
//
// The `sendmail` package speaks plain SMTP on port 25 straight to the
// recipient's mail server: no TLS, no SMTP login. Many ISPs and hosts block
// port 25, and unauthenticated mail often lands in spam.

const SEND_TIMEOUT_MS = 8000;
const SIMPLE_EMAIL = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;

let warnedUnconfigured = false;

function port(name: string): number | undefined {
  const value = Number(process.env[name]);
  return Number.isInteger(value) && value > 0 ? value : undefined;
}

function oneLine(value: string): string {
  return value.replace(/[\r\n]+/g, " ").trim().slice(0, 200);
}

function withTimeout<T>(work: Promise<T>, ms: number): Promise<T> {
  let timer: NodeJS.Timeout;
  const timeout = new Promise<never>((_, reject) => {
    timer = setTimeout(() => reject(new Error(`timed out after ${ms / 1000}s`)), ms);
  });
  return Promise.race([work, timeout]).finally(() => clearTimeout(timer));
}

type Mail = { subject: string; text: string; html?: string; replyTo?: string };

function warnUnconfigured() {
  if (!warnedUnconfigured) {
    warnedUnconfigured = true;
    console.warn("Email is not configured: set SMTP_HOST and SMTP_FROM (or MAIL_FROM), and optionally MAIL_TO.");
  }
}

/**
 * Sends one email to MAIL_TO from MAIL_FROM. Never throws, so a mail problem
 * cannot break a form submission. Resolves true only if the server accepted it.
 *
 * MAIL_DEV_HOST / MAIL_DEV_PORT send everything to one SMTP server (a local
 * capture tool) instead of the real recipient. MAIL_SMTP_HOST / MAIL_SMTP_PORT
 * add a fallback server tried after the recipient's own.
 */
export async function sendToInbox(mail: Mail): Promise<boolean> {
  const from = process.env.MAIL_FROM?.trim() || process.env.SMTP_FROM?.trim();
  const to = process.env.MAIL_TO?.trim() || process.env.SMTP_TO?.trim() || from;
  if (!to || !from) {
    warnUnconfigured();
    return false;
  }
  return deliver({ ...mail, to, from });
}

async function deliver(mail: Mail & { to: string; from: string }): Promise<boolean> {
  const { to, from } = mail;
  try {
    if (process.env.SMTP_HOST?.trim()) {
      const smtpPort = port("SMTP_PORT") || 587;
      const dev = Boolean(process.env.MAIL_DEV_HOST);
      const secure = !dev && (process.env.SMTP_SECURE === undefined
        ? smtpPort === 465
        : process.env.SMTP_SECURE.trim().toLowerCase() === "true");
      const transport = nodemailer.createTransport({
        host: process.env.MAIL_DEV_HOST || process.env.SMTP_HOST.trim(),
        port: dev ? port("MAIL_DEV_PORT") || 2525 : smtpPort,
        secure,
        requireTLS: !dev && !secure,
        auth: !dev && process.env.SMTP_USER ? {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS,
        } : undefined,
        connectionTimeout: SEND_TIMEOUT_MS,
        dnsTimeout: SEND_TIMEOUT_MS,
        greetingTimeout: SEND_TIMEOUT_MS,
        socketTimeout: SEND_TIMEOUT_MS,
        disableFileAccess: true,
        disableUrlAccess: true,
      });
      try {
        const result = await withTimeout(transport.sendMail({
          ...mail,
          subject: oneLine(mail.subject),
          replyTo: mail.replyTo && SIMPLE_EMAIL.test(mail.replyTo) ? mail.replyTo : undefined,
        }), SEND_TIMEOUT_MS);
        return result.accepted.length > 0 && result.rejected.length === 0;
      } finally {
        transport.close();
      }
    }
    const send = sendmail({
      logger: { debug() {}, info() {}, warn: console.warn, error: console.error },
      devHost: process.env.MAIL_DEV_HOST || undefined,
      devPort: port("MAIL_DEV_PORT"),
      smtpHost: process.env.MAIL_SMTP_HOST || undefined,
      smtpPort: port("MAIL_SMTP_PORT"),
    });
    await withTimeout(
      new Promise<void>((resolve, reject) => {
        send(
          {
            from,
            to,
            replyTo: mail.replyTo && SIMPLE_EMAIL.test(mail.replyTo) ? mail.replyTo : undefined,
            subject: oneLine(mail.subject),
            text: mail.text,
            html: mail.html,
          },
          (error) => (error ? reject(error) : resolve()),
        );
      }),
      SEND_TIMEOUT_MS,
    );
    return true;
  } catch (error) {
    console.error("CreditCovered could not send email:", error instanceof Error ? error.message : error);
    return false;
  }
}

/**
 * Emails the team about a saved form submission. Resolves true if it was sent.
 * The body is built in lib/email-templates.ts (HTML with a plain-text fallback).
 */
export function notifyEnquiry(enquiry: {
  id: string;
  kind: EnquiryKind;
  data: Record<string, unknown>;
}): Promise<boolean> {
  const { subject, html, text } = renderAdminEmail({ ...enquiry, submittedAt: new Date() });
  const email = enquiry.data.email;
  return sendToInbox({ subject, html, text, replyTo: typeof email === "string" ? email : undefined });
}

/**
 * Emails the person who submitted the form to confirm we received it. Needs only
 * MAIL_FROM (MAIL_TO is the team's inbox). Set MAIL_REPLY_TO if replies should go
 * somewhere other than MAIL_FROM. Resolves true if the server accepted it.
 */
export async function confirmEnquiry(enquiry: {
  id: string;
  kind: EnquiryKind;
  data: Record<string, unknown>;
}): Promise<boolean> {
  const from = process.env.MAIL_FROM?.trim() || process.env.SMTP_FROM?.trim();
  const to = typeof enquiry.data.email === "string" ? enquiry.data.email.trim() : "";
  if (!from) {
    warnUnconfigured();
    return false;
  }
  if (!SIMPLE_EMAIL.test(to)) return false;

  const { subject, html, text } = renderConfirmationEmail({ ...enquiry, submittedAt: new Date() });
  const replyTo = process.env.MAIL_REPLY_TO?.trim();
  return deliver({ to, from, subject, html, text, replyTo: replyTo && SIMPLE_EMAIL.test(replyTo) ? replyTo : undefined });
}
