"use server";

import { redirect } from "next/navigation";

import type { Login } from "~/app/types";
import { api } from "~/trpc/server";

const login = async (input: Login["input"]) => {
  const { url } = await api.auth.login(input);
  return redirect(url);
};

export const google = async () => await login({ provider: "google" });

export const github = async () => await login({ provider: "github" });
