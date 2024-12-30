"use client";

import {
  Background,
  BackgroundVariant,
  ReactFlow,
  ReactFlowProvider,
} from "@xyflow/react";

import "@xyflow/react/dist/style.css";

import { Card } from "@embed-stuff/ui/ui/card";

import {
  PlaygroundStoreProvider,
  useEdges,
  useNodes,
  usePlaygroundStore,
} from "./store";

export const Playground = () => {
  return (
    <Card className="h-full w-full bg-background">
      <ReactFlowProvider>
        <Content />
      </ReactFlowProvider>
    </Card>
  );
};

const Content = () => {
  const nodes = useNodes();
  const edges = useEdges();
  if (nodes.status !== "success" || edges.status !== "success")
    return <Loading />;
  return (
    <PlaygroundStoreProvider nodes={nodes.data} edges={edges.data}>
      <ReactFlowContent />
    </PlaygroundStoreProvider>
  );
};

const Loading = () => (
  <ReactFlow className="text-background" fitView>
    <Background variant={BackgroundVariant.Dots} />
  </ReactFlow>
);

const ReactFlowContent = () => {
  const store = usePlaygroundStore();
  return (
    <ReactFlow {...store} className="text-background" fitView>
      <Background variant={BackgroundVariant.Dots} />
    </ReactFlow>
  );
};
