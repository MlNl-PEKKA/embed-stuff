import { Emotes } from "@/emotes/components/Emotes";
import { api, HydrateClient } from "@/trpc/server";
import { connection } from "next/server";

const Page = async () => {
  await connection();
  void api.protected.emotes.read.prefetch();
  return (
    <HydrateClient>
      <Emotes />
    </HydrateClient>
  );
};

export default Page;
