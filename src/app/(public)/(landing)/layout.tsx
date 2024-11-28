import type { PublicLandingLayoutProps } from "@/public/landing/types";
import { connection } from "next/server";

const Layout = async (props: PublicLandingLayoutProps) => {
  await connection();
  return (
    <div className="flex min-h-full items-center justify-center">
      {props.children}
      {props.login}
    </div>
  );
};

export default Layout;
