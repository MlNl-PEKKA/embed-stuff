import { createTRPCRouter } from "#trpc";
import { callback } from "./callback";
import { login } from "./login";
import { logout } from "./logout";

export const auth = createTRPCRouter({
  callback,
  login,
  logout,
});
