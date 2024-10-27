import { api } from "~/trpc/react";

export const useEmotes = () => api.protected.emotes.read.useSuspenseQuery()[0];
