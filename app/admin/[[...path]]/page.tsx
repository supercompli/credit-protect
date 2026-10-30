import {redirect} from 'next/navigation';import {requireUser} from '@/lib/auth/user';import {actor} from '@/lib/server';import Portal from '@/components/credit/portal';
export const dynamic='force-dynamic';export const metadata={title:'Broker administration',robots:{index:false,follow:false}};
export default async function Page(){await requireUser('/admin');let role;try{role=(await actor()).role;}catch{redirect('/login')}if(role!=='admin')redirect('/portal');return <Portal role="admin"/>}
