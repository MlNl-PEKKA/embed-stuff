import { LoginPage } from "~/components/login-page";
import { github, google } from "src/app/login/_common/actions";

export const Login = async () => {
  return <LoginPage actions={actions} />;
};

const actions: Parameters<typeof LoginPage>[0]["actions"] = [
  {
    src: "google.svg",
    alt: "Google",
    title: "Log in with Google",
    formAction: google,
  },
  {
    src: "github.svg",
    alt: "Github",
    title: "Log in with Github",
    formAction: github,
  },
];
