import React from "react";
import ReactDOM from "react-dom/client";
import r2wc from "react-to-webcomponent";

import { Banner } from ".";

export const BannerWidget = r2wc(Banner, React, ReactDOM, {
  props: {
    id: "string",
    theme: "string",
  },
});
