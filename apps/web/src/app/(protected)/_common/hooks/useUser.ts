import { api } from "~/trpc/react";

export const useUser = () => api.protected.user.useSuspenseQuery()[0];
