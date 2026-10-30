import type { NextConfig } from "next";

const isDev = process.env.NODE_ENV !== "production";

// Next.js emits inline scripts for hydration and the app uses inline styles, so
// script-src and style-src keep 'unsafe-inline'. A per-request nonce would drop
// that, but it makes every page render on demand and loses static caching.
// Nothing is loaded from another origin (next/font self-hosts the font).
const csp = [
  "default-src 'self'",
  `script-src 'self' 'unsafe-inline'${isDev ? " 'unsafe-eval'" : ""}`,
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob:",
  "font-src 'self' data:",
  "connect-src 'self'",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'none'",
].join("; ");

const securityHeaders = [
  { key: "Content-Security-Policy", value: csp },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), payment=(), usb=()",
  },
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
];

const nextConfig: NextConfig = {
  async headers() {
    // Sign-in and the signed-in areas should never appear in search results. The header covers
    // redirects too (/portal and /admin send signed-out visitors to sign-in), which a page's own
    // robots meta tag cannot.
    const noindex = [{ key: "X-Robots-Tag", value: "noindex, nofollow" }];
    return [
      { source: "/:path*", headers: securityHeaders },
      ...["/login", "/auth/:path*", "/portal/:path*", "/admin/:path*"].map((source) => ({ source, headers: noindex })),
    ];
  },
};

export default nextConfig;
