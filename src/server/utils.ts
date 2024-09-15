import "server-only";
import type {
  MutationProcedure,
  QueryProcedure,
} from "@trpc/server/unstable-core-do-not-import";
import type { AppRouter } from "./api/root";
import { PERMISSIONS } from "./permissions";

type Procedures = AppRouter["_def"]["procedures"];

type Permissions = string[];

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Leaf = QueryProcedure<any> | MutationProcedure<any>;

export type Tree<T = Procedures> = T extends Leaf
  ? Permissions
  : { [x in keyof T]: Tree<T[x]> } | Permissions;

const getPermission = (input: string[], permissions: Tree = PERMISSIONS) => {
  if (input.length === 0) return null;
  if (Array.isArray(permissions)) return permissions;
  const level = input[0];
  const subPermissions = permissions[level as keyof typeof permissions];
  if (!subPermissions) return null;
  input.shift();
  return getPermission(input, subPermissions as Tree);
};

export const authorize = (path: string, permissions: Permissions) => {
  const input = path.split(".");
  const validPermissions = getPermission(input);
  if (!validPermissions) return false;
  return validPermissions.every((permission) =>
    permissions.includes(permission),
  );
};
