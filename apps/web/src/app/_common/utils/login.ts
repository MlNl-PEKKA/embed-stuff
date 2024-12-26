import type { Login } from "~/app/types";

export const login = async (provider: Login["input"]["provider"]) =>
  await fetch(`/api/auth/login/${provider}`);
