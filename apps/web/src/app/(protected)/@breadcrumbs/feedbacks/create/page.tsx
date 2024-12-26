import {
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@embed-stuff/ui/ui/breadcrumb";

const Page = () => {
  return (
    <>
      <BreadcrumbLink href="/feedbacks">Feedbacks</BreadcrumbLink>
      <BreadcrumbSeparator />
      <BreadcrumbPage>Create</BreadcrumbPage>
    </>
  );
};

export default Page;
