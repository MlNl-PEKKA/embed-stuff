"use client";
import {
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { usePath } from "@/protected/hooks/usePath";

const Page = () => {
  const { name: module } = usePath();
  return (
    <>
      <BreadcrumbLink href="/forms">{module}</BreadcrumbLink>
      <BreadcrumbSeparator />
      <BreadcrumbPage>Create</BreadcrumbPage>
    </>
  );
};

export default Page;
