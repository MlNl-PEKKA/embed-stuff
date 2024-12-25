import { z } from "zod";

import type { ProcedureEndpoint, ProcedureMiddleware } from "#types";
import { publicProcedure } from "./publicProcedure";

const schema = z.object({ id: z.string().uuid() });

export const widgetProcedure = publicProcedure.input(schema);

export type WidgetProcedureEndpoint<T = undefined> = ProcedureEndpoint<
  typeof widgetProcedure,
  T
>;
export type WidgetProcedureMiddleware = ProcedureMiddleware<
  typeof widgetProcedure
>;
