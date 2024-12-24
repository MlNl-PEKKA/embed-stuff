"use client";

import { api } from "~/trpc/react";

export const Hello = () => {
  const hello = api.hello.useSuspenseQuery()[0];
  return <>{hello}</>;
};
