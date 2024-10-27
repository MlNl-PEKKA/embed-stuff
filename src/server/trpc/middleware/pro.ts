import { TRPCError } from "@trpc/server";
import { auth } from "./auth";

export const pro = auth.unstable_pipe(async ({ next, ctx }) => {
  const {
    user: { membership },
  } = ctx;
  if (membership !== "pro")
    throw new TRPCError({ code: "FORBIDDEN", message: "Unauthorized" });

  return await next({
    ctx: {
      ...ctx,
      user: {
        ...ctx.user,
        membership,
      },
    },
  });
});