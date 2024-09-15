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
import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { createClient } from "~/server/db";

export async function LoginPage() {
  const google = async () => {
    "use server";
    const supabase = createClient();
    const origin = headers().get("origin")!;
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${origin}/api/auth/callback`,
      },
    });
    if (error) redirect("/error");
    if (data.url) redirect(data.url);
  };
  const github = async () => {
    "use server";
    const supabase = createClient();
    const origin = headers().get("origin")!;
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "github",
      options: {
        redirectTo: `${origin}/api/auth/callback`,
      },
    });
    if (error) redirect("/error");
    if (data.url) redirect(data.url);
  };
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 dark:bg-gray-900">
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
          <CardContent className="grid gap-4">
            <Button variant="outline" className="w-full" formAction={google}>
              <Image
                src={"google.svg"}
                className="mr-2"
                alt={"Google"}
                width={16}
                height={16}
              />
              Continue with Google
            </Button>
            <Button variant="outline" className="w-full" formAction={github}>
              <Image
                src={"github.svg"}
                className="mr-2"
                alt={"Github"}
                width={16}
                height={16}
              />
              Continue with GitHub
            </Button>
          </CardContent>
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
    </div>
  );
}
