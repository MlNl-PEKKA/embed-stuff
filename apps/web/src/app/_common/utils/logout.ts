import { type QueryClient } from "@tanstack/react-query";
import { type AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

export const logout = async (
  queryClient: QueryClient,
  router: AppRouterInstance,
) => {
  return await fetch("/api/auth/logout")
    .then(() => {
      queryClient.clear();
      router.refresh();
    })
    .catch(() => {
      //
    });
};
