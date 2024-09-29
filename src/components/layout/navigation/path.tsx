"use client";
import { cva } from "class-variance-authority";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button, type ButtonProps } from "~/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "~/components/ui/tooltip";
import { cn } from "~/lib/utils";

const pathVariants = cva("rounded-lg", {
  variants: {
    active: {
      true: "bg-muted",
    },
  },
  defaultVariants: {
    active: false,
  },
});

type Props<T extends string = string> = {
  logo: JSX.Element;
  path: `/${T}`;
  name: Capitalize<T>;
} & Pick<ButtonProps, "className">;

export const Path = <T extends string>({
  className,
  logo,
  name,
  path,
}: Props<T>) => {
  const pathname = usePathname();
  const active = pathname.startsWith(path);
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Link href={path}>
          <Button
            variant="ghost"
            size="icon"
            className={cn(pathVariants({ active, className }))}
            aria-label={name}
          >
            {logo}
          </Button>
        </Link>
      </TooltipTrigger>
      <TooltipContent side="right" sideOffset={5}>
        {name}
      </TooltipContent>
    </Tooltip>
  );
};
