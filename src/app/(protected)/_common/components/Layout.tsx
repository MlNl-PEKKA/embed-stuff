"use client";
import type { PropsWithChildren } from "react";
import { Logo } from "./Logo";
import { Title } from "./Title";
import { Navigation } from "./Navigation";
import { useUser } from "../hooks/useUser";

export function Layout(props: PropsWithChildren) {
  const a = useUser();
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
        <main className="flex flex-1 overflow-auto">{props.children}</main>
      </div>
    </div>
  );
}
