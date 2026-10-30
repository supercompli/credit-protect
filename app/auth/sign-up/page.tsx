import {redirect} from 'next/navigation';
import {Header,Footer,PageHero} from '@/components/credit/shared';
import {SignUpForm} from '@/components/credit/auth-forms';
import {safeReturnPath} from '@/lib/auth/user';
import {neonAuthEnabled} from '@/lib/auth/server';
export const metadata={title:'Create an account',robots:{index:false,follow:false}};
export default async function Page({searchParams}:{searchParams:Promise<{return_to?:string}>}){
  const {return_to}=await searchParams;
  const returnTo=safeReturnPath(return_to??'','/login');
  // Local mode has no accounts; the sign-in page just continues.
  if(!neonAuthEnabled())redirect(`/auth/sign-in?return_to=${encodeURIComponent(returnTo)}`);
  return <><Header/><main id="main-content" tabIndex={-1}><PageHero label="Create an account" title="Set up your demonstration workspace." description="Create an account to explore the CreditCovered partner and broker demo. Use fictional data only."/><div className="form-shell"><SignUpForm returnTo={returnTo}/></div></main><Footer/></>;
}
