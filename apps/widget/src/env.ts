import { createEnv } from "@t3-oss/env-core";
import { z } from "zod";

export const env = createEnv({
  shared: {
    NODE_ENV: z
      .enum(["development", "production", "test"])
      .default("development"),
  },
  clientPrefix: "VITE_",
  client: {
    VITE_WIDGET_URL: z.string().url(),
    VITE_WEB_URL: z.string().url(),
  },
  runtimeEnv: process.env,
  emptyStringAsUndefined: false,
});
