import type { FeedbackQuestionRow } from "@embed-stuff/utils/feedbackQuestionValidators";

import type { TableType } from ".";

export type FeedbackQuestion = TableType<
  "feedback_question",
  FeedbackQuestionRow
>;
