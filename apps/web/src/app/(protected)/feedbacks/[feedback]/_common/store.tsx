/* eslint-disable @typescript-eslint/no-non-null-assertion */
"use client";

import type {
  Edge as EdgeType,
  Node as NodeType,
  ReactFlowProps,
} from "@xyflow/react";
import type { Component, PropsWithChildren } from "react";
import type { HtmlPortalNode } from "react-reverse-portal";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
} from "react";
import Dagre from "@dagrejs/dagre";
import {
  queryOptions,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { getMutationKey, getQueryKey } from "@trpc/react-query";
import {
  addEdge,
  applyEdgeChanges,
  applyNodeChanges,
  useReactFlow,
} from "@xyflow/react";
import { createHtmlPortalNode } from "react-reverse-portal";

import type { NonUndefined, Require } from "@embed-stuff/utils/types";
import { useToast } from "@embed-stuff/ui/hooks/use-toast";

import type { FeedbackPageEdges, FeedbackPageNodes } from "~/feedback/types";
import { NodeOutPortal } from "~/feedback/components/Node";
import { useFeedback } from "~/feedback/hooks";
import { api as apiClient } from "~/trpc/client";
import { api } from "~/trpc/react";

export type Type = "node";

export type NodeData = FeedbackPageNodes["output"][number];

export type EdgeData = FeedbackPageEdges["output"][number];

export type Node = NodeType<NodeData, Type>;

export type Edge = EdgeType<EdgeData>;

type Nodes = Node[];

type Edges = Edge[];

type Direction = "TB" | "LR";

type Store = Require<
  ReactFlowProps<Nodes[number], Edges[number]>,
  "nodes" | "edges"
> & { portalNodes: Map<string, HtmlPortalNode<Component<unknown>>> };

const nodeTypes = { node: NodeOutPortal };

const getLayoutedElements = (
  nodes: Nodes,
  edges: Edges,
  options: { direction: Direction },
) => {
  const width = 480;
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
  id: `xy-edge__${page.id}-${page.next_id}`,
  data: page,
  source: page.id,
  target: page.next_id!,
});

export const useNodeQueryOptions = () => {
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
    staleTime: 30_000,
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

export const useEdgeQueryOptions = () => {
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
    staleTime: 30_000,
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

const useNodesRemove = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const nodesQuery = useNodeQueryOptions();
  const mutationKey = getMutationKey(
    api.protected.feedbacks.feedback.page.remove,
  );
  const mutation = useMutation({
    mutationKey,
    mutationFn: async ({ nodes }: { nodes: Nodes; prevNodes: Nodes }) => {
      const ids = nodes.map((node) => node.id);
      await apiClient.protected.feedbacks.feedback.page.remove.mutate({ ids });
    },
    onMutate: ({ nodes, prevNodes }) => {
      const newNodes = prevNodes.filter(
        (prevNode) => !nodes.some((node) => node.id === prevNode.id),
      );
      queryClient.setQueryData(nodesQuery.queryKey, newNodes);
    },
    onError: (error, { prevNodes }) => {
      queryClient.setQueryData(nodesQuery.queryKey, prevNodes);
      toast({
        title: "Failed to remove page",
        description: error.message,
      });
    },
  });
  return mutation;
};

const useOnNodeChanges = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const nodeQuery = useNodeQueryOptions();
  const nodesRemove = useNodesRemove();
  return useCallback<NonUndefined<Store["onNodesChange"]>>(
    (changes) => {
      const prevNodes = queryClient.getQueryData(nodeQuery.queryKey)!;
      const removeNodes = changes.filter((change) => change.type === "remove");
      if (removeNodes.length) {
        const nodes = prevNodes.filter(
          (prevNode) =>
            !prevNode.data.is_root &&
            removeNodes.some((removeNode) => removeNode.id === prevNode.id),
        );
        if (nodes.length) nodesRemove.mutate({ nodes, prevNodes });
        else toast({ title: "Root page cannot be removed" });
        return;
      }
      queryClient.setQueryData(
        nodeQuery.queryKey,
        applyNodeChanges(changes, prevNodes),
      );
    },
    [queryClient, nodeQuery.queryKey, nodesRemove, toast],
  );
};

