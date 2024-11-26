type Path = "/" | "/profile" | "/emotes" | "/forms" | "/forms/create";

type Paths<T extends Path = Path> = {
  [id in `${T}`]: string;
};

export const PATHS = {
  "/": "Landing",
  "/forms": "Forms",
  "/profile": "Profile",
  "/emotes": "Emotes",
  "/forms/create": "Create Form",
} as const satisfies Paths;
