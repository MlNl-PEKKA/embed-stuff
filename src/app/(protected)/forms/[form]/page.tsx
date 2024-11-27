import type { FormLayout } from "@/form/types";
import { api, HydrateClient } from "@/trpc/server";
import { connection } from "next/server";
import { Form } from "@/form/components/Form";

const Page = async (props: FormLayout) => {
  await connection();
  const id = (await props.params).form;
  void api.protected.forms.form.read.prefetch({
    id,
  });
  return (
    <HydrateClient>
      <Form />
    </HydrateClient>
  );
};

export default Page;
