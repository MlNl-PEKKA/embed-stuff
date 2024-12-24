import { Suspense } from "react";

import { api, HydrateClient } from "~/trpc/server";
import { Hello } from "./_components/Hello";

const Page = () => {
  void api.hello.prefetch();
  return (
    <HydrateClient>
      <Suspense fallback={<>Loading...</>}>
        <Hello />
      </Suspense>
    </HydrateClient>
  );
};

export default Page;
