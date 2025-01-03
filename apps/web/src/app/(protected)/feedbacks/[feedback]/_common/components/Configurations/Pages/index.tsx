/* eslint-disable @typescript-eslint/no-non-null-assertion */
"use client";

import { useQueryClient } from "@tanstack/react-query";

import { cn } from "@embed-stuff/ui/lib/utils";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
} from "@embed-stuff/ui/ui/accordion";
import { Badge } from "@embed-stuff/ui/ui/badge";

import type { Node as NodeType } from "~/feedback/store";
import { useNodeQueryOptions, usePlaygroundStore } from "~/feedback/store";
import { Questions } from "./Questions";

export const Pages = () => {
  const { nodes } = usePlaygroundStore();
  const value = nodes.find((node) => node.selected)?.id ?? "";
  return (
    <Accordion
      type="single"
      value={value}
      className="flex h-full w-full flex-col items-center justify-start gap-2"
    >
      {nodes.map((node) => (
        <Element key={node.id} {...node} />
      ))}
    </Accordion>
  );
};

const Element = ({ data }: NodeType) => {
  return (
    <AccordionItem
      className="relative w-full rounded-md border bg-card px-4"
      value={data.id}
    >
      <Trigger {...data} />
      <Questions {...data} />
    </AccordionItem>
  );
};

const Trigger = (props: NodeType["data"]) => {
  const { queryKey } = useNodeQueryOptions();
  const queryClient = useQueryClient();
  const onClick = () =>
    queryClient.setQueryData(queryKey, (nodes) => {
      return nodes!.reduce(
        (acc, curr) => {
          if (curr.id === props.id)
            acc!.push({ ...curr, selected: !curr.selected });
          else acc!.push({ ...curr, selected: false });
          return acc;
        },
        [] as typeof nodes,
      );
    });
  return (
    <AccordionTrigger className="hover:no-underline" onClick={onClick}>
      <div className="mr-2 flex w-full flex-row items-center justify-between">
        <div className="flex flex-col gap-2">
          <div className="text-xl">{props.meta.title}</div>
          <div className="text-base text-muted-foreground">
            {props.meta.description}
          </div>
        </div>
        <Badge className={cn(!props.is_root && "hidden")}>Start</Badge>
      </div>
    </AccordionTrigger>
  );
};
