import { projectInsertSchema } from "@/server/db/zod";
import { z } from "zod";

export const schema = projectInsertSchema
  .pick({
    name: true,
    url: true,
  })
  .extend({
    url: z.string().url(),
  });
