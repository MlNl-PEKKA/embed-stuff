import path from "path";
import { fileURLToPath } from "url";
import react from "@vitejs/plugin-react";
import createJiti from "jiti";
import { defineConfig, loadEnv } from "vite";

import type { EMBED_STUFF } from "@embed-stuff/utils/constants";

// Import env files to validate at build time. Use jiti so we can load .ts files in here.
createJiti(fileURLToPath(import.meta.url))("./src/env");

// https://vite.dev/config/

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  return {
    define: {
      "process.env": {
        NODE_ENV: "production",
        VITE_WIDGET_URL: env.VITE_WIDGET_URL,
        VITE_WEB_URL: env.VITE_WEB_URL,
      },
    },
    plugins: [react()],
    resolve: {
      alias: {
        "~": path.resolve(__dirname, "./src"),
      },
    },
    build: {
      lib: {
        entry: "./src/app/index.wc.ts",
        name: "widget",
        fileName: (format) =>
          `${"embed-stuff" satisfies typeof EMBED_STUFF}.${format}.js`,
      },
      target: "esnext",
    },
  };
});
