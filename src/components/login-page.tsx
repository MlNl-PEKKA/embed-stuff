import Link from "next/link";
import type { PropsWithChildren } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";

export function LoginPage(props: PropsWithChildren) {
  return (
    <Card className="w-full max-w-md">
      <CardHeader className="space-y-1">
        <CardTitle className="text-center text-2xl font-bold">
          Sign in
        </CardTitle>
        <CardDescription className="text-center">
          Choose your preferred sign in method
        </CardDescription>
      </CardHeader>
      <form>
        <CardContent className="grid gap-4">{props.children}</CardContent>
      </form>
      <CardFooter className="flex flex-wrap items-center justify-between gap-2">
        <div className="text-sm text-muted-foreground">
          <span className="mr-1">Don&apos;t have an account?</span>
          <Link
            href="#"
            className="underline underline-offset-4 hover:text-primary"
          >
            Sign up
          </Link>
        </div>
        <Link
          href="#"
          className="text-sm underline underline-offset-4 hover:text-primary"
        >
          Forgot password?
        </Link>
      </CardFooter>
    </Card>
  );
}
