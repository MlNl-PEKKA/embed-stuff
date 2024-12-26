import { Button } from "#ui/button";

export const Feedback = (props: Parameters<typeof Button>[0]) => {
  return <Button {...props}>FEEDBACK {props.children}</Button>;
};
