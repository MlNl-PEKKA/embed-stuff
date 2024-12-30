import { createTRPCRouter } from "#trpc";
import { connect } from "./connect";
import { create } from "./create";
import { disconnect } from "./disconnect";
import { edges } from "./edges";
import { nodes } from "./nodes";
import { remove } from "./remove";
import { update } from "./update";

export const page = createTRPCRouter({
  create,
  nodes,
  edges,
  remove,
  update,
  connect,
  disconnect,
});
