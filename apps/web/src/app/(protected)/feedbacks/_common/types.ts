import type { RouterInputs, RouterOutputs } from "@embed-stuff/api";
import type { NonVoid } from "@embed-stuff/utils/types";

import type { NextProps } from "~/app/types";

export type Read = {
  input: NonVoid<RouterInputs["protected"]["feedbacks"]["read"]>;
  output: RouterOutputs["protected"]["feedbacks"]["read"];
};

export type FeedbacksNextProps = NextProps;
