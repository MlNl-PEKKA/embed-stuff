"use client";

import {
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { usePath } from "@/protected/hooks/usePath";

const Page = () => {
  const { name, module } = usePath();
  return (
    <>
      <BreadcrumbItem>
        <BreadcrumbLink href={module}>{name}</BreadcrumbLink>
      </BreadcrumbItem>
      <BreadcrumbSeparator />
      <BreadcrumbPage>Create</BreadcrumbPage>
    </>
  );
};

export default Page;
