/* eslint-disable @typescript-eslint/no-non-null-assertion */
import type { NodeProps } from "@xyflow/react";
import type { PropsWithChildren } from "react";
import { Handle, Position } from "@xyflow/react";
import { InPortal, OutPortal } from "react-reverse-portal";

import { cn } from "@embed-stuff/ui/lib/utils";
import { Badge } from "@embed-stuff/ui/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@embed-stuff/ui/ui/card";

import type { DataProps } from "./provider";
import type { NodeData } from "~/feedback/store";
import { usePlaygroundStore } from "~/feedback/store";
import { CardProvider, useCard } from "./provider";

type InPortalProps = DataProps & {
  card: Parameters<typeof Card>[0];
  id: string;
};

export const NodeInPortal = (props: PropsWithChildren<InPortalProps>) => {
  const { portalNodes } = usePlaygroundStore();
  const portalNode = portalNodes.get(props.id)!;
  return (
    <InPortal node={portalNode}>
      <Node {...props}>{props.children}</Node>
    </InPortal>
  );
};

const Node = (props: PropsWithChildren<InPortalProps>) => (
  <CardProvider data={props.data}>
    <Card {...props.card}>
      <Header />
      <Body />
      {props.children}
    </Card>
  </CardProvider>
);

const Header = () => {
  const data = useCard();
  return (
    <CardHeader className="flex flex-col items-center justify-evenly">
      <CardTitle className="text-2xl">{data.title}</CardTitle>
      <CardDescription className="text-xl">{data.description}</CardDescription>
    </CardHeader>
  );
};

const Body = () => (
  <CardContent className="flex flex-col items-center">
    <TypeOption />
  </CardContent>
);

const TypeOption = () => {
  const { type } = useCard();
  switch (type) {
    case "select":
      return <>Select</>;
    case "checkbox":
      return <>Checkbox</>;
    case "level":
      return <>Level</>;
    default:
      return null;
  }
};

type OutPortalProps = NodeProps & { data: NodeData };

export const NodeOutPortal = (props: OutPortalProps) => {
  const { portalNodes } = usePlaygroundStore();
  const portalNode = portalNodes.get(props.id)!;
  return (
    <>
      <OutPortal node={portalNode} />
      <Meta {...props} />
    </>
  );
};

const Meta = (props: OutPortalProps) => (
  <>
    <Handle
      className={cn(props.data.is_root && "hidden")}
      type="target"
      position={Position.Left}
      isConnectable={props.isConnectable}
    />
    <Handle
      type="source"
      position={Position.Right}
      isConnectable={props.isConnectable}
    />
    <Badge
      className={cn(
        "absolute right-0 top-0 m-2",
        !props.data.is_root && "hidden",
      )}
    >
      Start
    </Badge>
  </>
);
