import type { PropsWithChildren } from "react";
import { Logo } from "./logo";
import { Navigation } from "./navigation";
import { Title } from "./title";

export function Layout(props: PropsWithChildren) {
  return (
    <div className="grid h-screen w-full pl-[56px]">
      <aside className="inset-y fixed left-0 z-20 flex h-full flex-col border-r">
        <div className="border-b p-2">
          <Logo />
        </div>
        <Navigation />
      </aside>
      <div className="flex flex-col">
        <header className="sticky top-0 z-10 flex h-[57px] items-center gap-1 border-b bg-background px-4">
          <Title />
        </header>
        <main className="grid flex-1 gap-4 overflow-auto p-4 md:grid-cols-2 lg:grid-cols-3">
          {props.children}
        </main>
      </div>
    </div>
  );
}
