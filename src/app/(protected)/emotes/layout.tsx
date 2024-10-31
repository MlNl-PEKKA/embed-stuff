import type { PropsWithChildren } from "react";
import { api, HydrateClient } from "@/trpc/server";
import { connection } from "next/server";

const Layout = async (props: PropsWithChildren) => {
  await connection();
  void api.protected.emotes.read.prefetch();
  return <HydrateClient>{props.children}</HydrateClient>;
};

export default Layout;