const useEdgesRemove = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const edgesQuery = useEdgeQueryOptions();
  const mutationKey = getMutationKey(
    api.protected.feedbacks.feedback.page.disconnect,
  );
  const mutation = useMutation({
    mutationKey,
    mutationFn: async ({ edges }: { edges: Edges; prevEdges: Edges }) => {
      const ids = edges.map((edge) => edge.source);
      await apiClient.protected.feedbacks.feedback.page.disconnect.mutate({
        ids,
      });
    },
    onMutate: ({ edges, prevEdges }) => {
      const newEdges = prevEdges.filter(
        (prevEdge) => !edges.some((edge) => edge.source === prevEdge.source),
      );
      queryClient.setQueryData(edgesQuery.queryKey, newEdges);
    },
    onError: (error, { prevEdges }) => {
      queryClient.setQueryData(edgesQuery.queryKey, prevEdges);
      toast({
        title: "Failed to remove page",
        description: error.message,
      });
    },
  });
  return mutation;
};

const useOnEdgeChanges = () => {
  const queryClient = useQueryClient();
  const edgeQuery = useEdgeQueryOptions();
  const edgesRemove = useEdgesRemove();
  return useCallback<NonUndefined<Store["onEdgesChange"]>>(
    (changes) => {
      const prevEdges = queryClient.getQueryData(edgeQuery.queryKey)!;
      const removeEdges = changes.filter((change) => change.type === "remove");
      if (removeEdges.length) {
        const edges = prevEdges.filter((prevEdge) =>
          removeEdges.some((removeEdge) => removeEdge.id === prevEdge.id),
        );
        edgesRemove.mutate({ edges, prevEdges });
        return;
      }
      queryClient.setQueryData(
        edgeQuery.queryKey,
        applyEdgeChanges(changes, prevEdges),
      );
    },
    [queryClient, edgeQuery.queryKey, edgesRemove],
  );
};

const useOnConnect = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const edgeQuery = useEdgeQueryOptions();
  const mutationKey = getMutationKey(
    api.protected.feedbacks.feedback.page.connect,
  );
  const mutation = useMutation({
    mutationKey,
    mutationFn: (async (connection) =>
      await apiClient.protected.feedbacks.feedback.page.connect.mutate({
        id: connection.source,
        next_id: connection.target,
      })) satisfies NonUndefined<Store["onConnect"]>,
    onMutate: (connection) => {
      const prev = structuredClone(
        queryClient.getQueryData(edgeQuery.queryKey)!,
      );
      queryClient.setQueryData(edgeQuery.queryKey, (queryCache) =>
        addEdge(connection, queryCache ?? []),
      );
      return { prev };
    },
    onError: (error, _, context) => {
      queryClient.setQueryData(edgeQuery.queryKey, context?.prev);
      toast({
        title: "Failed to connect page",
        description: error.message,
      });
    },
  });
  return mutation;
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
  const store: Store = useMemo(
    () => ({
      nodes: props.nodes,
      edges: props.edges,
      nodeTypes,
      isValidConnection: (connection) => {
        if (
          props.edges.some(
            (edge) =>
              edge.source === connection.source ||
              edge.target === connection.target,
          )
        )
          return false;
        return true;
      },
      onNodesChange,
      onEdgesChange,
      onConnect: onConnect.mutate,
      portalNodes: new Map(
        props.nodes.map(({ id }) => [id, createHtmlPortalNode()]),
      ),
    }),
    [props.nodes, props.edges, onNodesChange, onEdgesChange, onConnect.mutate],
  );
  const onLayout = useOnLayout();
  useEffect(() => onLayout("LR"), [onLayout]);
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
