import { Navigation } from "@/form/components/Navigation";
import type { FormLayout } from "@/form/types";
import { connection } from "next/server";

const Layout = async (props: FormLayout) => {
  await connection();
  return (
    <div className="flex h-full w-full flex-col gap-4 px-4 py-2">
      <Navigation />
      {props.children}
    </div>
  );
};

export default Layout;
