import { unstable_noStore as noStore } from "next/cache";
import type { PropsWithChildren } from "react";
import { api, HydrateClient } from "@/trpc/server";

const Layout = async (props: PropsWithChildren) => {
  noStore();
  void api.protected.emotes.read.prefetch();
  return <HydrateClient>{props.children}</HydrateClient>;
};

export default Layout;
