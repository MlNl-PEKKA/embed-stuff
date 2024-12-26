"use client";

import type { PropsWithChildren } from "react";
import { useRouter } from "next/navigation";
import { DialogTitle } from "@radix-ui/react-dialog";

import { DialogContent, Dialog as DialogUI } from "@embed-stuff/ui/ui/dialog";

export const Dialog = (props: PropsWithChildren) => {
  const router = useRouter();
  return (
    <DialogUI open onOpenChange={() => router.back()}>
      <DialogTitle className="hidden" />
      <DialogContent>{props.children}</DialogContent>
    </DialogUI>
  );
};
