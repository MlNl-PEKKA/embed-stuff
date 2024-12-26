import { useRouter } from "next/navigation";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { logout } from "~/app/utils/logout";

export const useLogout = () => {
  const queryClient = useQueryClient();
  const router = useRouter();
  return useMutation({
    mutationFn: async () => await logout(queryClient, router),
    onSuccess: () => queryClient.clear(),
  });
};
