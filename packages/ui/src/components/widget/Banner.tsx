import { Button } from "#ui/button";

export const Banner = (props: Parameters<typeof Button>[0]) => {
  return <Button {...props}>BANNER {props.children}</Button>;
};
