import { useParams, useRouter } from "next/navigation";

import { useToast } from "@embed-stuff/ui/hooks/use-toast";

import type { FeedbackNextProps } from "~/feedback/types";
import { api } from "~/trpc/react";

export const useFeedback = () => useParams<FeedbackNextProps["params"]>();

export const useFeedbackRead = () => {
  const { feedback } = useFeedback();
  return api.protected.feedbacks.feedback.read.useSuspenseQuery({
    id: feedback,
  })[0];
};

export const useFeedbackUpdate = () => {
  const { feedback } = useFeedback();
  const { toast } = useToast();
  const mutation = api.protected.feedbacks.feedback.update.useMutation({
    onSuccess: () =>
      toast({
        title: "Successfully updated project details",
      }),
    onError: ({ message }) =>
      toast({
        title: "Unable to update project details",
        description: message,
      }),
  });
  const mutate = (
    variables: Omit<Parameters<(typeof mutation)["mutate"]>[0], "id">,
  ) => mutation.mutate({ ...variables, id: feedback });
  return { ...mutation, mutate };
};

export const useFeedbackDelete = () => {
  const { feedback } = useFeedback();
  const router = useRouter();
  const { toast } = useToast();
  const mutation = api.protected.feedbacks.feedback.remove.useMutation({
    onSuccess: () => {
      toast({
        title: "Successfully deleted project",
      });
      router.push("/feedbacks");
    },
    onError: ({ message }) =>
      toast({
        title: "Unable to delete project",
        description: message,
      }),
  });
  const mutate = () => mutation.mutate({ id: feedback });
  return { ...mutation, mutate };
};

export const useFeedbackPageCreate = () => {
  const { feedback } = useFeedback();
  const { toast } = useToast();
  const mutation = api.protected.feedbacks.feedback.page.create.useMutation({
    onSuccess: () =>
      toast({
        title: "Successfully created feedback page",
      }),
    onError: ({ message }) =>
      toast({
        title: "Unable to create feedback page",
        description: message,
      }),
  });
  const mutate = (
    variables: Omit<
      Parameters<(typeof mutation)["mutate"]>[0],
      "feedback_project_id"
    >,
  ) => mutation.mutate({ ...variables, feedback_project_id: feedback });
  return { ...mutation, mutate };
};

export const useFeedbackPageRead = () => {
  const { feedback } = useFeedback();
  return api.protected.feedbacks.feedback.page.read.useSuspenseQuery({
    feedback_project_id: feedback,
  })[0];
};

export const useFeedbackPageUpdate = () => {
  const { feedback } = useFeedback();
  const { toast } = useToast();
  const mutation = api.protected.feedbacks.feedback.page.update.useMutation({
    onSuccess: () =>
      toast({
        title: "Successfully updated feedback page",
      }),
    onError: ({ message }) =>
      toast({
        title: "Unable to update feedback page",
        description: message,
      }),
  });
  const mutate = (
    variables: Omit<
      Parameters<(typeof mutation)["mutate"]>[0],
      "feedback_project_id"
    >,
  ) => mutation.mutate({ ...variables, feedback_project_id: feedback });
  return { ...mutation, mutate };
};
