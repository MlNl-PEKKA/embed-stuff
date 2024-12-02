import { publicProcedure } from "@/server/trpc";
import type { PublicProcedure } from "@/server/trpc";

const query = ({ ctx }: PublicProcedure) => ctx.session;

export const session = publicProcedure.query(query);
