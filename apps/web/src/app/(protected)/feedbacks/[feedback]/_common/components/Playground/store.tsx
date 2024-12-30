"use client";

import type {
  Edge as EdgeType,
  Node as NodeType,
  ReactFlowProps,
} from "@xyflow/react";
import type { PropsWithChildren } from "react";
import type { StoreApi } from "zustand";
import { createContext, useContext, useState } from "react";
import Dagre from "@dagrejs/dagre";
import {
  addEdge,
  applyEdgeChanges,
  applyNodeChanges,
  useReactFlow,
} from "@xyflow/react";
import { createStore, useStore } from "zustand";

import type { NonUndefined } from "@embed-stuff/utils/types";

import type { FeedbackPage } from "~/feedback/types";
import { useFeedbackPageRead } from "~/feedback/hooks";
import { Node } from "./Node";

export type Data = FeedbackPage["output"][number];

export type Type = "node";

type Nodes = NodeType<Data, Type>[];

type Edges = EdgeType<Data>[];

type Direction = "TB" | "LR";

export type Store = ReactFlowProps<Nodes[number], Edges[number]> & {
  onLayout: (direction: Direction) => void;
};

export const getLayoutedElements = (
  nodes: Nodes,
  edges: Edges,
  options: { direction: Direction },
) => {
  const width = 410;
  const g = new Dagre.graphlib.Graph().setDefaultEdgeLabel(() => ({}));
  g.setGraph({ rankdir: options.direction });
  edges.forEach((edge) => g.setEdge(edge.source, edge.target));
  nodes.forEach((node) =>
    g.setNode(node.id, {
      ...node,
      width,
      height: node.measured?.height ?? 0,
    }),
  );
  Dagre.layout(g);
  return {
    nodes: nodes.map((node, i) => {
      const position = g.node(node.id);
      const x = position.x - width / 2;
      const y = position.y - (node.measured?.height ?? 0) / 2 + i * 30;
      return { ...node, position: { x, y } };
    }),
    edges,
  };
};

const getNodes = (pages: Data[]): NonUndefined<Store["nodes"]> =>
  pages.map((page, i) => ({
    id: page.id,
    data: page,
    type: "node" satisfies Type,
    position: { x: 0, y: i * 100 },
  }));

const getEdges = (pages: Data[]): NonUndefined<Store["edges"]> => {
  return pages.reduce(
    (acc, page) => {
      if (page.next_id)
        acc.push({
          id: `xyEdge__${page.id}-${page.next_id}`,
          source: page.id,
          target: page.next_id,
        });
      return acc;
    },
    [] as NonUndefined<Store["edges"]>,
  );
};

const nodeTypes = { node: Node };

const useStoreDefaults = () => {
  const pages = useFeedbackPageRead();
  const { fitView } = useReactFlow();
  const [store] = useState<StoreApi<Store>>(() =>
    createStore((set) => {
      const { nodes, edges } = getLayoutedElements(
        getNodes(pages),
        getEdges(pages),
        {
          direction: "LR",
        },
      );
      return {
        nodes,
        edges,
        nodeTypes,
        onNodesChange: (changes) =>
          set((state) => ({
            nodes: applyNodeChanges(changes, state.nodes ?? []),
          })),
        onEdgesChange: (changes) =>
          set((state) => ({
            edges: applyEdgeChanges(changes, state.edges ?? []),
          })),
        onConnect: (connection) =>
          set((state) => ({ edges: addEdge(connection, state.edges ?? []) })),
        onLayout: (direction) => {
          set((state) =>
            getLayoutedElements(state.nodes ?? [], state.edges ?? [], {
              direction,
            }),
          );
          window.requestAnimationFrame(() => {
            void fitView();
          });
        },
      } satisfies Store;
    }),
  );
  return store;
};

const PlaygroundStore = createContext<
  ReturnType<typeof useStoreDefaults> | undefined
>(undefined);

export const PlaygroundStoreProvider = (props: PropsWithChildren) => {
  const store = useStoreDefaults();
  return (
    <PlaygroundStore.Provider value={store}>
      {props.children}
    </PlaygroundStore.Provider>
  );
};

export const usePlaygroundStore = <T,>(selector: (store: Store) => T) => {
  const store = useContext(PlaygroundStore);
  if (!store) throw new Error("PlaygroundStore not found");
  return useStore(store, selector);
};
