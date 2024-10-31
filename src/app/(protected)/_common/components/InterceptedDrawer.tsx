"use client";

import { Drawer } from "@/components/ui/drawer";
import { useRouter } from "next/navigation";
import type { PropsWithChildren } from "react";

export const InterceptedDrawer = (props: PropsWithChildren) => {
  const router = useRouter();
  return <Drawer onClose={() => router.back()}>{props.children}</Drawer>;
};
