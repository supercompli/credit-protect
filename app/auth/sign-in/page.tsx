import {Header,Footer,PageHero} from '@/components/credit/shared';
import {SignInForm} from '@/components/credit/auth-forms';
import {safeReturnPath} from '@/lib/auth/user';
import {neonAuthEnabled} from '@/lib/auth/server';
export const metadata={title:'Sign in',robots:{index:false,follow:false}};
export default async function Page({searchParams}:{searchParams:Promise<{return_to?:string}>}){
  const {return_to}=await searchParams;
  return <><Header/><main id="main-content" tabIndex={-1}><PageHero label="Sign in" title="Open your demonstration workspace." description="Sign in to explore the CreditCovered partner and broker demo. Your demonstration data is kept separate by your account."/><div className="form-shell"><SignInForm returnTo={safeReturnPath(return_to??'','/login')} local={!neonAuthEnabled()}/></div></main><Footer/></>;
}
