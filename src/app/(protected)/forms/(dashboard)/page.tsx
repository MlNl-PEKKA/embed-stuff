import { Forms } from "@/forms/components/Forms";
import { api, HydrateClient } from "@/trpc/server";
import { connection } from "next/server";

const Page = async () => {
  await connection();
  void api.protected.forms.read.prefetch();
  return (
    <HydrateClient>
      <Forms />
    </HydrateClient>
  );
};

export default Page;
