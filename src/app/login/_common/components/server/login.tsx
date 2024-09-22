import { LoginPage } from "~/components/login-page";
import { github, google } from "~/login/actions";
import { validate } from "~/login/utils/server/validate";

export const Login = async () => {
  await validate();
  return <LoginPage actions={actions} />;
};

const actions: Parameters<typeof LoginPage>[0]["actions"] = [
  {
    src: "google.svg",
    alt: "Google",
    title: "Sign in with Google",
    formAction: void google,
  },
  {
    src: "github.svg",
    alt: "Github",
    title: "Sign in with Github",
    formAction: void github,
  },
];
