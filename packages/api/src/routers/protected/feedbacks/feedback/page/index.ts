import { createTRPCRouter } from "#trpc";
import { create } from "./create";
import { read } from "./read";
import { remove } from "./remove";
import { update } from "./update";

export const page = createTRPCRouter({
  create,
  read,
  remove,
  update,
});
