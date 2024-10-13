import type { PropsWithChildren } from "react";
import { Layout as ProtectedLayout } from "~/protected/components/Layout";
import { PathProvider } from "~/protected/contexts/PathProvider";

const Layout = (props: PropsWithChildren) => {
  return (
    <PathProvider>
      <ProtectedLayout>{props.children} </ProtectedLayout>
    </PathProvider>
  );
};

export default Layout;
