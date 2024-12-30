"use client";

import {
  Background,
  BackgroundVariant,
  ReactFlow,
  ReactFlowProvider,
} from "@xyflow/react";

import "@xyflow/react/dist/style.css";

import { Card } from "@embed-stuff/ui/ui/card";

import { PlaygroundStoreProvider, usePlaygroundStore } from "./store";

export const Playground = () => {
  return (
    <Card className="h-full w-full bg-background">
      <ReactFlowProvider>
        <PlaygroundStoreProvider>
          <Content />
        </PlaygroundStoreProvider>
      </ReactFlowProvider>
    </Card>
  );
};

const Content = () => {
  const { onLayout: _, ...store } = usePlaygroundStore((store) => store);
  return (
    <ReactFlow {...store} className="text-background" fitView>
      <Background variant={BackgroundVariant.Dots} />
    </ReactFlow>
  );
};
