import { type ProtectedProcedure, protectedProcedure } from "@/server/trpc";

const query = async ({ ctx }: ProtectedProcedure) => ctx.user;

export const user = protectedProcedure.query(query);
