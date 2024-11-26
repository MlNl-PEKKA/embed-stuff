import { api } from "@/trpc/react";

export const useForms = () => api.protected.forms.read.useSuspenseQuery()[0];
