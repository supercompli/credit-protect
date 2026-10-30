import {redirect} from 'next/navigation';
import {Header,Footer,PageHero} from '@/components/credit/shared';
import {SignUpForm} from '@/components/credit/auth-forms';
import {ComingSoon} from '@/components/credit/coming-soon';
import {safeReturnPath} from '@/lib/auth/user';
import {neonAuthEnabled} from '@/lib/auth/server';
import {portalEnabled} from '@/lib/features';
export const metadata={title:'Create an account',robots:{index:false,follow:false}};
export default async function Page({searchParams}:{searchParams:Promise<{return_to?:string}>}){
  if(!portalEnabled())return <><Header/><main id="main-content" tabIndex={-1}><ComingSoon/></main><Footer/></>;
  const {return_to}=await searchParams;
  const returnTo=safeReturnPath(return_to??'','/login');
  // Local mode has no accounts; the sign-in page just continues.
  if(!neonAuthEnabled())redirect(`/auth/sign-in?return_to=${encodeURIComponent(returnTo)}`);
  return <><Header/><main id="main-content" tabIndex={-1}><PageHero label="Create an account" title="Set up your workspace." description="Create an account for the CreditCovered partner and broker workspace."/><div className="form-shell"><SignUpForm returnTo={returnTo}/></div></main><Footer/></>;
}
