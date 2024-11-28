import { connection } from "next/server";
import type { PropsWithChildren } from "react";

const Layout = async (props: PropsWithChildren) => {
  await connection();
  return <>{props.children}</>;
};

export default Layout;
