import type { ProjectsLayout } from "@/projects/types";

const Layout =  (props: ProjectsLayout) => {
  return (
    <>
      {props.children}
      {props.create}
    </>
  );
};

export default Layout;
