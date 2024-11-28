import { useFormParams } from "@/form/hooks/useFormParams";
import { api } from "@/trpc/react";

export const useKitEmotesRead = () => {
  const { form } = useFormParams();
  return api.protected.forms.form.kit.emotes.read.useSuspenseQuery({
    id: form,
  })[0];
};
