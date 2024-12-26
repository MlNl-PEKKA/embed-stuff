import type { ButtonHTMLAttributes } from "react";

import { Button } from "@embed-stuff/ui/ui/button";

type Props = Pick<ButtonHTMLAttributes<HTMLButtonElement>, "formAction"> & {
  title: string;
  icon: JSX.Element;
};

export const Provider = (props: Props) => {
  return (
    <Button variant="outline" className="w-full" formAction={props.formAction}>
      {props.icon}
      {props.title}
    </Button>
  );
};
