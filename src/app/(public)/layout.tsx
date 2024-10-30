import type { PropsWithChildren } from "react";
import { HydrateClient } from "@/trpc/server";

const Layout = (props: PropsWithChildren) => {
  return <HydrateClient>{props.children}</HydrateClient>;
};

export default Layout;
