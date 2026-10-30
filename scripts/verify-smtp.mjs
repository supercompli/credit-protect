import nodemailer from 'nodemailer';

const port = Number(process.env.SMTP_PORT || 587);
const secure = process.env.SMTP_SECURE === undefined ? port === 465 : process.env.SMTP_SECURE.trim().toLowerCase() === 'true';
const transport = nodemailer.createTransport({
  host: process.env.SMTP_HOST, port, secure, requireTLS: !secure,
  auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
  dnsTimeout: 8000, connectionTimeout: 8000, greetingTimeout: 8000, socketTimeout: 8000,
});
try {
  await transport.verify();
  console.log('SMTP authentication and TLS verified; no email sent.');
} catch (error) {
  console.error('SMTP verification failed:', error.code || 'unknown error');
  process.exitCode = 1;
} finally {
  transport.close();
}
