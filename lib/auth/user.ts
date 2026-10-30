import { redirect } from "next/navigation";
import { getAuth, neonAuthEnabled } from "./server";
import { readLocalUserId } from "./local";

export type AppUser = {
  userId: string;
  displayName: string;
  email: string;
  fullName: string | null;
};

const SIGN_IN_PATH = "/auth/sign-in";

/** The signed-in user, or null. An auth outage reads as signed out rather than breaking public pages. */
export async function getUser(): Promise<AppUser | null> {
  try {
    if (!neonAuthEnabled()) {
      const userId = await readLocalUserId();
      return userId
        ? { userId, displayName: "Local user", email: "local@localhost", fullName: null }
        : null;
    }

    const { data: session } = await getAuth().getSession();
    const user = session?.user;
    if (!user) return null;
    const fullName = user.name?.trim() || null;
    return {
      userId: user.id,
      displayName: fullName ?? user.email,
      email: user.email,
      fullName,
    };
  } catch (error) {
    console.error("CreditCovered could not read the session:", error);
    return null;
  }
}

export async function requireUser(returnTo: string): Promise<AppUser> {
  const user = await getUser();
  if (user) return user;

  redirect(signInPath(returnTo));
}

export function signInPath(returnTo: string): string {
  return `${SIGN_IN_PATH}?return_to=${encodeURIComponent(safeReturnPath(returnTo))}`;
}

/** Only same-site relative paths are allowed, and never the auth pages themselves. */
export function safeReturnPath(value: string, fallback = "/"): string {
  if (!value.startsWith("/") || value.startsWith("//")) return fallback;

  let url: URL;
  try {
    url = new URL(value, "https://app.local");
  } catch {
    return fallback;
  }
  if (url.origin !== "https://app.local") return fallback;
  if (url.pathname.startsWith("/auth/") || url.pathname.startsWith("/api/auth/")) {
    return fallback;
  }

  return `${url.pathname}${url.search}${url.hash}`;
}
