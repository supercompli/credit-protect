# CreditCovered

A responsive South African credit life website and isolated partner/broker demonstration built with Next.js (App Router), React, TypeScript, Tailwind and accessible UI primitives.

## Running locally
```bash
pnpm install
pnpm dev        # http://localhost:3000
```
With no configuration the app runs in **local mode**: data lives in a SQLite file (`.data/local.db`), uploaded PDFs in `.data/uploads/`, and sign-in is a passwordless "Continue" button that stores an anonymous ID in a cookie. Local mode needs Node 22.13+ (it uses the built-in `node:sqlite`, which Node still flags as experimental) and refuses to run sign-in on Vercel.

### Moving to Neon
Copy `.env.example` to `.env.local` and set the variables. Each switch is independent and needs no code change:

| Variable | Effect |
|---|---|
| `DATABASE_URL` | Uses Neon Postgres instead of SQLite. Create the tables first with `pnpm db:migrate` (migrations in `db/migrations`). |
| `NEON_AUTH_BASE_URL` + `NEON_AUTH_COOKIE_SECRET` | Uses Neon Auth (email and password accounts) instead of local sign-in. |
| `UPLOAD_DIR` | Optional. Moves local PDF storage. |

Local data is not migrated. Document storage has no hosted option yet: `lib/storage.ts` writes to local disk, so replace its two functions (for example with Vercel Blob) before deploying anywhere without a persistent filesystem.

SQL in `lib/server.ts` and `app/api/*` is written to run on both SQLite and Postgres (`$1` placeholders, `ON CONFLICT`, `RETURNING`). If you change `db/schema.ts`, update the local DDL in `db/sqlite.ts` and run `pnpm db:generate`.

## Email notifications
The quote, partner application and contact forms (all three post to `/api/enquiry`) send two emails when an enquiry is saved, both HTML with a plain-text fallback:
- **Team notification** to `MAIL_TO`: who submitted it, one-tap reply, consent and marketing flags, and every submitted detail. Reply-To is the person who submitted it.
- **Confirmation** to the person who submitted: their reference, what happens next, and a clear note that it is not a quotation and does not confirm cover. It reflects back only a sanitised first name and, on quotes, the credit type and balance, so the form cannot be used to send arbitrary text to someone else's inbox. The email is skipped if the address is not valid.

Set `SMTP_HOST`, `SMTP_PORT`, `SMTP_SECURE`, `SMTP_USER`, `SMTP_PASS` and `SMTP_FROM` (see `.env.example`). Use port 465 with `SMTP_SECURE=true`, or port 587 with `SMTP_SECURE=false` for STARTTLS. Authenticated SMTP uses Nodemailer and requires encrypted delivery. `MAIL_FROM` overrides `SMTP_FROM`; team notifications go to `MAIL_TO`, then `SMTP_TO`, then the sender inbox. Recipient settings may list several addresses, comma-separated. Without sender settings the form still saves and the confirmation screen says no email was sent. A mail failure never blocks a submission, and a retried submission does not send a second email. Applications created inside the demo portal are not emailed. The API response reports `notificationSent` and `confirmationSent` separately.

The designs and copy are in `lib/email-templates.ts`. Before public launch, add the verified legal entity, FSP number and complaints contact to its footer.

All sending lives in `lib/mail.ts`. SMTP credentials use Nodemailer. If `SMTP_HOST` is absent, the legacy [`sendmail`](https://www.npmjs.com/package/sendmail) transport remains available with these limits:
- It sends **plain SMTP on port 25 with no TLS**, so the message, which contains the person's contact details, travels unencrypted.
- It delivers **straight to the recipient's mail server**. Many ISPs and cloud hosts (including Vercel) block outbound port 25, and mail from an unauthenticated address often lands in spam. It has no SMTP login, so it cannot use Gmail, SES, Brevo and similar providers.
- Set up SPF for the sending domain, and DKIM if you can; `sendmail` supports a DKIM key.
- It is unmaintained (last release 2022).

To test without real mail, point `MAIL_DEV_HOST` and `MAIL_DEV_PORT` at any local SMTP capture server. Check the configured SMTP connection without sending a message using `node --env-file=.env.local scripts/verify-smtp.mjs`.

## Working features
- All requested public routes, server-rendered explanations and unique metadata; sitemap, robots and WebSite structured data.
- Three-step enquiry with preserved in-memory answers, validation, separate marketing consent, idempotent submission and database receipt. Initial form excludes identity documents, bank and medical data.
- Public partner/contact forms; signed-in partner registrations enter a pending approval queue.
- Sign-in (Neon Auth, or local mode) and server-side, expiring HttpOnly demo sessions. Workspace data is isolated by authenticated owner; partner actions and documents are constrained by organisation and role.
- Persistent applications, configuration, audit trail and enquiry records; document bytes with authorised download endpoints.
- Individual and CSV/XLSX submissions, required fields, row errors, duplicate checks, download template, preview and explicit submit.
- Broker workflow, issuance evidence checks, per-row bulk approval failures, separate policy lifecycle, documents and CSV reports.
- Resources section (`/resources`): twenty-two credit life articles (common questions, guides by type of credit, and claims and payout guides) with a short answer, sources, related questions and Article/Breadcrumb structured data. Copy and facts live in `lib/resources.ts`, and each rule cites section 106 of the National Credit Act, the Credit Life Insurance Regulations (2017) or an NCR guideline. Have the licensed FSP verify the wording before public launch, and re-check it if the regulations change.
- Estimator disabled by default. Editable demonstration assumptions do not populate confirmed policy premiums. Vehicle pricing and unsupported rating bases require personalised assessment.
- Email notification to the team for every quote, partner application and contact submission.
- Non-sensitive browser analytics events for quote progress and submission; no analytics recipient connected.

## Demo boundaries and launch work
The site is a private review build. Use fictional data only. Login role selection is explicitly simulated; live partner password accounts and role provisioning are not implemented. Sign-in only separates demonstration workspaces by account; local mode has no real identity at all. No insurer API or claim-submission integration exists. Form submissions can email the team (see Email notifications), but there is no adviser response workflow. No sample insurer-issued documents are created.

Verify the legal entity, authorisations, insurer relationships, product eligibility and rating rules, contacts, disclosures, privacy and complaints content. Legal pages are labelled draft structures. Connect production identity/account approval, secure claims intake, adviser notifications, malware scanning, retention/deletion policies and domain DNS before public launch. PDF signature/extension/size and simple active-content checks are not a malware scanner.

Database and sign-in adapters: `db/`, `lib/server.ts`, `lib/auth/` and `app/api/*`. File storage: `lib/storage.ts`. Issuance and row rules: `lib/model.ts`. Public editable copy: `lib/content.ts`. Visual tokens: `app/globals.css`. Do not weaken server checks when replacing demo adapters.

## Verification
After the move from Vinext/Cloudflare to Next.js, in local mode: TypeScript passed, the production build passed, and 29 HTTP checks passed against the running build (public pages, sign-in gating, rate limiting, workspace seeding, demo role sessions, cross-user isolation, PDF upload/download, path-traversal and non-PDF rejection). The sign-in, role picker, broker workspace and sign-out flow were also exercised in a browser. Email was tested against a local SMTP capture server (all three forms, no duplicate on retry, no send when unconfigured or when the mail server is down, and header and SMTP-command injection attempts neutralised); delivery to a real mailbox over the internet has not been tested. Not yet verified: the Neon Postgres path and Neon Auth, which need a Neon project. The earlier rule assertions on `lib/model.ts` were not re-run, and mobile visual QA is still outstanding.
