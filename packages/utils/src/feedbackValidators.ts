import { z } from "zod";

import {
  feedbackPageInsertSchema as dbFeedbackPageInsertSchema,
  feedbackPageRowSchema as dbFeedbackPageRowSchema,
  feedbackPageUpdateSchema as dbFeedbackPageUpdateSchema,
  feedbackPageTypeSchema,
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

const baseMetaSchema = z.object({ title: z.string(), description: z.string() });

export const feebackPageModeType = z.enum(["emoji", "star"]);

const questionMetaSchema = [
  z.object({
    type: feedbackPageTypeSchema.options[0],
  }),
  z.object({
    type: feedbackPageTypeSchema.options[1],
  }),
  z.object({
    type: feedbackPageTypeSchema.options[2],
    options: z.array(z.string()),
  }),
  z.object({
    type: feedbackPageTypeSchema.options[3],
    options: z.array(z.string()),
  }),
  z.object({
    type: feedbackPageTypeSchema.options[4],
    mode: feebackPageModeType,
  }),
] as const;

export const feedbackPageMetaSchema = z.discriminatedUnion("type", [
  baseMetaSchema.extend(questionMetaSchema[0].shape),
  baseMetaSchema.extend(questionMetaSchema[1].shape),
  baseMetaSchema.extend(questionMetaSchema[2].shape),
  baseMetaSchema.extend(questionMetaSchema[3].shape),
  baseMetaSchema.extend(questionMetaSchema[4].shape),
]);

export const feedbackPageRowSchema = dbFeedbackPageRowSchema.extend({
  meta: feedbackPageMetaSchema,
});

export const feedbackPageInsertSchema = dbFeedbackPageInsertSchema.extend({
  meta: feedbackPageMetaSchema,
});

export const feedbackPageUpdateSchema = dbFeedbackPageUpdateSchema.extend({
  meta: feedbackPageMetaSchema.optional(),
});
