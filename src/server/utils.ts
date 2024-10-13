import "server-only";
import type {
  MutationProcedure,
  QueryProcedure,
} from "@trpc/server/unstable-core-do-not-import";
import type { AppRouter } from "./api/root";
import { PERMISSIONS } from "./permissions";
import type { DB } from "./db/schema";

type Procedures = AppRouter["_def"]["procedures"];

type MembershipAccess = DB["public"]["Tables"]["user"]["Row"]["membership"][];

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Leaf = QueryProcedure<any> | MutationProcedure<any>;

export type Tree<T = Procedures> = T extends Leaf
  ? MembershipAccess
  : { [x in keyof T]: Tree<T[x]> } | MembershipAccess;

const getMembershipAccess = (
  input: string[],
  membershipAccess: Tree = PERMISSIONS,
) => {
  if (Array.isArray(membershipAccess)) return membershipAccess;
  if (input.length === 0) return null;
  const level = input[0];
  const subPermissions =
    membershipAccess[level as keyof typeof membershipAccess];
  if (!subPermissions) return null;
  input.shift();
  return getMembershipAccess(input, subPermissions as Tree);
};

export const authorize = (
  path: string,
  membership: MembershipAccess[number],
) => {
  const input = path.split(".");
  const membershipAccess = getMembershipAccess(input);
  if (!membershipAccess) return false;
  return membershipAccess.some((access) => membership === access);
};
