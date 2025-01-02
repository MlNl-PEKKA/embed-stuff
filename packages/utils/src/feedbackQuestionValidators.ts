import { z } from "zod";

import {
  feedbackQuestionInsertSchema as dbFeedbackQuestionInsertSchema,
  feedbackQuestionRowSchema as dbFeedbackQuestionRowSchema,
  feedbackQuestionUpdateSchema as dbFeedbackQuestionUpdateSchema,
  feedbackQuestionTypeSchema,
} from "./dbValidators";

const type = z.enum(["emoji", "star"]);

const questionSchema = [
  z.object({
    type: feedbackQuestionTypeSchema.options[0],
    meta: z.null(),
  }),
  z.object({
    type: feedbackQuestionTypeSchema.options[1],
    meta: z.object({ options: z.array(z.string()) }),
  }),
  z.object({
    type: feedbackQuestionTypeSchema.options[2],
    meta: z.object({ options: z.array(z.string()) }),
  }),
  z.object({
    type: feedbackQuestionTypeSchema.options[3],
    meta: z.object({ type }),
  }),
] as const;

const questionUpdateSchema = [
  questionSchema[0].partial(),
  questionSchema[1].partial(),
  questionSchema[2].partial(),
  questionSchema[3].partial(),
] as const;

const baseRowSchema = dbFeedbackQuestionRowSchema.omit({
  type: true,
  meta: true,
});

const baseInsertSchema = dbFeedbackQuestionInsertSchema.omit({
  type: true,
  meta: true,
});

const baseUpdateSchema = dbFeedbackQuestionUpdateSchema.omit({
  type: true,
  meta: true,
});

export const feedbackQuestionRowSchema = z.discriminatedUnion("type", [
  baseRowSchema.extend(questionSchema[0].shape),
  baseRowSchema.extend(questionSchema[1].shape),
  baseRowSchema.extend(questionSchema[2].shape),
  baseRowSchema.extend(questionSchema[3].shape),
]);

export type FeedbackQuestionRow = z.infer<typeof feedbackQuestionRowSchema>;

export const feedbackQuestionInsertSchema = z.discriminatedUnion("type", [
  baseInsertSchema.extend(questionSchema[0].shape),
  baseInsertSchema.extend(questionSchema[1].shape),
  baseInsertSchema.extend(questionSchema[2].shape),
  baseInsertSchema.extend(questionSchema[3].shape),
]);

export type FeedbackQuestionInsert = z.infer<
  typeof feedbackQuestionInsertSchema
>;

export const feedbackQuestionUpdateSchema = z.discriminatedUnion("type", [
  baseUpdateSchema.extend(questionUpdateSchema[0].shape),
  baseUpdateSchema.extend(questionUpdateSchema[1].shape),
  baseUpdateSchema.extend(questionUpdateSchema[2].shape),
  baseUpdateSchema.extend(questionUpdateSchema[3].shape),
]);

export type FeedbackQuestionUpdate = z.infer<
  typeof feedbackQuestionUpdateSchema
>;
