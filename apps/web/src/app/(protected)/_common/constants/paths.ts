type ProtectedPath = "/profile" | "/feedbacks" | "/feedbacks/create";

type Path = "/" | ProtectedPath;

type ProtectedPaths<T extends ProtectedPath = ProtectedPath> = Record<
  `${T}`,
  string
>;

type Paths<T extends Path = Path> = Record<`${T}`, string>;

export const PUBLIC_ROUTES = {};

export const PROTECTED_PATHS = {
  "/profile": "Profile",
  "/feedbacks": "Feedbacks",
  "/feedbacks/create": "Feedbacks",
} as const satisfies ProtectedPaths;

export const PATHS = {
  "/": "Landing",
  ...PROTECTED_PATHS,
} as const satisfies Paths;
