"use server";

import {signIn} from "@/auth";
import {AuthError} from "next-auth";

export async function loginAction(_prev: {error?: string} | undefined, formData: FormData) {
  try {
    await signIn("credentials", {
      email: String(formData.get("email") ?? ""),
      password: String(formData.get("password") ?? ""),
      redirectTo: "/admin",
    });
  } catch (error) {
    if (error instanceof AuthError) {
      return {error: "Identifiants incorrects."};
    }
    throw error;
  }
}
