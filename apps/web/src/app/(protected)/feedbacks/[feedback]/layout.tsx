import type { FeedbackNextProps } from "~/feedback/types";
import { PlaygroundProvider } from "~/feedback/providers";
import { api, HydrateClient } from "~/trpc/server";

const Layout = async (props: FeedbackNextProps["layout"]) => {
  const { feedback } = await props.params;
  void api.protected.feedbacks.feedback.read.prefetch({ id: feedback });
  // void api.protected.feedbacks.feedback.page.nodes.prefetch({
  //   feedback_project_id: feedback,
  // });
  // void api.protected.feedbacks.feedback.page.edges.prefetch({
  //   feedback_project_id: feedback,
  // });
  return (
    <HydrateClient>
      <PlaygroundProvider>{props.children}</PlaygroundProvider>
    </HydrateClient>
  );
};

export default Layout;
