import { mkdirSync } from "node:fs";
import path from "node:path";
import type { DatabaseSync } from "node:sqlite";

// Local development database. Mirrors db/schema.ts; keep the two in step.
const DDL = `
CREATE TABLE IF NOT EXISTS workspaces (owner TEXT PRIMARY KEY NOT NULL, data TEXT NOT NULL, version INTEGER NOT NULL DEFAULT 0);
CREATE TABLE IF NOT EXISTS sessions (id TEXT PRIMARY KEY NOT NULL, owner TEXT NOT NULL, role TEXT NOT NULL, org TEXT NOT NULL, expires INTEGER NOT NULL);
CREATE TABLE IF NOT EXISTS enquiries (id TEXT PRIMARY KEY NOT NULL, owner TEXT NOT NULL, kind TEXT NOT NULL, data TEXT NOT NULL, created TEXT NOT NULL);
CREATE INDEX IF NOT EXISTS enquiries_owner_created ON enquiries (owner, created);
CREATE TABLE IF NOT EXISTS limits (key TEXT PRIMARY KEY NOT NULL, count INTEGER NOT NULL DEFAULT 0);
`;

const globalForDb = globalThis as unknown as { cpSqlite?: DatabaseSync };

async function open(): Promise<DatabaseSync> {
  // Imported on first use: node:sqlite is experimental and only local mode needs it.
  const { DatabaseSync } = await import("node:sqlite");
  const file = path.resolve(/*turbopackIgnore: true*/ process.env.SQLITE_PATH || ".data/local.db");
  mkdirSync(path.dirname(file), { recursive: true });
  const db = new DatabaseSync(file);
  db.exec("PRAGMA journal_mode = WAL");
  db.exec(DDL);
  return db;
}

/** Same call shape as the Postgres path: $1, $2, ... placeholders and rows back. */
export async function querySqlite<T>(text: string, params: unknown[]): Promise<T[]> {
  // Kept on globalThis so dev-server reloads reuse one connection.
  const db = (globalForDb.cpSqlite ??= await open());
  // SQLite binds numbered parameters as ?1, ?2, ... by position.
  const sql = text.replace(/\$(\d+)/g, "?$1");
  const rows = db.prepare(sql).all(...(params as never[]));
  return rows.map((row) => ({ ...row })) as T[];
}
