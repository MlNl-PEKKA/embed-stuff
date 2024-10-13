import { type PrivateProcedure, privateProcedure } from "~/server/api/trpc";

const query = async ({ ctx }: PrivateProcedure) => ctx.user;

export const user = privateProcedure.query(query);
