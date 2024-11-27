import { api } from "@/trpc/react";
import { useParams } from "next/navigation";
import type { FormParams } from "../types";

export const useForm = () => {
  const { form } = useParams<FormParams>();
  return api.protected.forms.form.read.useSuspenseQuery({ id: form })[0];
};
