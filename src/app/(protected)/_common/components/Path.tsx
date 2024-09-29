"use client";
import { cva } from "class-variance-authority";
import Link from "next/link";
import { Button, type ButtonProps } from "~/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "~/components/ui/tooltip";
import { cn } from "~/lib/utils";
import type { PATHS } from "../constants";
import { usePath } from "../hooks";

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

type PathsType = keyof typeof PATHS;

type LinkType<T extends PathsType = PathsType> = {
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
} & Pick<ButtonProps, "className">;

type ModuleLinkProps<T extends PathsType = PathsType> = CommonProps &
  LinkType<T>;

type ModuleButtonProps = CommonProps & ButtonType;

type Props<T extends PathsType = PathsType> = CommonProps &
  (ModuleLinkProps<T> | ButtonType);

export const Path = <T extends PathsType>(props: Props<T>) => {
  return (
    <Tooltip>
      {props.link ? <ModuleLink {...props} /> : <ModuleButton {...props} />}
    </Tooltip>
  );
};

const ModuleLink = <T extends PathsType>({
  logo,
  className,
  path,
}: ModuleLinkProps<T>) => {
  const { module, name } = usePath();
  const active = module === path;
  return (
    <>
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
