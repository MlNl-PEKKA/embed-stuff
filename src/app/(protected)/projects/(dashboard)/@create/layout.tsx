import { InterceptedDrawer } from "@/protected/components/InterceptedDrawer";
import type { PropsWithChildren } from "react";

const Layout = (props: PropsWithChildren) => {
  return <InterceptedDrawer>{props.children}</InterceptedDrawer>;
};

export default Layout;
