import type { NodeProps } from "@xyflow/react";
import { Handle, Position } from "@xyflow/react";

import { cn } from "@embed-stuff/ui/lib/utils";
import { Badge } from "@embed-stuff/ui/ui/badge";
import { Card, CardContent } from "@embed-stuff/ui/ui/card";

import type { Data, Type } from "./store";

type Props = NodeProps & { data: Data; type: Type };

export const Node = ({ data, isConnectable }: Props) => {
  return (
    <Card>
      <Handle
        className={cn(data.is_root && "hidden")}
        type="target"
        position={Position.Left}
        isConnectable={isConnectable}
      />
      <CardContent className="h-96 w-96">
        <Badge
          className={cn(
            "absolute right-0 top-0 m-2",
            !data.is_root && "hidden",
          )}
        >
          Start
        </Badge>
        {data.id}
      </CardContent>
      <Handle
        type="source"
        position={Position.Right}
        isConnectable={isConnectable}
      />
    </Card>
  );
};
