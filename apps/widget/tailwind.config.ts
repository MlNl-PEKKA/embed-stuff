import type { Config } from "tailwindcss";
import {
  isolateInsideOfContainer,
  scopedPreflightStyles,
} from "tailwindcss-scoped-preflight";
import { fontFamily } from "tailwindcss/defaultTheme";

import baseConfig from "@embed-stuff/tailwind-config/web";

export default {
  // We need to append the path to the UI package to the content array so that
  // those classes are included correctly.
  content: [
    ...baseConfig.content,
    "../../packages/ui/src/ui/*.{ts,tsx}",
    "../../packages/ui/src/components/*.{ts,tsx}",
  ],
  presets: [baseConfig],
  plugins: [
    ...baseConfig.plugins,
    scopedPreflightStyles({
      isolationStrategy: isolateInsideOfContainer(".widget"),
    }),
  ],
} satisfies Config;
