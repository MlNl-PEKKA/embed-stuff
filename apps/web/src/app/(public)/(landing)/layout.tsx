import { connection } from "next/server";

import type { LandingNextProps } from "~/public/landing/types";
import { api, HydrateClient } from "~/trpc/server";

const Layout = async (props: LandingNextProps["layout"]) => {
  await connection();
  void api.session.prefetch();
  return (
    <HydrateClient>
      <div className="flex min-h-full items-center justify-center">
        {props.children}
        {props.login}
      </div>
    </HydrateClient>
  );
};

export default Layout;
