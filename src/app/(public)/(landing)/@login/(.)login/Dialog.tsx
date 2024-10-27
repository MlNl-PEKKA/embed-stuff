"use client";

import { useRouter } from "next/navigation";
import { PropsWithChildren } from "react";
import { DialogContent, Dialog as DialogUI } from "~/components/ui/dialog";

export const Dialog = (props: PropsWithChildren) => {
  const router = useRouter();
  return (
    <DialogUI open onOpenChange={() => router.back()}>
      <DialogContent>{props.children}</DialogContent>
    </DialogUI>
  );
};
