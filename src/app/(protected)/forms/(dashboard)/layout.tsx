import type { FormsLayout } from "@/forms/types";
import { connection } from "next/server";

const Layout = async (props: FormsLayout) => {
  await connection();
  return (
    <>
      {props.children}
      {props.create}
    </>
  );
};

export default Layout;
