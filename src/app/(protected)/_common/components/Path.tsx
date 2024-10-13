"use client";
import { cva } from "class-variance-authority";
import Link from "next/link";
import { Button } from "~/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "~/components/ui/tooltip";
import { cn } from "~/lib/utils";
import type { PATHS } from "~/protected/constants/paths";
import { usePath } from "~/protected/hooks/usePath";

const pathVariants = cva(
  "flex items-center justify-center rounded-lg size-10",
  {
    variants: {
      active: {
        true: "bg-muted",
      },
    },
    defaultVariants: {
      active: false,
    },
  },
);

type Paths = keyof typeof PATHS;

type Links<T extends Paths = Paths> = {
  link: true;
  path: T;
};

type ButtonType = {
  link: false;
  onClick: () => void;
  name: string;
};

type CommonProps = {
  logo: JSX.Element;
  className?: string;
};

type ModuleLinkProps<T extends Paths = Paths> = CommonProps & Links<T>;

type ModuleButtonProps = CommonProps & ButtonType;

type Props<T extends Paths = Paths> = CommonProps &
  (ModuleLinkProps<T> | ButtonType);

export const Path = <T extends Paths>(props: Props<T>) => {
  return (
    <Tooltip>
      {props.link ? <ModuleLink {...props} /> : <ModuleButton {...props} />}
    </Tooltip>
  );
};

const ModuleLink = <T extends Paths>({
  logo,
  className,
  path,
}: ModuleLinkProps<T>) => {
  const { module, name } = usePath();
  const active = module === path;
  return (
    <>
      <TooltipTrigger asChild>
        <Link
          href={path}
          aria-label={name}
          className={cn(pathVariants({ active, className }))}
        >
          {logo}
        </Link>
      </TooltipTrigger>
      <TooltipContent side="right" sideOffset={5}>
        {name}
      </TooltipContent>
    </>
  );
};

const ModuleButton = ({
  logo,
  className,
  name,
  onClick,
}: ModuleButtonProps) => {
  return (
    <>
      <TooltipTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className={cn(pathVariants({ className }))}
          aria-label={name}
          onClick={onClick}
        >
          {logo}
        </Button>
      </TooltipTrigger>
      <TooltipContent side="right" sideOffset={5}>
        {name}
      </TooltipContent>
    </>
  );
};
