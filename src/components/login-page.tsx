import { Button } from "~/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import Link from "next/link";
import Image from "next/image";
import type { ButtonHTMLAttributes } from "react";

type Actions = (Pick<ButtonHTMLAttributes<HTMLButtonElement>, "formAction"> &
  Pick<Parameters<typeof Image>[0], "src" | "alt"> & { title: string })[];

type Props = {
  actions: Actions;
};

export function LoginPage(props: Props) {
  const buttons = props.actions.map((action, i) => (
    <Button
      key={i}
      variant="outline"
      className="w-full"
      formAction={action.formAction}
    >
      <Image
        src={action.src}
        className="mr-2"
        alt={action.alt}
        width={16}
        height={16}
      />
      {action.title}
    </Button>
  ));
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
        <CardContent className="grid gap-4">{buttons}</CardContent>
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
