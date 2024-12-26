"use client";

import Script from "next/script";

import { getWidgetUrl } from "@embed-stuff/utils/getWidgetUrl";

import { useFeedback } from "~/feedback/hooks";

export const Preview = () => {
  const { feedback } = useFeedback();
  return (
    <div className="dotted flex h-full w-full items-center justify-center">
      <Script src={getWidgetUrl()} />
      <embed-stuff-feedback id={feedback} theme="dark"></embed-stuff-feedback>
    </div>
  );
};
