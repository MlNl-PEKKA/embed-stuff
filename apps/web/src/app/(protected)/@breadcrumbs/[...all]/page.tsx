"use client";

import { BreadcrumbPage } from "@embed-stuff/ui/ui/breadcrumb";

import { usePath } from "~/protected/hooks/usePath";

const Page = () => {
  const { name } = usePath();
  return <BreadcrumbPage>{name}</BreadcrumbPage>;
};

export default Page;
