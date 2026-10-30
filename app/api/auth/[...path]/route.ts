import { getAuth, neonAuthEnabled } from "@/lib/auth/server";

type Handlers = ReturnType<ReturnType<typeof getAuth>["handler"]>;

let handlers: Handlers | undefined;
const neon = () => (handlers ??= getAuth().handler());
const notEnabled = () => new Response("Neon Auth is not configured.", { status: 404 });

export async function GET(...args: Parameters<Handlers["GET"]>) {
  return neonAuthEnabled() ? neon().GET(...args) : notEnabled();
}

export async function POST(...args: Parameters<Handlers["POST"]>) {
  return neonAuthEnabled() ? neon().POST(...args) : notEnabled();
}
