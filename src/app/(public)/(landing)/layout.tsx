import type { PropsWithChildren } from "react";
import type { PageProps } from "@/landing/types";
import { api, HydrateClient } from "@/trpc/server";
import { connection } from "next/server";

const Layout = async (props: PropsWithChildren<PageProps>) => {
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
