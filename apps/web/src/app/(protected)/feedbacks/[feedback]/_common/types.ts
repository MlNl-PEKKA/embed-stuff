import type { RouterInputs, RouterOutputs } from "@embed-stuff/api";
import type { NonVoid } from "@embed-stuff/utils/types";

import type { NextProps } from "~/app/types";

export type FeedbackNextProps = NextProps<["feedback"]>;

export type FeedbackPage = {
  input: NonVoid<
    RouterInputs["protected"]["feedbacks"]["feedback"]["page"]["read"]
  >;
  output: RouterOutputs["protected"]["feedbacks"]["feedback"]["page"]["read"];
};
