import { useRouter } from "next/navigation";

import { useToast } from "@embed-stuff/ui/hooks/use-toast";

import type { Read } from "~/feedbacks/types";
import { useFeedbacksStore } from "~/feedbacks/store";
import { api } from "~/trpc/react";

export const useFeedbacksRead = (): Read["output"] => {
  const title = useFeedbacksStore((store) => store.title);
  const status = useFeedbacksStore((store) => store.status);
  return api.protected.feedbacks.read.useSuspenseQuery({ title, status })[0];
};

export const useFeedbacksCreate = () => {
  const { toast } = useToast();
  const router = useRouter();
  return api.protected.feedbacks.create.useMutation({
    onSuccess: ({ id }) => {
      toast({
        title: "Successfully created feedback project",
      });
      router.push(`/feedbacks/${id}`);
    },
    onError: ({ message }) =>
      toast({
        title: "Unable to create feedback project",
        description: message,
      }),
  });
};
