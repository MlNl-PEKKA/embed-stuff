import { redirect } from "next/navigation";
import { createClient } from "~/server/db";

export const validate = async () => {
  const supabase = createClient();
  const { data, error } = await supabase.auth.getSession();
  if (error) redirect("/error");
  if (data.session) redirect(`/`);
};
