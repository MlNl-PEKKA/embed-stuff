"use client";

import { usePath } from "~/protected/hooks/usePath";

const Default = () => {
  const { name } = usePath();
  return <h1 className="text-xl font-semibold">{name}</h1>;
};

export default Default;
