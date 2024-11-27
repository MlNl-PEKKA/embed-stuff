"use client";

import { badgeVariants } from "@/components/ui/badge";
import Link from "next/link";
import { useFormParams } from "@/form/hooks/useFormParams";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";

export const Navigation = () => {
  return (
    <nav className="flex gap-2">
      <Badge>Overview</Badge>
      <Badge href={"/emotes"}>Emotes</Badge>
      <Badge href={"/settings"}>Settings</Badge>
    </nav>
  );
};

type BadgeProps = Omit<Parameters<typeof Link>[0], "href"> & {
  href?: "" | "/settings" | "/emotes";
};

const Badge = ({ href = "", ...props }: BadgeProps) => {
  const { form } = useFormParams();
  const pathname = usePathname();
  const safeHref = `/forms/${form}${href}`.trim();
  const variant = pathname === safeHref ? "default" : "outline";
  return (
    <Link
      className={cn(badgeVariants({ variant }), "px-4 py-2")}
      {...props}
      href={safeHref}
    />
  );
};
