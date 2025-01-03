"use client";

import {
  Background,
  BackgroundVariant,
  Controls,
  ReactFlow,
} from "@xyflow/react";

import "@xyflow/react/dist/style.css";

import { Card } from "@embed-stuff/ui/ui/card";

import { usePlaygroundStore } from "~/feedback/store";

export const Playground = () => {
  const { portalNodes: _, ...store } = usePlaygroundStore();
  return (
    <Card className="h-full w-full bg-background">
      <ReactFlow {...store} className="text-background" fitView>
        <Background variant={BackgroundVariant.Dots} />
        <Controls className="" />
      </ReactFlow>
    </Card>
  );
};
