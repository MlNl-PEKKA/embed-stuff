import baseConfig from "@acme/eslint-config/base";
import reactConfig from "@acme/eslint-config/react";

/** @type {import('typescript-eslint').Config} */
export default [
  {
    ignores: ["dist/**", "src/hooks", "src/ui", "src/lib"],
  },
  ...baseConfig,
  ...reactConfig,
  {
    rules: {
      "@typescript-eslint/no-unsafe-assignment": "off",
    },
  },
];
