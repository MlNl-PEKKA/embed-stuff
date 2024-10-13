import { api } from "~/trpc/react";

export const useEmotes = () => api.emotes.useSuspenseQuery()[0];
