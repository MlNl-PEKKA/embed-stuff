"use client";

import { Button } from "@embed-stuff/ui/ui/button";

import { useFeedbacksStore } from "~/feedbacks/store";

export const Cancel = () => {
  const { reset } = useFeedbacksStore((store) => store.actions);
  const cancellable = useFeedbacksStore((store) => store.cancellable());
  if (!cancellable) return <></>;
  return (
    <Button variant="ghost" onClick={() => reset()}>
      Cancel
    </Button>
  );
};
