import { redirect } from "next/navigation";
import type { Login } from "~/app/api/auth/login";
import { api } from "~/trpc/server";

export const login = async (input: Login["input"]) => {
  const { url } = await api.auth.login(input);
  return redirect(url);
};
