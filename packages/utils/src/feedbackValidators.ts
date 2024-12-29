import { z } from "zod";

import {
  feedbackPageInsertSchema as dbFeedbackPageInsertSchema,
  feedbackPageRowSchema as dbFeedbackPageRowSchema,
  feedbackPageUpdateSchema as dbFeedbackPageUpdateSchema,
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

const feedbackPageMetaSchema = z
  .object({ title: z.string(), description: z.string() })
  .nullable();

export const feedbackPageRowSchema = dbFeedbackPageRowSchema.extend({
  meta: feedbackPageMetaSchema,
});

export const feedbackPageInsertSchema = dbFeedbackPageInsertSchema.extend({
  meta: feedbackPageMetaSchema.optional(),
});

export const feedbackPageUpdateSchema = dbFeedbackPageUpdateSchema.extend({
  meta: feedbackPageMetaSchema.optional(),
});
