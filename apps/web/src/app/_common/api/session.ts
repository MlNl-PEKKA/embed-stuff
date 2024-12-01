import { type PublicProcedure, publicProcedure } from "@/server/trpc";

const query = ({ ctx }: PublicProcedure) => ctx.session;

export const session = publicProcedure.query(query);
