"use client";

import { SidebarMenuButton } from "@/components/ui/sidebar";
import { PATHS } from "@/protected/constants/paths";
import { usePath } from "@/protected/hooks/usePath";
import Link from "next/link";

type Paths = keyof typeof PATHS;

type Links<T extends Paths = Paths> = {
  type: "link";
  path: T;
};

type ButtonType = {
  type: "button";
  onClick: () => void;
  name: string;
};

type CommonProps = {
  logo: JSX.Element;
  tooltip?: boolean;
};

type ModuleLinkProps<T extends Paths = Paths> = CommonProps & Links<T>;

type ModuleButtonProps = CommonProps & ButtonType;

type Props<T extends Paths = Paths> = CommonProps &
  (ModuleLinkProps<T> | ButtonType);

export const Path = <T extends Paths>({
  tooltip = true,
  ...props
}: Props<T>) => {
  switch (props.type) {
    case "link":
      return <ModuleLink {...props} tooltip={tooltip} />;
    default:
      return <ModuleButton {...props} tooltip={tooltip} />;
  }
};

const ModuleLink = <T extends Paths>({
  logo,
  path,
  tooltip,
}: ModuleLinkProps<T>) => {
  const name = PATHS[path];
  const { module } = usePath();
  const active = module === path;
  return (
    <SidebarMenuButton
      isActive={active}
      asChild
      tooltip={{
        children: name,
        hidden: !tooltip,
      }}
    >
      <Link prefetch={false} href={path} aria-label={name}>
        {logo}
      </Link>
    </SidebarMenuButton>
  );
};

const ModuleButton = ({ logo, name, tooltip, onClick }: ModuleButtonProps) => {
  return (
    <SidebarMenuButton
      onClick={onClick}
      tooltip={{
        children: name,
        hidden: !tooltip,
      }}
    >
      {logo}
    </SidebarMenuButton>
  );
};
