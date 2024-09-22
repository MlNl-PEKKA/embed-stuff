import type { TRPC_ERROR_CODE_KEY } from "@trpc/server/unstable-core-do-not-import";

export const ERRORS = {
  /**
   *  @see https://stackoverflow.com/questions/3297048/403-forbidden-vs-401-unauthorized-http-responses
   */
  FORBIDDEN: {
    code: "FORBIDDEN",
    message: "User unauthorized",
  },
  UNAUTHORIZED: {
    code: "UNAUTHORIZED",
    message: "User unauthenticated",
  },
} as const satisfies {
  [id in TRPC_ERROR_CODE_KEY]?: {
    message?: string;
    code: id;
    cause?: unknown;
  };
};
