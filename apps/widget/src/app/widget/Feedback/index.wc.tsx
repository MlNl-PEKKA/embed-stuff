import React from "react";
import ReactDOM from "react-dom/client";
import r2wc from "react-to-webcomponent";

import { Feedback } from ".";

export const FeedbackWidget = r2wc(Feedback, React, ReactDOM, {
  props: {
    id: "string",
    theme: "string",
  },
});
