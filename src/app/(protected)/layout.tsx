import { unstable_noStore as noStore } from "next/cache";
import type { PropsWithChildren } from "react";
import { Layout as ProtectedLayout } from "~/protected/components/Layout";
import { PathProvider } from "~/protected/contexts/PathProvider";
import { api, HydrateClient } from "~/trpc/server";

const Layout = async (props: PropsWithChildren) => {
  noStore();
  void (await api.user.prefetch());
  return (
    <HydrateClient>
      <PathProvider>
        <ProtectedLayout>{props.children} </ProtectedLayout>
      </PathProvider>
    </HydrateClient>
  );
};

export default Layout;
