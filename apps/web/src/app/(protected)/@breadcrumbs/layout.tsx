import type { PropsWithChildren } from "react";

import { Breadcrumb, BreadcrumbList } from "@embed-stuff/ui/ui/breadcrumb";

const Layout = (props: PropsWithChildren) => {
  return (
    <Breadcrumb>
      <BreadcrumbList className="text-xl font-medium">
        {props.children}
      </BreadcrumbList>
    </Breadcrumb>
  );
};

export default Layout;
