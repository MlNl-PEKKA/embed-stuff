import type { FormLayout } from "@/form/types";
import { api, HydrateClient } from "@/trpc/server";
import { connection } from "next/server";
import { Navigation } from "@/form/components/Navigation";

const Layout = async (props: FormLayout) => {
  await connection();
  const id = (await props.params).form;
  void api.protected.forms.form.read.prefetch({
    id,
  });
  return (
    <HydrateClient>
      <div className="mx-4 mt-2 flex flex-col gap-4">
        <Navigation />
        <div>{props.children}</div>
      </div>
    </HydrateClient>
  );
};

export default Layout;
