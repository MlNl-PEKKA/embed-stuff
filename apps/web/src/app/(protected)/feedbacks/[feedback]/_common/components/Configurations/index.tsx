import type { PropsWithChildren } from "react";

import { cn } from "@embed-stuff/ui/lib/utils";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@embed-stuff/ui/ui/tabs";

import { Project } from "./Project";
import { Widget } from "./Widget";

export const Configurations = ({
  className,
  ...props
}: Parameters<typeof Tabs>[0]) => {
  return (
    <Tabs
      className={cn(
        "flex h-full w-full flex-col items-center gap-2",
        className,
      )}
      defaultValue="project"
      {...props}
    >
      <TabsList className="flex w-full flex-row justify-evenly">
        <TabsTrigger className="w-full" value="project">
          Project
        </TabsTrigger>
        <TabsTrigger className="w-full" value="widget">
          Widget
        </TabsTrigger>
      </TabsList>
      <Content />
    </Tabs>
  );
};

const ContentWrapper = (props: PropsWithChildren<{ value: string }>) => {
  return (
    <TabsContent className="h-full w-full" {...props}>
      {props.children}
    </TabsContent>
  );
};

const Content = () => {
  return (
    <>
      <ContentWrapper value="project">
        <Project />
      </ContentWrapper>
      <ContentWrapper value="widget">
        <Widget />
      </ContentWrapper>
    </>
  );
};
