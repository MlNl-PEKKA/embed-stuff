import { login } from "../utils";

export const POST = async () => await login({ provider: "google" });
