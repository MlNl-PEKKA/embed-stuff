import type { AuthProcedureEndpoint } from "#procedures/protectedProcedure";
import { authProcedure } from "#procedures/protectedProcedure";

const query = ({ ctx }: AuthProcedureEndpoint) => ctx.user;

export const user = authProcedure.query(query);
