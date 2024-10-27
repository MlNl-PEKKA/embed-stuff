import type { Route } from "next";

type Path<T extends Route = Route> = T extends `/api/${string}`
  ? never
  : T extends `${infer R}/${string}`
    ? R extends ""
      ? T
      : never
    : never;

type Paths<T extends Path = Path> = {
  [id in `${T}`]: string;
};

export const PATHS = {
  "/": "Landing",
  "/projects": "Projects",
  "/profile": "Profile",
  "/emotes": "Emotes",
  "/error": "Error",
  "/login": "Login",
} as const satisfies Paths;
