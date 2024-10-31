import type { PropsWithChildren } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

type Props = {
  title: string;
  description: string;
  asChild?: boolean;
};

export const Body = ({
  asChild = false,
  children,
  ...props
}: PropsWithChildren<Props>) => {
  const content = <Content {...props}>{children}</Content>;
  if (asChild) return <>{content}</>;
  return <Card className="w-full max-w-md">{content}</Card>;
};

const Content = (
  props: PropsWithChildren<Pick<Props, "description" | "title">>,
) => {
  return (
    <>
      <CardHeader className="space-y-1">
        <CardTitle className="text-center text-2xl font-bold">
          {props.title}
        </CardTitle>
        <CardDescription className="text-center">
          {props.description}
        </CardDescription>
      </CardHeader>
      <form>
        <CardContent className="grid gap-4">{props.children}</CardContent>
      </form>
    </>
  );
};
