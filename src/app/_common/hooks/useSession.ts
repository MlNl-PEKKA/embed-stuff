import { api } from "@/trpc/react";

export const useSession = () => api.session.useSuspenseQuery()[0];
