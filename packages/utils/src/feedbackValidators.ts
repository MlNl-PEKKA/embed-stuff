import { z } from "zod";

import {
  feedbackProjectRowSchema,
  feedbackProjectUpdateSchema,
} from "./dbValidators";

export const createSchema = feedbackProjectRowSchema.pick({ title: true });

export const readSchema = feedbackProjectRowSchema
  .pick({ title: true, status: true })
  .extend({ status: z.array(feedbackProjectRowSchema.shape.status) })
  .partial()
  .optional();

export const updateSchema = feedbackProjectUpdateSchema.omit({
  created_at: true,
  id: true,
  user_id: true,
});
