import baseConfig from "@embed-stuff/eslint-config/base";

/** @type {import('typescript-eslint').Config} */
export default [
  {
    ignores: ["dist/**", "src/schema/default.ts"],
  },
  ...baseConfig,
];
