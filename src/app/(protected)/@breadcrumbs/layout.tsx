import { Breadcrumb, BreadcrumbList } from "@/components/ui/breadcrumb";
import type { PropsWithChildren } from "react";

const Layout = (props: PropsWithChildren) => {
  return (
    <Breadcrumb>
      <BreadcrumbList className="text-base">{props.children}</BreadcrumbList>
    </Breadcrumb>
  );
};

export default Layout;
