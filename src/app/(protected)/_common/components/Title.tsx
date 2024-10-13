"use client";

import { usePath } from "~/protected/hooks/usePath";

export const Title = () => {
  const { name } = usePath();
  return <h1 className="text-xl font-semibold">{name}</h1>;
};
