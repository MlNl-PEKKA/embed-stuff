import { api } from "@/trpc/react";
import { useFormParams } from "./useFormParams";

export const useForm = () => {
  const { form } = useFormParams();
  return api.protected.forms.form.read.useSuspenseQuery({ id: form })[0];
};
