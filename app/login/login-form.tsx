"use client";
import { useActionState } from "react";
import { login } from "./actions";
export function LoginForm(){ const [state,action,pending]=useActionState(login,undefined); return <form action={action} className="grid gap-4"><label className="label">Email<input className="field" type="email" name="email" autoComplete="email" required defaultValue="raj@example.com" /></label><label className="label">Password<input className="field" type="password" name="password" autoComplete="current-password" required defaultValue="RentManager123!" /></label>{state?.error&&<p role="alert" style={{color:"var(--danger)",fontSize:14}}>{state.error}</p>}<button className="btn-primary" disabled={pending}>{pending?"Signing in…":"Sign in"}</button></form> }
