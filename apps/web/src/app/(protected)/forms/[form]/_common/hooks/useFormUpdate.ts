import { api } from "@/trpc/react";
import { useFormParams } from "./useFormParams";

export const useFormUpdate = () => {
  const { form } = useFormParams();
  const mutation = api.protected.forms.form.update.useMutation();
  const mutate = (
    params: Omit<Parameters<(typeof mutation)["mutate"]>[0], "id">,
  ) => mutation.mutate({ id: form, ...params });
  const mutateAsync = async (
    params: Omit<Parameters<(typeof mutation)["mutate"]>[0], "id">,
  ) => {
    try {
      return await mutation.mutateAsync({ id: form, ...params });
    } catch {
      //
    }
  };
  return { ...mutation, mutate, mutateAsync };
};
