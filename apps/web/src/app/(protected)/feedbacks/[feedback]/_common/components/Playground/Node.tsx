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

import type { NodeData, Type } from "~/feedback/store";

type Props = NodeProps & { data: NodeData; type: Type };

export const Node = (props: Props) => {
  return (
    <Page {...props}>
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
    </Page>
  );
};

const Page = (props: PropsWithChildren<Props>) => {
  return (
    <Card
      variant={props.selected ? "special" : "default"}
      className={cn(
        "min-w-[480px]",
        props.selected ? "" : "hover:bg-[#101010]",
      )}
    >
      {props.children}
      <Header {...props} />
      <Content {...props} />
    </Card>
  );
};

const Header = ({ data: { meta } }: Props) => {
  if (!meta) return null;
  return (
    <CardHeader className="flex flex-col items-center">
      <CardTitle className="text-4xl">{meta.title}</CardTitle>
      <CardDescription className="text-2xl">{meta.description}</CardDescription>
    </CardHeader>
  );
};

const Content = ({ data: { feedback_question } }: Props) => {
  return (
    <CardContent>
      {feedback_question.map((question) => (
        <Question key={question.id} {...question} />
      ))}
    </CardContent>
  );
};

const Question = (_props: Props["data"]["feedback_question"][number]) => {
  return <div>Question</div>;
};

// const TextQuestion = (_props: Props["data"]["feedback_question"][number]) => {
//   return <div>Text</div>;
// };

// const SelectQuestion = (_props: Props["data"]["feedback_question"][number]) => {
//   return <div>Select</div>;
// };

// const CheckboxQuestion = (
//   _props: Props["data"]["feedback_question"][number],
// ) => {
//   return <div>Checkbox</div>;
// };

// const LevelQustion = (_props: Props["data"]["feedback_question"][number]) => {
//   return <div> Level</div>;
// };
