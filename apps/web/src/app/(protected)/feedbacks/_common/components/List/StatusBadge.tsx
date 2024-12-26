import type { VariantProps } from "class-variance-authority";
import { cva } from "class-variance-authority";

import { cn } from "@embed-stuff/ui/lib/utils";
import { Badge } from "@embed-stuff/ui/ui/badge";

import type { Read } from "~/feedbacks/types";

const statusBadgeVariant = cva("capitalize", {
  variants: {
    variant: {
      active:
        "border-transparent bg-primary text-primary-foreground hover:bg-primary/80",
      inactive:
        "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
    },
  },
  defaultVariants: {
    variant: "active",
  },
});

type StatusBadgeProps = React.HTMLAttributes<HTMLDivElement> &
  VariantProps<typeof statusBadgeVariant> & {
    feedback: Read["output"][number];
  };

export const StatusBadge = ({
  feedback,
  className,
  ...props
}: Omit<StatusBadgeProps, "variant">) => {
  const variant: StatusBadgeProps["variant"] = feedback.status;
  return (
    <Badge
      className={cn(statusBadgeVariant({ variant }), className)}
      {...props}
    >
      {feedback.status}
    </Badge>
  );
};
