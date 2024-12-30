"use client";

import type { FeedbackPage } from "~/feedback/types";
import { useFeedbackPageRead } from "~/feedback/hooks";

export const Widget = () => {
  return <Pages />;
};

const Pages = () => {
  const pages = useFeedbackPageRead();
  if (pages.length === 0) return <>No pages</>;
  return pages.map((page) => <Page key={page.id} {...page} />);
};

const Page = (props: FeedbackPage["output"][number]) => {
  return <>{props.meta?.title}</>;
};
