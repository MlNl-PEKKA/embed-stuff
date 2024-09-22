"use server";

import { authenticate } from "./authenticate";

export async function github() {
  await authenticate("github");
}
