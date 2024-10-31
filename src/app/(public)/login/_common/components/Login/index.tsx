import { github, google } from "@/login/actions";
import { Provider } from "./Provider";
import { Body } from "./Body";

type Props = Pick<Parameters<typeof Body>[0], "asChild">;

export const Login = (props: Props) => {
  return (
    <Body
      title="Login"
      description="Choose your preferred login method"
      {...props}
    >
      <Google />
      <Github />
    </Body>
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
