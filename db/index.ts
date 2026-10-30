import { neon } from "@neondatabase/serverless";
import { querySqlite } from "./sqlite";

let client: ReturnType<typeof neon> | undefined;

/**
 * Run one parameterised statement ($1, $2, ...).
 * With DATABASE_URL set it goes to Neon Postgres over HTTP; without it, to a
 * local SQLite file (.data/local.db). Keep SQL portable between the two.
 */
export async function query<T = Record<string, unknown>>(
  text: string,
  params: unknown[] = [],
): Promise<T[]> {
  const rawUrl = process.env.DATABASE_URL?.trim();
  // Dashboard values can accidentally include the quotes used in .env files.
  const url = rawUrl?.replace(/^(["'])([\s\S]*)\1$/, "$2").trim();
  if (!url) {
    // The SQLite fallback writes to .data/, and Vercel's filesystem is read-only.
    if (process.env.VERCEL) {
      throw new Error("DATABASE_URL is not set. Add your Neon connection string in the Vercel project's environment variables.");
    }
    return querySqlite<T>(text, params);
  }

  if (!client) {
    try {
      const parsed = new URL(url);
      if (!['postgres:', 'postgresql:'].includes(parsed.protocol) || !parsed.hostname || !parsed.username || !parsed.pathname.slice(1)) {
        throw new Error("Invalid database URL");
      }
      client = neon(url);
    } catch {
      // The driver's URL errors include the full connection string and password.
      throw new Error("DATABASE_URL is invalid. Set it to a PostgreSQL connection URL in the Vercel project's environment variables.");
    }
  }
  return (await client.query(text, params)) as T[];
}
