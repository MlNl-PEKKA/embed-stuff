import baseConfig, { restrictEnvAccess } from "@embed-stuff/eslint-config/base";
import nextjsConfig from "@embed-stuff/eslint-config/nextjs";
import reactConfig from "@embed-stuff/eslint-config/react";

/** @type {import('typescript-eslint').Config} */
export default [
  {
    ignores: ["dist/**"],
  },
  ...baseConfig,
  ...reactConfig,
  ...nextjsConfig,
  ...restrictEnvAccess,
];
