import { LoginPage } from "~/components/login-page";
import { validate } from "~/login/utils/server/validate";

export const Login = async () => {
  await validate();
  return <LoginPage />;
};
