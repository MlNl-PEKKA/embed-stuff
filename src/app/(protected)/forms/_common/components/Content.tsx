import type { PropsWithChildren } from "react";

export const Content = (props: PropsWithChildren) => {
  return (
    <div className="m-4 flex flex-grow flex-row items-start justify-start gap-4">
      {props.children}
    </div>
  );
};
