import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

// Local-disk object store. It needs a persistent filesystem, so it works for
// local development but not on Vercel. Swap these two functions for Vercel Blob
// (or any object store) to deploy; callers only use putObject and getObject.
const root = () => path.resolve(/*turbopackIgnore: true*/ process.env.UPLOAD_DIR || ".data/uploads");

function resolveKey(key: string): string {
  const base = root();
  const target = path.resolve(base, key);
  if (!target.startsWith(base + path.sep)) throw new Error("Invalid document key.");
  return target;
}

export async function putObject(key: string, bytes: ArrayBuffer): Promise<void> {
  const target = resolveKey(key);
  await mkdir(path.dirname(target), { recursive: true });
  await writeFile(target, new Uint8Array(bytes));
}

export async function getObject(key: string): Promise<Uint8Array | null> {
  try {
    return new Uint8Array(await readFile(/*turbopackIgnore: true*/ resolveKey(key)));
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === "ENOENT") return null;
    throw error;
  }
}
