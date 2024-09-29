type PathsType<T extends string = string> = {
  [id in `/${T}`]: string;
};

export const PATHS: PathsType = {
  "/emotes": "Emotes",
  "/kits": "Kits",
  "/projects": "Projects",
  "/profile": "Profile",
} as const;
