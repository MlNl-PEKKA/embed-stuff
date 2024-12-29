import type { AuthProcedureEndpoint } from "#procedures/authProcedure";
import { authProcedure } from "#procedures/authProcedure";

const query = ({ ctx }: AuthProcedureEndpoint) => ctx.user;

export const user = authProcedure.query(query);
