import { baseProcedure } from "#procedures/baseProcedure";
import { createTRPCRouter } from "#trpc";
import { auth } from "./auth";
import { protectedAPI } from "./protected";
import { session } from "./session";
import { widget } from "./widget";

export const app = createTRPCRouter({
  auth,
  protected: protectedAPI,
  session,
  widget,
  hello: baseProcedure.query(() => "Hello "),
});
