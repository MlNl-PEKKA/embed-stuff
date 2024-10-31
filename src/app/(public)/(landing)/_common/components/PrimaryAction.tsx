"use client";

import Link from "next/link";
import { useSession } from "@/app/hooks/useSession";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

const Suspense = () => {
  return <Skeleton className="h-10 w-[70px] border-[1px]" />;
};

export const PrimaryAction = () => {
  const session = useSession();
  if (session) return <GoToDashboard />;
  return <Login />;
};
PrimaryAction.Suspense = Suspense;

const Login = () => {
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
