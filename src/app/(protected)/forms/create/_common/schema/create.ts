import { formInsertSchema } from "@/server/db/zod";

export const schema = formInsertSchema.pick({
  name: true,
});
