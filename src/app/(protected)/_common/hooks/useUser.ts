import { api } from "~/trpc/react";

export const useUser = () => api.user.useSuspenseQuery()[0];
