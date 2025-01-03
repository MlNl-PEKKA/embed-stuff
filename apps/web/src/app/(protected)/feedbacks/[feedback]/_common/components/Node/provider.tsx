import type { PropsWithChildren } from "react";
import { createContext, useContext } from "react";

import type { Tables } from "@embed-stuff/db/schema/index";

export type DataProps = { data: Tables["feedback_page"]["Row"]["meta"] };

const CardContext = createContext<DataProps["data"] | undefined>(undefined);

export const CardProvider = (props: PropsWithChildren<DataProps>) => {
  return (
    <CardContext.Provider value={props.data}>
      {props.children}
    </CardContext.Provider>
  );
};

export const useCard = () => {
  const context = useContext(CardContext);
  if (!context) throw new Error("useCard must be used within a CardProvider");
  return context;
};
