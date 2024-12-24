import baseConfig from "@embed-stuff/eslint-config/base";
import reactConfig from "@embed-stuff/eslint-config/react";

/** @type {import('typescript-eslint').Config} */
export default [
  {
    ignores: ["dist/**"],
  },
  ...baseConfig,
  ...reactConfig,
];
