import type { ProjectsLayout } from "@/forms/types";

const Layout = (props: ProjectsLayout) => {
  return (
    <>
      {props.children}
      {props.create}
    </>
  );
};

export default Layout;
