"use client";
import { usePathname } from "next/navigation";
import { createContext, memo, type PropsWithChildren } from "react";
import { PATHS } from "../constants";

const usePathContext = () => {
  const path = usePathname();
  const currentModule = `/${path.split("/")[1]}` as keyof typeof PATHS;
  const name = PATHS[currentModule];
  return {
    module: currentModule,
    path,
    name,
  };
};

export const PathContext = createContext<
  ReturnType<typeof usePathContext> | undefined
>(undefined);

export const PathProvider = memo((props: PropsWithChildren) => {
  const value = usePathContext();
  return (
    <PathContext.Provider value={value}>{props.children}</PathContext.Provider>
  );
});
PathProvider.displayName = "PathProvider";
