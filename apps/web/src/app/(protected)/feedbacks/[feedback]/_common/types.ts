import type { RouterInputs, RouterOutputs } from "@embed-stuff/api";
import type { NonVoid } from "@embed-stuff/utils/types";

import type { NextProps } from "~/app/types";

export type FeedbackNextProps = NextProps<["feedback"]>;

export type FeedbackPageNodes = {
  input: NonVoid<
    RouterInputs["protected"]["feedbacks"]["feedback"]["page"]["nodes"]
  >;
  output: RouterOutputs["protected"]["feedbacks"]["feedback"]["page"]["nodes"];
};

export type FeedbackPageEdges = {
  input: NonVoid<
    RouterInputs["protected"]["feedbacks"]["feedback"]["page"]["edges"]
  >;
  output: RouterOutputs["protected"]["feedbacks"]["feedback"]["page"]["edges"];
};
