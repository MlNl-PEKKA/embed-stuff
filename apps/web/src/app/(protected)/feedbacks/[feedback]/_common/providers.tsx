"use client";

import type { PropsWithChildren } from "react";
import { ReactFlowProvider } from "@xyflow/react";

import { useEdges, useNodes } from "./hooks";
import { PlaygroundStoreProvider } from "./store";

export const PlaygroundProvider = (props: PropsWithChildren) => {
  const nodes = useNodes();
  const edges = useEdges();
  return (
    <ReactFlowProvider>
      <PlaygroundStoreProvider nodes={nodes.data} edges={edges.data}>
        {props.children}
      </PlaygroundStoreProvider>
    </ReactFlowProvider>
  );
};
