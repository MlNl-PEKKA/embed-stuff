import { createTRPCClient } from "@trpc/client";

import type { AppRouter } from "@embed-stuff/api";

import { options } from "./options";

export const api = createTRPCClient<AppRouter>(options);
