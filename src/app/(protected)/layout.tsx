import { Logo } from "@/protected/components/Logo";
import { Navigation } from "@/protected/components/Navigation";
import { PathProvider } from "@/protected/contexts/PathProvider";
import type { ProtectedLayoutProps } from "@/protected/types";
import type { PropsWithChildren } from "react";

const Layout = (props: PropsWithChildren<ProtectedLayoutProps>) => {
  return (
    <PathProvider>
      <div className="flex h-screen w-full">
        <nav className="z-20 flex h-full flex-col border-r bg-background">
          <div className="border-b p-2">
            <Logo />
          </div>
          <Navigation />
        </nav>
        <div className="flex w-full flex-col">
          <header className="sticky top-0 z-10 flex h-[57px] items-center justify-between gap-1 border-b bg-background px-4">
            {props.breadcrumbs}
            {props.actions}
          </header>
          <main className="flex flex-1 overflow-auto">{props.children}</main>
        </div>
      </div>
    </PathProvider>
  );
};

export default Layout;
