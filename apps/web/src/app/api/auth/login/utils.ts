import { redirect } from "next/navigation";
import type { Login } from "@/app/api/auth/login";
import { api } from "@/trpc/server";
import { connection } from "next/server";

export const login = async (input: Login["input"]) => {
  await connection();
  const { url } = await api.auth.login(input);
  redirect(url);
};
