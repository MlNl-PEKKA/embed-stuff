import type { FeedbackNextProps } from "~/feedback/types";
import { api, HydrateClient } from "~/trpc/server";

const Layout = async (props: FeedbackNextProps["layout"]) => {
  const { feedback } = await props.params;
  void api.protected.feedbacks.feedback.read.prefetch({ id: feedback });
  return <HydrateClient>{props.children}</HydrateClient>;
};

export default Layout;
