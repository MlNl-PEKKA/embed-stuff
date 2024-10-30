"use client";

import { DialogTitle } from "@radix-ui/react-dialog";
import { useRouter } from "next/navigation";
import type { PropsWithChildren } from "react";
import { DialogContent, Dialog as DialogUI } from "@/components/ui/dialog";

export const Dialog = (props: PropsWithChildren) => {
  const router = useRouter();
  return (
    <DialogUI open onOpenChange={() => router.back()}>
      <DialogTitle className="hidden" />
      <DialogContent>{props.children}</DialogContent>
    </DialogUI>
  );
};
