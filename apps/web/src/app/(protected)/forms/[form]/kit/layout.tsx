import type { FormLayout } from "@/form/types";
import { connection } from "next/server";

const Layout = async (props: FormLayout) => {
  await connection();
  return <>{props.children}</>;
};

export default Layout;
