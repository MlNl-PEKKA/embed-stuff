import type { ProcedureMutation } from "@/server/trpc";
import { api } from "@/trpc/react";
import type { Create } from "@/forms/create/api/create";
import { useRouter } from "next/navigation";

export const useFormCreate = (): ProcedureMutation<Create> => {
  const router = useRouter();
  return api.protected.forms.create.useMutation({
    onSuccess: () => router.push("/projects"),
  });
};
