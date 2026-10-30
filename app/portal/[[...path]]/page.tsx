import {redirect} from 'next/navigation';import {requireUser} from '@/lib/auth/user';import {actor} from '@/lib/server';import Portal from '@/components/credit/portal';import {portalEnabled} from '@/lib/features';
export const dynamic='force-dynamic';export const metadata={title:'Partner portal',robots:{index:false,follow:false}};
export default async function Page(){if(!portalEnabled())redirect('/login');await requireUser('/portal');let role;try{role=(await actor()).role;}catch{redirect('/login')}if(role!=='partner')redirect('/admin');return <Portal role="partner"/>}
