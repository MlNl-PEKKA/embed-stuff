import { createTRPCRouter } from "~/server/trpc";
import { callback } from "./callback";
import { login } from "./login";
import { logout } from "./logout";

export const auth = createTRPCRouter({
  callback,
  login,
  logout,
});
