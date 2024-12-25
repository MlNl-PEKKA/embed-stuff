import type { TRPCContext } from "@embed-stuff/utils/types";
import { createPublicClient } from "@embed-stuff/db/client";

import { t } from "#init";

export const createTRPCContext = (opts: TRPCContext) => {
  const adminDb = createPublicClient();
  return {
    ...opts,
    adminDb,
  };
};

export const createCallerFactory = t.createCallerFactory;

export const createTRPCRouter = t.router;
