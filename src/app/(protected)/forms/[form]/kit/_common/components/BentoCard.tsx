import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import type { HTMLAttributes, PropsWithChildren } from "react";

export type BentoCardProps = PropsWithChildren<HTMLAttributes<HTMLDivElement>>;

export const BentoCard = ({ className, ...props }: BentoCardProps) => {
  return (
    <Card className={cn("flex h-full w-full flex-col", className)} {...props}>
      {props.children}
    </Card>
  );
};
