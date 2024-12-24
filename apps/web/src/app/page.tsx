import { Suspense } from "react";

import { Button } from "@embed-stuff/ui/ui/button";

import { api, HydrateClient } from "~/trpc/server";
import { Hello } from "./_components/Hello";

export const dynamic = "force-dynamic";

const Page = () => {
  void api.hello.prefetch();
  return (
    <HydrateClient>
      <Suspense fallback={<>Loading...</>}>
        <Hello />
        <Button>CLICK</Button>
      </Suspense>
    </HydrateClient>
  );
};

export default Page;
