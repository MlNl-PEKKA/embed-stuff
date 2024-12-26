import { feedbackProjectRowSchema } from "@embed-stuff/utils/dbValidators";

export const createSchema = feedbackProjectRowSchema.pick({ title: true });
