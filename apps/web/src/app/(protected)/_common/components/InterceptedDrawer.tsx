"use client";

import type { PropsWithChildren } from "react";
import { useRouter } from "next/navigation";

import { DialogTitle } from "@embed-stuff/ui/ui/dialog";
import { Drawer, DrawerContent } from "@embed-stuff/ui/ui/drawer";

export const InterceptedDrawer = (props: PropsWithChildren) => {
  const router = useRouter();
  return (
    <Drawer open onClose={() => router.back()}>
      <DrawerContent className="h-[90%]">
        <DialogTitle className="sr-only" />
        {props.children}
      </DrawerContent>
    </Drawer>
  );
};
