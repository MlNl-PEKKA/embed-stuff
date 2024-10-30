import { unstable_noStore as noStore } from "next/cache";
import type { PropsWithChildren } from "react";
import type { PageProps } from "@/landing/types";
import { api } from "@/trpc/server";

const Layout = (props: PropsWithChildren<PageProps>) => {
  noStore();
  void api.session.prefetch();
  return (
    <div className="flex min-h-full items-center justify-center">
      {props.children}
      {props.login}
    </div>
  );
};

export default Layout;
