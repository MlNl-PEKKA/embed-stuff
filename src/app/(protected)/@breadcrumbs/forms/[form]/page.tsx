"use client";
import {
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { useForm } from "@/form/hooks/useForm";
import { usePath } from "@/protected/hooks/usePath";

const Page = () => {
  const { name: module } = usePath();
  const { name } = useForm();
  return (
    <>
      <BreadcrumbLink href="/forms">{module}</BreadcrumbLink>
      <BreadcrumbSeparator />
      <BreadcrumbPage>{name}</BreadcrumbPage>
    </>
  );
};

export default Page;
