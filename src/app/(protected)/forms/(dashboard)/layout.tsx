import type { FormsLayout } from "@/forms/types";

const Layout = (props: FormsLayout) => {
  return (
    <>
      {props.children}
      {props.create}
    </>
  );
};

export default Layout;
