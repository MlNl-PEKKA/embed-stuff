import { Projects } from "@/projects/components/Projects";
import { api, HydrateClient } from "@/trpc/server";
import { connection } from "next/server";

const Page = async() => {
  await connection();
  void api.protected.projects.read.prefetch();
  return <HydrateClient><Projects /></HydrateClient>;
};

export default Page;
