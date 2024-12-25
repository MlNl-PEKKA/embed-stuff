import { redirect } from "next/navigation";
import { connection } from "next/server";

import { api } from "~/trpc/server";

export const GET = async () => {
  await connection();
  const { error } = await api.auth.logout();
  if (!error) redirect("/");
  return;
};
