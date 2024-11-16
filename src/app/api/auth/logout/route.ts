import { redirect } from "next/navigation";
import { api } from "@/trpc/server";
import { connection } from "next/server";

export const GET = async () => {
  await connection();
  const { error } = await api.auth.logout();
  if (!error) redirect("/");
  return;
};
