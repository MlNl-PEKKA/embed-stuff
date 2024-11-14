import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/protected/components/AppSidebar";
import { PathProvider } from "@/protected/contexts/PathProvider";
import type { ProtectedLayoutProps } from "@/protected/types";
import type { PropsWithChildren } from "react";

const Layout = (props: PropsWithChildren<ProtectedLayoutProps>) => {
  return (
    <PathProvider>
      <SidebarProvider className="min-h-screen">
        <AppSidebar />
        <SidebarInset className="px-2">
          <header className="flex h-[3rem] w-full items-center justify-between border-b-[1px] px-2 py-2">
            {props.breadcrumbs}
            {props.actions}
          </header>
          <main className="flex flex-1 overflow-auto">{props.children}</main>
        </SidebarInset>
      </SidebarProvider>
    </PathProvider>
  );
};

export default Layout;
