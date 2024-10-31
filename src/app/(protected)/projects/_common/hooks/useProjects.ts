import { api } from "@/trpc/react";

export const useProjects = () =>
  api.protected.projects.read.useSuspenseQuery()[0];
