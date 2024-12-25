import baseConfig from "@embed-stuff/eslint-config/base";

/** @type {import('typescript-eslint').Config} */
export default [
  {
    ignores: ["dist/**"],
  },
  ...baseConfig,
  {
    ignores: ["src/dbValidators"],
    rules: {
      "@typescript-eslint/consistent-type-imports": "off",
    },
  },
];
