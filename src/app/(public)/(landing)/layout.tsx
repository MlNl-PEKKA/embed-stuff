import { api, HydrateClient } from "@/trpc/server";
import { connection } from "next/server";
import type { PublicLandingLayoutProps } from "@/public/landing/types";

const Layout = async (props: PublicLandingLayoutProps) => {
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
