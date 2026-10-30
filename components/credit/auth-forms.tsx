'use client';
import {useActionState} from 'react';
import Link from 'next/link';
import {signInAction,signUpAction,type AuthState} from '@/app/auth/actions';

function Input({name,label,type='text',autoComplete}:{name:string;label:string;type?:string;autoComplete?:string}){
  return <div className="field"><label htmlFor={name}>{label}</label><input id={name} name={name} type={type} autoComplete={autoComplete} required/></div>;
}

export function SignInForm({returnTo,local}:{returnTo:string;local:boolean}){
  const [state,action,pending]=useActionState<AuthState,FormData>(signInAction,null);
  if(local)return <form className="form-card" action={action}>
    <h2>Continue to the demo</h2>
    <p>Local mode: there are no accounts or passwords. This saves an anonymous ID in a cookie on this device so your demonstration workspace stays separate.</p>
    <input type="hidden" name="return_to" value={returnTo}/>
    {state?.error&&<p className="error" role="alert">{state.error}</p>}
    <div className="form-actions"><button className="btn" type="submit" disabled={pending}>{pending?'Continuing…':'Continue'}</button></div>
  </form>;
  return <form className="form-card" action={action}>
    <h2>Sign in</h2>
    <input type="hidden" name="return_to" value={returnTo}/>
    <Input name="email" label="Email address" type="email" autoComplete="email"/>
    <Input name="password" label="Password" type="password" autoComplete="current-password"/>
    {state?.error&&<p className="error" role="alert">{state.error}</p>}
    <div className="form-actions"><button className="btn" type="submit" disabled={pending}>{pending?'Signing in…':'Sign in'}</button></div>
    <p className="fine">New here? <Link className="textlink" href={`/auth/sign-up?return_to=${encodeURIComponent(returnTo)}`}>Create an account</Link></p>
  </form>;
}

export function SignUpForm({returnTo}:{returnTo:string}){
  const [state,action,pending]=useActionState<AuthState,FormData>(signUpAction,null);
  return <form className="form-card" action={action}>
    <h2>Create an account</h2>
    <input type="hidden" name="return_to" value={returnTo}/>
    <Input name="name" label="Full name" autoComplete="name"/>
    <Input name="email" label="Email address" type="email" autoComplete="email"/>
    <Input name="password" label="Password (at least 8 characters)" type="password" autoComplete="new-password"/>
    {state?.error&&<p className="error" role="alert">{state.error}</p>}
    <div className="form-actions"><button className="btn" type="submit" disabled={pending}>{pending?'Creating account…':'Create account'}</button></div>
    <p className="fine">Already have an account? <Link className="textlink" href={`/auth/sign-in?return_to=${encodeURIComponent(returnTo)}`}>Sign in</Link></p>
  </form>;
}
