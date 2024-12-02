import { Skeleton } from "@/components/ui/skeleton";
import { Suspense as ReactSuspense } from "react";
import type { PropsWithChildren } from "react";
import { Content, Login } from "./Content";
import { ErrorBoundary as ReactErrorBoundary } from "react-error-boundary";

export const Redirect = () => <Content />;

const Suspense = (props: PropsWithChildren) => {
  return (
    <ReactSuspense
      fallback={<Skeleton className="h-10 w-[70px] border-[1px]" />}
    >
      {props.children}
    </ReactSuspense>
  );
};
Suspense.displayName = "Suspense";
Redirect.Suspense = Suspense;

const ErrorBoundary = (props: PropsWithChildren) => {
  return (
    <ReactErrorBoundary fallback={<Login />}>
      {props.children}
    </ReactErrorBoundary>
  );
};
ErrorBoundary.displayName = "ErrorBoundary";
Redirect.ErrorBoundary = ErrorBoundary;
