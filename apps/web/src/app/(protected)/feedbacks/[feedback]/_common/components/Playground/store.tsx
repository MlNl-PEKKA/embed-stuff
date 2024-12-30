/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
"use client";

import type {
  Edge as EdgeType,
  Node as NodeType,
  ReactFlowProps,
} from "@xyflow/react";
import type { PropsWithChildren } from "react";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
} from "react";
import Dagre from "@dagrejs/dagre";
import { queryOptions, useQuery, useQueryClient } from "@tanstack/react-query";
import { getQueryKey } from "@trpc/react-query";
import {
  addEdge,
  applyEdgeChanges,
  applyNodeChanges,
  useReactFlow,
} from "@xyflow/react";

import type { NonUndefined } from "@embed-stuff/utils/types";

import type { FeedbackPageEdges, FeedbackPageNodes } from "~/feedback/types";
import { useFeedback } from "~/feedback/hooks";
import { api as apiClient } from "~/trpc/client";
import { api } from "~/trpc/react";
import { Node } from "./Node";

export type Type = "node";

export type NodeData = FeedbackPageNodes["output"][number];

type EdgeData = FeedbackPageEdges["output"][number];

type Nodes = NodeType<NodeData, Type>[];

type Edges = EdgeType<EdgeData>[];

type Direction = "TB" | "LR";

type Store = ReactFlowProps<Nodes[number], Edges[number]>;

const nodeTypes = { node: Node };

const getLayoutedElements = (
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

const getNode = (page: NodeData): Nodes[number] => ({
  id: page.id,
  data: page,
  type: "node" satisfies Type,
  position: { x: 0, y: 0 },
});

const getEdge = (page: EdgeData): Edges[number] => ({
  id: `xyEdge__${page.id}-${page.next_id}`,
  data: page,
  source: page.id,
  target: page.next_id!,
});

const useNodeQueryOptions = () => {
  const { feedback } = useFeedback();
  const queryKey = useMemo(
    () =>
      getQueryKey(
        api.protected.feedbacks.feedback.page.nodes,
        { feedback_project_id: feedback },
        "query",
      ),
    [feedback],
  );
  const queryClient = useQueryClient();
  const queryCache = queryClient.getQueryData<Nodes>(queryKey) ?? [];
  return queryOptions({
    queryKey,
    staleTime: 0,
    queryFn: async (): Promise<Nodes> => {
      const data =
        await apiClient.protected.feedbacks.feedback.page.nodes.query({
          feedback_project_id: feedback,
        });
      return data.reduce((acc, node) => {
        const cachedNode = queryCache.find(
          (cachedNode) => cachedNode.id === node.id,
        );
        if (!cachedNode) {
          acc.push(getNode(node));
          return acc;
        }
        acc.push({ ...cachedNode, data: node });
        return acc;
      }, [] as Nodes);
    },
  });
};

const useEdgeQueryOptions = () => {
  const { feedback } = useFeedback();
  const queryKey = useMemo(
    () =>
      getQueryKey(
        api.protected.feedbacks.feedback.page.edges,
        { feedback_project_id: feedback },
        "query",
      ),
    [feedback],
  );
  const queryClient = useQueryClient();
  const queryCache = queryClient.getQueryData<Edges>(queryKey) ?? [];
  return queryOptions({
    queryKey,
    staleTime: 0,
    queryFn: async (): Promise<Edges> => {
      const data =
        await apiClient.protected.feedbacks.feedback.page.edges.query({
          feedback_project_id: feedback,
        });
      return data.reduce((acc, edge) => {
        const cachedEdge = queryCache.find(
          (cachedEdge) => cachedEdge.id === edge.id,
        );
        if (!cachedEdge) {
          acc.push(getEdge(edge));
          return acc;
        }
        acc.push({ ...cachedEdge, data: edge });
        return acc;
      }, [] as Edges);
    },
  });
};

export const useNodes = () => {
  const nodeQuery = useNodeQueryOptions();
  return useQuery(nodeQuery);
};

export const useEdges = () => {
  const edgeQuery = useEdgeQueryOptions();
  return useQuery(edgeQuery);
};

const useOnNodeChanges = () => {
  const queryClient = useQueryClient();
  const nodeQuery = useNodeQueryOptions();
  return useCallback<NonUndefined<Store["onNodesChange"]>>(
    (changes) => {
      queryClient.setQueryData(nodeQuery.queryKey, (queryCache) =>
        applyNodeChanges(changes, queryCache ?? []),
      );
    },
    [queryClient, nodeQuery.queryKey],
  );
};

const useOnEdgeChanges = () => {
  const queryClient = useQueryClient();
  const edgeQuery = useEdgeQueryOptions();
  return useCallback<NonUndefined<Store["onEdgesChange"]>>(
    (changes) => {
      queryClient.setQueryData(edgeQuery.queryKey, (queryCache) =>
        applyEdgeChanges(changes, queryCache ?? []),
      );
    },
    [queryClient, edgeQuery.queryKey],
  );
};

const useOnConnect = () => {
  const queryClient = useQueryClient();
  const edgeQuery = useEdgeQueryOptions();
  return useCallback<NonUndefined<Store["onConnect"]>>(
    (connection) => {
      queryClient.setQueryData(edgeQuery.queryKey, (queryCache) =>
        addEdge(connection, queryCache ?? []),
      );
    },
    [queryClient, edgeQuery.queryKey],
  );
};

const useOnLayout = () => {
  const { fitView } = useReactFlow();
  const queryClient = useQueryClient();
  const nodeQuery = useNodeQueryOptions();
  const edgeQuery = useEdgeQueryOptions();
  return useCallback<(direction: Direction) => void>(
    (direction) => {
      const nodes = queryClient.getQueryData(nodeQuery.queryKey) ?? [];
      const edges = queryClient.getQueryData(edgeQuery.queryKey) ?? [];
      const layouted = getLayoutedElements(nodes, edges, { direction });
      queryClient.setQueryData(nodeQuery.queryKey, layouted.nodes);
      queryClient.setQueryData(edgeQuery.queryKey, layouted.edges);
      window.requestAnimationFrame(() => {
        void fitView();
      });
    },
    [queryClient, nodeQuery.queryKey, edgeQuery.queryKey, fitView],
  );
};

const useStoreDefaults = (props: Props) => {
  const onNodesChange = useOnNodeChanges();
  const onEdgesChange = useOnEdgeChanges();
  const onConnect = useOnConnect();
  const store = useMemo(
    () => ({
      nodes: props.nodes,
      edges: props.edges,
      nodeTypes,
      onNodesChange,
      onEdgesChange,
      onConnect,
    }),
    [props.nodes, props.edges, onNodesChange, onEdgesChange, onConnect],
  );
  const onLayout = useOnLayout();
  useEffect(() => onLayout("LR"), []);
  return store;
};

const PlaygroundStore = createContext<
  ReturnType<typeof useStoreDefaults> | undefined
>(undefined);

type Props = {
  nodes: Nodes;
  edges: Edges;
};

export const PlaygroundStoreProvider = (props: PropsWithChildren<Props>) => {
  const store = useStoreDefaults(props);
  return (
    <PlaygroundStore.Provider value={store}>
      {props.children}
    </PlaygroundStore.Provider>
  );
};

export const usePlaygroundStore = () => {
  const store = useContext(PlaygroundStore);
  if (!store) throw new Error("PlaygroundStore not found");
  return store;
};
