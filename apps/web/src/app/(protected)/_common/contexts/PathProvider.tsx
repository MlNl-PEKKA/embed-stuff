"use client";
import { usePathname } from "next/navigation";
import { createContext } from "react";
import type { PropsWithChildren } from "react";
import { PATHS } from "@/protected/constants/paths";

const usePathContext = () => {
  const path = usePathname();
  const currentModule = `/${path.split("/")[1]}` as keyof typeof PATHS;
  const name = PATHS[currentModule];
  return {
    path,
    module: currentModule,
    name,
  };
};

export const PathContext = createContext<
  ReturnType<typeof usePathContext> | undefined
>(undefined);

export const PathProvider = (props: PropsWithChildren) => {
  const value = usePathContext();
  return (
    <PathContext.Provider value={value}>{props.children}</PathContext.Provider>
  );
};
