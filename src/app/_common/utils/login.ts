import type { Login } from "~/app/api/auth/login";

export const login = async (provider: Login["input"]["provider"]) =>
  await fetch(`/api/auth/login/${provider}`);
