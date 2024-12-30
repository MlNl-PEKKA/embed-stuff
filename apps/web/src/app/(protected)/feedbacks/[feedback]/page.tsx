import { cn } from "@embed-stuff/ui/lib/utils";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@embed-stuff/ui/ui/resizable";

import { Code } from "~/feedback/components/Code";
import { Configurations } from "~/feedback/components/Configurations";
import { Playground } from "~/feedback/components/Playground";

const Page = () => {
  return (
    <ResizablePanelGroup
      direction="horizontal"
      className="h-full w-full text-card-foreground"
    >
      <Card className="border-none" defaultSize={75}>
        <Playground />
      </Card>
      <Handle />
      <Card className="border-none" defaultSize={25}>
        <ResizablePanelGroup direction="vertical">
          <Card defaultSize={67.7}>
            <Configurations />
          </Card>
          <Handle />
          <Card defaultSize={32.3}>
            <Code />
          </Card>
        </ResizablePanelGroup>
      </Card>
    </ResizablePanelGroup>
  );
};

export default Page;

const Card = ({
  children,
  className,
  ...props
}: Parameters<typeof ResizablePanel>[0]) => {
  return (
    <ResizablePanel
      className={cn("h-full w-full rounded-lg border shadow-sm", className)}
      {...props}
    >
      {children}
    </ResizablePanel>
  );
};

const Handle = ({
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
