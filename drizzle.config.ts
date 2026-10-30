import { defineConfig } from "drizzle-kit";

// drizzle-kit does not read .env.local on its own.
try {
  process.loadEnvFile(".env.local");
} catch {
  // Not present yet; DATABASE_URL may come from the shell instead.
}

export default defineConfig({
  // The earlier SQLite/D1 history stays in ./drizzle; Postgres starts fresh here.
  out: "./db/migrations",
  schema: "./db/schema.ts",
  dialect: "postgresql",
  dbCredentials: { url: process.env.DATABASE_URL ?? "" },
});
