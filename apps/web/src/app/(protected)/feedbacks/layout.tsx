import { connection } from "next/server";

import type { FeedbacksNextProps } from "~/feedbacks/types";
import { READ } from "~/feedbacks/constants/read";
import { FeedbacksStoreProvider } from "~/feedbacks/store";
import { api, HydrateClient } from "~/trpc/server";

const Layout = async (props: FeedbacksNextProps["layout"]) => {
  await connection();
  void api.protected.feedbacks.read.prefetch(READ);
  return (
    <FeedbacksStoreProvider>
      <HydrateClient>{props.children}</HydrateClient>
    </FeedbacksStoreProvider>
  );
};

export default Layout;
