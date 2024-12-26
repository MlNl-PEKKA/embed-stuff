import { Github as GithubIcon, Mail } from "lucide-react";

import { github, google } from "~/login/actions";
import { Body } from "./Body";
import { Provider } from "./Provider";

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
    <Provider title="Login with Google" icon={<Mail />} formAction={google} />
  );
};

const Github = () => {
  return (
    <Provider
      title="Login with Github"
      icon={<GithubIcon />}
      formAction={github}
    />
  );
};
