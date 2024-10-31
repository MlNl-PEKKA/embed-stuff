import { Badge } from "@/components/ui/badge";
import { Card as CardDev, CardContent, CardHeader } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import type { DBTable } from "@/server/db/types";

type Props = DBTable<"emote">;

export const Card = ({
  emoji = "🔥",
  name = "Fire",
  visibility = "public",
  is_pro = false,
}: Props) => {
  return (
    <CardDev className="w-full max-w-[200px] overflow-hidden">
      <CardHeader className="relative flex h-40 items-center justify-center bg-gray-100 text-6xl dark:bg-gray-800">
        {is_pro && (
          <Badge
            variant="secondary"
            className="absolute right-2 top-2 bg-yellow-500 font-bold text-black"
          >
            PRO
          </Badge>
        )}
        {emoji}
      </CardHeader>
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <h3 className="truncate text-lg font-semibold capitalize">{name}</h3>
          <Badge
            variant="outline"
            className={cn(
              "ml-2",
              visibility === "public"
                ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100"
                : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100",
            )}
          >
            {visibility === "public" ? "Public" : "Private"}
          </Badge>
        </div>
      </CardContent>
    </CardDev>
  );
};
