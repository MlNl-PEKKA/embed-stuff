import { createTRPCRouter } from "@/server/trpc";
import { auth } from "./auth";
import { protectedAPI } from "@/protected/api";
import { session } from "./session";

export const app = createTRPCRouter({
  auth,
  protected: protectedAPI,
  session,
});
