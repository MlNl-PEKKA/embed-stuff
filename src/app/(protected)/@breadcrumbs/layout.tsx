import type { PropsWithChildren } from "react";

const Layout = (props: PropsWithChildren) => {
  return <h1 className="text-xl font-semibold">{props.children}</h1>;
};

export default Layout;
