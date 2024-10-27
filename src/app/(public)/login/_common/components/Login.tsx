import { LoginPage } from "~/components/login-page";
import { github, google } from "~/login/actions";
import { Provider } from "./Provider";

export const Login = async () => {
  return (
    <LoginPage>
      <Google />
      <Github />
    </LoginPage>
  );
};

const Google = () => {
  return (
    <Provider
      src={"google.svg"}
      alt={"Google"}
      title={"Log in with Google"}
      formAction={google}
    />
  );
};

const Github = () => {
  return (
    <Provider
      src={"github.svg"}
      alt={"Github"}
      title={"Log in with Github"}
      formAction={github}
    />
  );
};
