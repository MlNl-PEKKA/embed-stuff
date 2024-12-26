import type { ButtonHTMLAttributes } from "react";
import Image from "next/image";

import { Button } from "@embed-stuff/ui/ui/button";

type Props = Pick<ButtonHTMLAttributes<HTMLButtonElement>, "formAction"> &
  Pick<Parameters<typeof Image>[0], "src" | "alt"> & { title: string };

export const Provider = (props: Props) => {
  return (
    <Button variant="outline" className="w-full" formAction={props.formAction}>
      <Image
        src={props.src}
        className="mr-2"
        alt={props.alt}
        width={16}
        height={16}
      />
      {props.title}
    </Button>
  );
};
