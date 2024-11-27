import { Emotes } from "@/form/kit/components/Emotes";
import { type FormLayout } from "@/form/types";
import { api, HydrateClient } from "@/trpc/server";

const Page = async (props: FormLayout) => {
  const id = (await props.params).form;
  void api.protected.forms.form.kit.emotes.prefetch({
    id,
  });
  return (
    <HydrateClient>
      <div>
        <Emotes />
      </div>
    </HydrateClient>
  );
};

export default Page;
