import {signOut} from "@/auth";
import {requireStaff} from "@/lib/require-staff";
import Link from "next/link";
import type {ReactNode} from "react";

export async function AdminShell({children}: {children: ReactNode}) {
  const session = await requireStaff();

  return (
    <div>
      <header className="flex items-center justify-between border-b border-[#2a313c] px-4 py-3">
        <nav className="flex gap-4 text-sm">
          <Link href="/admin">Stock</Link>
          <Link href="/admin/vehicles/new">Nouveau</Link>
          <Link href="/admin/settings">Réglages</Link>
        </nav>
        <div className="flex items-center gap-3 text-sm text-[#9aa3b2]">
          <span>{session.user?.email}</span>
          <form
            action={async () => {
              "use server";
              await signOut({redirectTo: "/admin/login"});
            }}
          >
            <button className="text-[#f5c518]">Déconnexion</button>
          </form>
        </div>
      </header>
      <div className="mx-auto max-w-6xl px-4 py-8">{children}</div>
    </div>
  );
}
