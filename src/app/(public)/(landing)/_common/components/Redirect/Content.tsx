"use client";

import Link from "next/link";
import { useSession } from "@/app/hooks/useSession";
import { Button } from "@/components/ui/button";

export const Content = () => {
  const session = useSession();
  if (session) return <GoToDashboard />;
  return <Login />;
};

export const Login = () => {
  return (
    <Link href={"/login"}>
      <Button variant="outline" className="w-full">
        Login
      </Button>
    </Link>
  );
};

const GoToDashboard = () => {
  return (
    <Link href={"/projects"}>
      <Button variant="outline" className="w-full">
        Go To Dashboard
      </Button>
    </Link>
  );
};
