import type { PropsWithChildren } from "react";
import { Logo } from "./Logo";
import { Navigation } from "./Navigation";
import type { PageProps } from "@/protected/types";
import { api, HydrateClient } from "@/trpc/server";
import { PathProvider } from "@/protected/contexts/PathProvider";
import { connection } from "next/server";

export async function Layout(props: PropsWithChildren<PageProps>) {
  await connection();
  void api.protected.user.prefetch();
  return (
    <HydrateClient>
      <PathProvider>
        <div className="flex h-screen w-full">
          <nav className="z-20 flex h-full flex-col border-r bg-background">
            <div className="border-b p-2">
              <Logo />
            </div>
            <Navigation />
          </nav>
          <div className="flex w-full flex-col">
            <header className="sticky top-0 z-10 flex h-[57px] items-center gap-1 border-b bg-background px-4">
              {props.breadcrumbs}
            </header>
            <main className="flex flex-1 overflow-auto">{props.children}</main>
          </div>
        </div>
      </PathProvider>
    </HydrateClient>
  );
}
