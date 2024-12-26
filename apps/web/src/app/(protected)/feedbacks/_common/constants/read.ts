import type { Store } from "../store";

export const READ: Pick<Store, "title" | "status"> = {
  status: [],
  title: "",
};
