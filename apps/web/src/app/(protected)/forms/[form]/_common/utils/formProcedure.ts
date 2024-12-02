import { formRowSchema } from "@/server/db/zod";
import { protectedProcedure } from "@/server/trpc";
import type { Procedure } from "@/server/trpc";
import { z } from "zod";

const schema = formRowSchema
  .pick({ id: true })
  .extend({ id: z.string().uuid() });

export const formProcedure = protectedProcedure.input(schema);

export type FormProcedure<T = undefined> = Procedure<typeof formProcedure, T>;
