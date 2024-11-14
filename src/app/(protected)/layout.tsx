import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { AppSidebar } from "@/protected/components/AppSidebar";
import { PathProvider } from "@/protected/contexts/PathProvider";
import type { ProtectedLayoutProps } from "@/protected/types";
import type { PropsWithChildren } from "react";

const Layout = (props: PropsWithChildren<ProtectedLayoutProps>) => {
  return (
    <PathProvider>
      <SidebarProvider className="min-h-screen">
        <AppSidebar />
        <SidebarInset>
          <header className="sticky top-0 z-10 flex h-[57px] items-center gap-1 border-b bg-background px-4">
            <SidebarTrigger />
            <div className="flex h-full w-full items-center justify-between">
              {props.breadcrumbs}
              {props.actions}
            </div>
          </header>
          <main className="flex flex-1 overflow-auto">{props.children}</main>
        </SidebarInset>
      </SidebarProvider>
    </PathProvider>
  );
};

export default Layout;
