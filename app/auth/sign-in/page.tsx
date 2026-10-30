import {Header,Footer,PageHero} from '@/components/credit/shared';
import {SignInForm} from '@/components/credit/auth-forms';
import {ComingSoon} from '@/components/credit/coming-soon';
import {safeReturnPath} from '@/lib/auth/user';
import {neonAuthEnabled} from '@/lib/auth/server';
import {portalEnabled} from '@/lib/features';
export const metadata={title:'Sign in',robots:{index:false,follow:false}};
export default async function Page({searchParams}:{searchParams:Promise<{return_to?:string}>}){
  if(!portalEnabled())return <><Header/><main id="main-content" tabIndex={-1}><ComingSoon/></main><Footer/></>;
  const {return_to}=await searchParams;
  return <><Header/><main id="main-content" tabIndex={-1}><PageHero label="Sign in" title="Sign in to your workspace." description="Sign in to the CreditCovered partner and broker workspace."/><div className="form-shell"><SignInForm returnTo={safeReturnPath(return_to??'','/login')} local={!neonAuthEnabled()}/></div></main><Footer/></>;
}
