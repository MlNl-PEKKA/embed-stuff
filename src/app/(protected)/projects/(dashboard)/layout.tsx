import type { ProjectsLayout } from "@/projects/types";
import { api, HydrateClient } from "@/trpc/server";
import { connection } from "next/server";

const Layout = async (props: ProjectsLayout) => {
  await connection();
  void api.protected.projects.read.prefetch();
  return (
    <HydrateClient>
      {props.children}
      <div>{props.create}</div>
    </HydrateClient>
  );
};

export default Layout;
