import type { TypeOf } from "zod";

import type {
  feedbackPageInsertSchema,
  feedbackPageRowSchema,
  feedbackPageUpdateSchema,
} from "@embed-stuff/utils/feedbackValidators";

import type { TableGuard, TableType } from ".";

export type FeedbackPage = TableGuard<
  TableType<"feedback_page", TypeOf<typeof feedbackPageRowSchema>>,
  TypeOf<typeof feedbackPageRowSchema>,
  TypeOf<typeof feedbackPageInsertSchema>,
  TypeOf<typeof feedbackPageUpdateSchema>
>;
