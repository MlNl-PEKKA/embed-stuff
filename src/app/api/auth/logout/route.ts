import { redirect } from "next/navigation";
import { api } from "@/trpc/server";

export const GET = async () => {
  const { error } = await api.auth.logout();
  if (!error) redirect("/");
  return;
};
