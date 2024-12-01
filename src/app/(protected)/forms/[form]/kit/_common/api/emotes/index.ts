import { createTRPCRouter } from "@/server/trpc";
import { insert } from "./insert";
import { options } from "./options";
import { read } from "./read";
import { remove } from "./remove";

export const emotes = createTRPCRouter({
  insert,
  options,
  read,
  remove,
});
