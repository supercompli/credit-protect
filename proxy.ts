import { NextResponse, type NextRequest } from "next/server";
import { getAuth, neonAuthEnabled } from "@/lib/auth/server";

// With Neon Auth, keeps the session fresh and sends signed-out visitors to sign
// in. API routes are left out on purpose so they answer with JSON, not redirects.
// In local mode the pages themselves redirect, so this passes through.
export default function proxy(request: NextRequest) {
  if (!neonAuthEnabled()) return NextResponse.next();
  return getAuth().middleware({ loginUrl: "/auth/sign-in" })(request);
}

export const config = {
  matcher: ["/portal/:path*", "/admin/:path*"],
};
