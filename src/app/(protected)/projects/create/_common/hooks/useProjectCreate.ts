import type { ProcedureMutation } from "@/server/trpc";
import { api } from "@/trpc/react";
import type { Create } from "@/projects/create/api/create";
import { useRouter } from "next/navigation";

export const useProjectCreate = (): ProcedureMutation<Create> => {
  const router = useRouter();
  return api.protected.projects.create.useMutation({
    onSuccess: () => router.push("/projects"),
  });
};
