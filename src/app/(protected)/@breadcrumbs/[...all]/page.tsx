"use client";
import { usePath } from "@/protected/hooks/usePath";

const Page = () => {
  const { name } = usePath();
  return <>{name}</>;
};

export default Page;
