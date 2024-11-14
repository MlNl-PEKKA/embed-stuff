"use client";

import { DialogTitle } from "@/components/ui/dialog";
import { Drawer, DrawerContent } from "@/components/ui/drawer";
import { useRouter } from "next/navigation";
import type { PropsWithChildren } from "react";

export const InterceptedDrawer = (props: PropsWithChildren) => {
  const router = useRouter();
  return (
    <Drawer open onClose={() => router.back()}>
      <DrawerContent>
        <DialogTitle className="sr-only">Create</DialogTitle>
        {props.children}
      </DrawerContent>
    </Drawer>
  );
};
