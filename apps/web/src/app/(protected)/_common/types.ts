import type { NextProps } from "~/app/types";

export type ProtectedNextProps = NextProps<
  undefined,
  ["breadcrumbs", "actions"]
>;
