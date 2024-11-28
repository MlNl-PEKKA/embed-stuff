import { Badge } from "@/components/ui/badge";
import { Card as CardDev, CardContent, CardHeader } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import type { DBTable } from "@/server/db/types";
import type { HTMLAttributes, ReactNode } from "react";

type CardBadgeProps = Parameters<typeof Badge>[0];

const CardBadge = ({ className, ...props }: CardBadgeProps) => {
  return (
    <Badge
      className={cn(
        "pointer-events-none absolute right-2 top-2",
        props.hidden && "hidden",
        className,
      )}
      {...props}
    />
  );
};

const CardLoader = (props: HTMLAttributes<HTMLDivElement>) => {
  return (
    <div
      className={cn(
        "border-gray pointer-events-none absolute z-10 flex h-full w-full items-center justify-center overflow-hidden backdrop-blur-lg",
        props.hidden && "hidden",
      )}
    >
      {props.children}
    </div>
  );
};

type Props = DBTable<"emote"> &
  Parameters<typeof CardDev>[0] & { badge?: ReactNode; loader?: ReactNode };

export const Card = ({
  emoji = "🔥",
  name = "Fire",
  visibility = "public",
  badge = <></>,
  loader = <></>,
  className,
  ...props
}: Props) => {
  return (
    <CardDev
      className={cn("relative w-full max-w-[180px] overflow-hidden", className)}
      {...props}
    >
      {loader}
      <CardHeader className="z-0 flex h-40 items-center justify-center border-b-[1px] text-6xl">
        {badge}
        {emoji}
      </CardHeader>
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <h3 className="truncate text-lg font-semibold capitalize">{name}</h3>
          <Badge
            variant="outline"
            className={cn(
              "ml-2",
              visibility === "private"
                ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100"
                : "hidden",
            )}
          >
            {visibility === "public" ? "Public" : "Private"}
          </Badge>
        </div>
      </CardContent>
    </CardDev>
  );
};
Card.Badge = CardBadge;
Card.Loader = CardLoader;
