import { useMutation } from "@tanstack/react-query";
import type { Login } from "~/app/api/auth/login";
import { login } from "../utils/login";

export const useLogin = (input: Login["input"]) =>
  useMutation({
    mutationFn: async () => await login(input.provider),
  });
