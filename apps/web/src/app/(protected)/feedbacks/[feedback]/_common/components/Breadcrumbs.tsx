"use client";

import {
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@embed-stuff/ui/ui/breadcrumb";

import { useFeedbackRead } from "~/feedback/hooks";

export const Breadcrumbs = () => {
  const { title } = useFeedbackRead();
  return (
    <>
      <BreadcrumbLink href="/feedbacks">Feedbacks</BreadcrumbLink>
      <BreadcrumbSeparator />
      <BreadcrumbPage className="capitalize">{title}</BreadcrumbPage>
    </>
  );
};
