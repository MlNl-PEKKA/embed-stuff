import type { PropsWithChildren } from "react";

import { cn } from "@embed-stuff/ui/lib/utils";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@embed-stuff/ui/ui/tabs";

import { Pages } from "./Pages";
import { Questionnaire } from "./Questionnaire";

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
      defaultValue="pages"
      {...props}
    >
      <TabsList className="flex w-full flex-row justify-evenly">
        <TabsTrigger className="w-full" value="pages">
          Pages
        </TabsTrigger>
        <TabsTrigger className="w-full" value="questionnaire">
          Questionnaire
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
      <ContentWrapper value="pages">
        <Pages />
      </ContentWrapper>
      <ContentWrapper value="questionnaire">
        <Questionnaire />
      </ContentWrapper>
    </>
  );
};
