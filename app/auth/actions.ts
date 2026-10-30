'use server';
import {redirect} from 'next/navigation';
import {getAuth,neonAuthEnabled} from '@/lib/auth/server';
import {startLocalSession,endLocalSession} from '@/lib/auth/local';
import {safeReturnPath} from '@/lib/auth/user';

export type AuthState={error:string}|null;

// After signing in, the demo role picker is the next step.
const landing=(formData:FormData)=>safeReturnPath(String(formData.get('return_to')||''),'/login');

export async function signInAction(_prev:AuthState,formData:FormData):Promise<AuthState>{
  if(!neonAuthEnabled()){
    try{await startLocalSession();}catch(e){return {error:e instanceof Error?e.message:'Local sign-in is unavailable.'};}
    redirect(landing(formData));
  }
  const email=String(formData.get('email')||'').trim();
  const password=String(formData.get('password')||'');
  if(!email||!password)return {error:'Enter your email address and password.'};
  const {error}=await getAuth().signIn.email({email,password});
  if(error)return {error:error.message||'We could not sign you in. Please try again.'};
  redirect(landing(formData));
}

export async function signUpAction(_prev:AuthState,formData:FormData):Promise<AuthState>{
  if(!neonAuthEnabled())return {error:'Accounts are not enabled in local mode. Use Continue on the sign-in page.'};
  const name=String(formData.get('name')||'').trim();
  const email=String(formData.get('email')||'').trim();
  const password=String(formData.get('password')||'');
  if(!name||!email)return {error:'Enter your name and email address.'};
  if(password.length<8)return {error:'Use a password of at least 8 characters.'};
  const {error}=await getAuth().signUp.email({name,email,password});
  if(error)return {error:error.message||'We could not create your account. Please try again.'};
  redirect(landing(formData));
}

export async function signOutAction(){
  if(neonAuthEnabled())await getAuth().signOut();
  else await endLocalSession();
  redirect('/login');
}
