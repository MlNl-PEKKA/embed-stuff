"use client";

import Link from "next/link";

import { Button } from "@embed-stuff/ui/ui/button";

import { useSession } from "~/app/hooks/useSession";

export const Content = () => {
  const session = useSession();
  if (session) return <GoToDashboard />;
  return <Login />;
};

export const Login = () => {
  return (
    <Link prefetch={false} href={"/login"}>
      <Button variant="outline" className="w-full">
        Login
      </Button>
    </Link>
  );
};

const GoToDashboard = () => {
  return (
    <Link prefetch={false} href={"/feedbacks"}>
      <Button variant="outline" className="w-full">
        Go To Dashboard
      </Button>
    </Link>
  );
};
