import { z } from "zod";

import { feedbackProjectRowSchema } from "@embed-stuff/utils/dbValidators";

export const readSchema = feedbackProjectRowSchema
  .pick({ title: true, status: true })
  .extend({ status: z.array(feedbackProjectRowSchema.shape.status) })
  .partial()
  .optional();
