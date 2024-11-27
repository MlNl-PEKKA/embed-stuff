import { useFormParams } from "@/form/hooks/useFormParams";
import { api } from "@/trpc/react";

export const useFormKit = () => {
  const { form } = useFormParams();
  return api.protected.forms.form.kit.emotes.useSuspenseQuery({ id: form })[0];
};
