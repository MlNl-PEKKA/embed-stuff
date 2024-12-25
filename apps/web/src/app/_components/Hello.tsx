"use client";

import { Button } from "@embed-stuff/ui/ui/button";

import { api } from "~/trpc/react";

export const Hello = () => {
  const hello = api.hello.useSuspenseQuery()[0];
  return (
    <>
      <Button>XO</Button>
      {hello}
    </>
  );
};
