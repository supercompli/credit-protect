import {getUser} from '@/lib/auth/user';import {workspace,fail} from '@/lib/server';
export async function GET(){try{const u=await getUser();if(!u)return Response.json({enabled:false});const w=await workspace(u.userId);const s=w.data.settings;return Response.json({enabled:s.estimatorEnabled,unsecured:s.unsecured,mortgage:s.mortgage,basis:s.basis,method:s.method});}catch(e){return fail(e)}}
