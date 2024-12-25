import { redirect } from "next/navigation";
import { connection } from "next/server";

import type { RouterInputs } from "@embed-stuff/api";

import { api } from "~/trpc/server";

export const login = async (input: RouterInputs["auth"]["login"]) => {
  await connection();
  const { url } = await api.auth.login(input);
  redirect(url);
};
