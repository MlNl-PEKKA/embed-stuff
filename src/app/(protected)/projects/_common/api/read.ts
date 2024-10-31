import { TRPCError } from "@trpc/server";
import { type ProtectedProcedure, protectedProcedure } from "@/server/trpc";
import { createProtectedClient } from "@/db/client";

const query = async ({ ctx }: ProtectedProcedure) => {
  const db = await createProtectedClient();
  const projects = (
    await db.from("project").select().eq("user_id", ctx.user.id).throwOnError()
  ).data;
  if (!projects)
    throw new TRPCError({ code: "NOT_FOUND", message: "Projects not found" });
  return projects;
};

export const read = protectedProcedure.query(query);
