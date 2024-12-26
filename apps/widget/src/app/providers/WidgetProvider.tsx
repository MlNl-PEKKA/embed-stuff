import type { PropsWithChildren } from "react";
import { createContext, useContext } from "react";

import type { EmoteKitWidgetProps } from "@embed-stuff/utils/types";
import { cn } from "@embed-stuff/ui/lib/utils";

import { TRPCReactProvider } from "~/trpc/react";
import styles from "../globals.css?inline";

const WidgetContext = createContext<EmoteKitWidgetProps | undefined>(undefined);

export const WidgetProvider = (
  props: PropsWithChildren<EmoteKitWidgetProps>,
) => {
  return (
    <>
      <style>{styles}</style>
      <span className={cn("widget", props.theme)}>
        <TRPCReactProvider>
          <WidgetContext.Provider value={props}>
            {props.children}
          </WidgetContext.Provider>
        </TRPCReactProvider>
      </span>
    </>
  );
};

export const useWidget = () => {
  const value = useContext(WidgetContext);
  if (!value) throw new Error("WidgetContext not found as a provider");
  return value;
};
