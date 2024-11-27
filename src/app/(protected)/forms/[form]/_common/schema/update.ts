import { formInsertSchema, formUpdateSchema } from "@/server/db/zod";

export const schema = formUpdateSchema.pick({
  name: true,
});
