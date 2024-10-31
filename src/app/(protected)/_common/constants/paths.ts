import type { Route } from "next";

type Path<T extends Route = Route> = T extends
  | `/api/${string}`
  | `${string}/(${string})${string}`
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
  "/login": "Login",
  "/projects/create": "Create Project",
} as const satisfies Paths;
