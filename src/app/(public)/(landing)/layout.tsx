import type { PublicLandingLayoutProps } from "@/public/landing/types";

const Layout = (props: PublicLandingLayoutProps) => {
  return (
    <div className="flex min-h-full items-center justify-center">
      {props.children}
      {props.login}
    </div>
  );
};

export default Layout;
