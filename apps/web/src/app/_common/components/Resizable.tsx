import { cn } from "@embed-stuff/ui/lib/utils";
import { ResizableHandle, ResizablePanel } from "@embed-stuff/ui/ui/resizable";

export const Card = ({
  children,
  className,
  ...props
}: Parameters<typeof ResizablePanel>[0]) => {
  return (
    <ResizablePanel
      className={cn("rounded-lg border shadow-sm", className)}
      {...props}
    >
      {children}
    </ResizablePanel>
  );
};

export const Handle = ({
  className,
  ...props
}: Parameters<typeof ResizableHandle>[0]) => {
  return (
    <ResizableHandle
      className={cn("bg-background p-2", className)}
      {...props}
    />
  );
};
