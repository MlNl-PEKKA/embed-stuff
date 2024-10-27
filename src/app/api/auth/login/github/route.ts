import { login } from "../utils";

export const GET = async () => await login({ provider: "github" });
