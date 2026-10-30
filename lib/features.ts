// Partner and broker login is "coming soon" until PORTAL_ENABLED=true.
//
// Do not turn this on yet. /api/session still lets any signed-in user choose the
// broker role for themselves, and each account gets its own seeded workspace.
// Role provisioning (brokers assigned by an admin, partners linked to an approved
// organisation) has to be built first.
export function portalEnabled(): boolean {
  return process.env.PORTAL_ENABLED === "true";
}
