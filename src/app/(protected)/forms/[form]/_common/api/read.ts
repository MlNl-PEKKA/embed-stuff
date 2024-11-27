import { TRPCError } from "@trpc/server";
import { formProcedure, type FormProcedure } from "@/form/utils/formProcedure";

const query = async ({ ctx }: FormProcedure) => {
  const projects = (
    await ctx.db
      .from("form")
      .select()
      .eq("user_id", ctx.user.id)
      .eq("id", ctx.form)
      .single()
      .throwOnError()
  ).data;
  if (!projects)
    throw new TRPCError({ code: "NOT_FOUND", message: "Form not found" });
  return projects;
};

export const read = formProcedure.query(query);
