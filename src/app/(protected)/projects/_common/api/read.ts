import { type ProtectedProcedure, protectedProcedure } from "@/server/trpc";
import { TRPCError } from "@trpc/server";

const query = async ({ ctx }: ProtectedProcedure) => {
  const projects = (
    await ctx.db
      .from("project")
      .select()
      .eq("user_id", ctx.user.id)
      .throwOnError()
  ).data;
  if (!projects)
    throw new TRPCError({ code: "NOT_FOUND", message: "Projects not found" });
  return projects;
};

export const read = protectedProcedure.query(query);
