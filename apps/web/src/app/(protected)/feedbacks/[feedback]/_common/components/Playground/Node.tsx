import type { NodeProps } from "@xyflow/react";
import type { PropsWithChildren } from "react";
import { Handle, Position } from "@xyflow/react";

import { cn } from "@embed-stuff/ui/lib/utils";
import { Badge } from "@embed-stuff/ui/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@embed-stuff/ui/ui/card";

import type { NodeData, Type } from "./store";

export const Node = ({
  data,
  isConnectable,
}: NodeProps & { data: NodeData; type: Type }) => {
  return (
    <Page {...data}>
      <Handle
        className={cn(data.is_root && "hidden")}
        type="target"
        position={Position.Left}
        isConnectable={isConnectable}
      />
      <Handle
        type="source"
        position={Position.Right}
        isConnectable={isConnectable}
      />
      <Badge
        className={cn("absolute right-0 top-0 m-2", !data.is_root && "hidden")}
      >
        Start
      </Badge>
    </Page>
  );
};

type Props = PropsWithChildren<NodeData>;

const Page = (props: Props) => {
  return (
    <Card>
      <Header {...props} />
      {props.children}
      <CardContent>{props.id}</CardContent>
    </Card>
  );
};

const Header = ({ meta }: Props) => {
  if (!meta) return null;
  return (
    <CardHeader className="border-b">
      <CardTitle className="text-2xl">{meta.title}</CardTitle>
      <CardDescription className="text-xl">{meta.description}</CardDescription>
    </CardHeader>
  );
};
