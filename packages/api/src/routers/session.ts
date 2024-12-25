import type { SessionProcedureEndpoint } from "#procedures/sessionProcedure";
import { sessionProcedure } from "#procedures/sessionProcedure";

const query = ({ ctx }: SessionProcedureEndpoint) => ctx.session;

export const session = sessionProcedure.query(query);
