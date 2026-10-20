import {signIn} from "@/auth";
import {AuthError} from "next-auth";
import {redirect} from "next/navigation";

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{error?: string}>;
}) {
  const {error} = await searchParams;

  async function login(formData: FormData) {
    "use server";
    try {
      await signIn("credentials", {
        email: String(formData.get("email") ?? ""),
        password: String(formData.get("password") ?? ""),
        redirectTo: "/admin",
      });
    } catch (err) {
      if (err instanceof AuthError) {
        redirect("/admin/login?error=1");
      }
      throw err;
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#090b0e] px-4 text-[#f4f1ea]">
      <form action={login} className="w-full max-w-sm space-y-4 rounded-2xl border border-[#2a313c] bg-[#12161c] p-6">
        <h1 className="text-xl font-semibold">Admin — Garage de la Largue</h1>
        <p className="text-sm text-[#9aa3b2]">Connexion personnel</p>
        {error ? <p className="text-sm text-red-400">Identifiants incorrects.</p> : null}
        <label className="block text-sm">
          E-mail
          <input name="email" type="email" required className="mt-1 w-full rounded-xl border border-[#2a313c] bg-[#181d25] px-3 py-2" />
        </label>
        <label className="block text-sm">
          Mot de passe
          <input name="password" type="password" required className="mt-1 w-full rounded-xl border border-[#2a313c] bg-[#181d25] px-3 py-2" />
        </label>
        <button className="w-full rounded-full bg-[#f5c518] py-3 font-semibold text-[#1a1403]">
          Se connecter
        </button>
      </form>
    </main>
  );
}
