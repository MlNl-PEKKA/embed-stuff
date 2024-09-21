import { authenticate } from "./authenticate";

export const github = async () => await authenticate("github");
