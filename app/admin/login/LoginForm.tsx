'use client';

import {useActionState} from 'react';
import {loginAction} from '@/app/admin/login/actions';

export function LoginForm() {
  const [state, action, pending] = useActionState(loginAction, undefined);

  return (
    <form action={action} className="space-y-4 rounded-2xl border border-line bg-card p-6">
      <label className="block text-sm">
        E-mail
        <input
          required
          type="email"
          name="email"
          autoComplete="username"
          className="mt-1 w-full rounded-lg border border-line bg-background px-3 py-2"
        />
      </label>
      <label className="block text-sm">
        Mot de passe
        <input
          required
          type="password"
          name="password"
          autoComplete="current-password"
          className="mt-1 w-full rounded-lg border border-line bg-background px-3 py-2"
        />
      </label>
      {state?.error && <p className="text-sm text-danger">{state.error}</p>}
      <button
        disabled={pending}
        className="w-full rounded-full bg-accent py-3 text-sm font-semibold text-background"
      >
        {pending ? 'Connexion…' : 'Se connecter'}
      </button>
    </form>
  );
}
