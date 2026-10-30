import { cookies } from "next/headers";

// Local-mode identity: an anonymous ID in a cookie, with no password. It only
// keeps each browser's demo workspace separate and is for local use. Hosted
// deployments must configure Neon Auth instead, so this refuses to run there.
export const LOCAL_COOKIE = "cp_local_user";

const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

function assertLocalAuthAllowed(): void {
  if (process.env.VERCEL) {
    throw new Error(
      "Local sign-in is disabled on Vercel. Set NEON_AUTH_BASE_URL and NEON_AUTH_COOKIE_SECRET to use Neon Auth.",
    );
  }
}

export async function readLocalUserId(): Promise<string | null> {
  assertLocalAuthAllowed();
  const value = (await cookies()).get(LOCAL_COOKIE)?.value;
  return value && UUID.test(value) ? value.toLowerCase() : null;
}

export async function startLocalSession(): Promise<void> {
  assertLocalAuthAllowed();
  // Signing in again keeps the same ID, so the same workspace comes back.
  const id = (await readLocalUserId()) ?? crypto.randomUUID();
  (await cookies()).set(LOCAL_COOKIE, id, {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 30,
  });
}

export async function endLocalSession(): Promise<void> {
  (await cookies()).delete(LOCAL_COOKIE);
}
