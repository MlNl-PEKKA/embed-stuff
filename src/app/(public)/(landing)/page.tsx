import { BarChart2, CheckCircle, Code, Smile } from "lucide-react";
import Link from "next/link";
import { ModeToggle } from "@/components/mode-toggle";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Redirect } from "@/public/landing/components/Redirect";
import { connection } from "next/server";
import { api, HydrateClient } from "@/trpc/server";

const Page = async () => {
  await connection();
  void api.session.prefetch();
  return (
    <HydrateClient>
      <div className="flex min-h-screen flex-col">
        <header className="flex h-14 items-center px-4 lg:px-6">
          <Link
            prefetch={false}
            className="flex items-center justify-center"
            href="#"
          >
            <Smile className="mr-2 h-6 w-6" />
            <span className="font-bold">The Emote Kit</span>
          </Link>
          <nav className="ml-auto flex items-center gap-4 sm:gap-6">
            <Link
              prefetch={false}
              className="text-sm font-medium underline-offset-4 hover:underline"
              href="#features"
            >
              Features
            </Link>
            <Link
              prefetch={false}
              className="text-sm font-medium underline-offset-4 hover:underline"
              href="#how-it-works"
            >
              How It Works
            </Link>
            <Link
              prefetch={false}
              className="text-sm font-medium underline-offset-4 hover:underline"
              href="#pricing"
            >
              Pricing
            </Link>
            <Redirect.ErrorBoundary>
              <Redirect.Suspense>
                <Redirect />
              </Redirect.Suspense>
            </Redirect.ErrorBoundary>
            <ModeToggle />
          </nav>
        </header>
        <main className="flex-1">
          <section className="flex w-full justify-center py-12 md:py-24 lg:py-32 xl:py-48">
            <div className="container px-4 md:px-6">
              <div className="flex flex-col items-center space-y-4 text-center">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                    Bring Your Website to Life with The Emote Kit
                  </h1>
                  <p className="mx-auto max-w-[700px] text-gray-500 dark:text-gray-400 md:text-xl">
                    Add interactive, verified emoji reactions with ease and
                    engage your audience like never before.
                  </p>
                </div>
                <div className="space-x-4">
                  <Button>Get Started</Button>
                  <Button variant="outline">See It in Action</Button>
                </div>
              </div>
            </div>
          </section>
          <section
            id="features"
            className="flex w-full justify-center bg-gray-100 py-12 dark:bg-gray-800 md:py-24 lg:py-32"
          >
            <div className="container px-4 md:px-6">
              <h2 className="mb-12 text-center text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Features
              </h2>
              <div className="grid gap-6 lg:grid-cols-2 lg:gap-12">
                <Card>
                  <CardContent className="flex flex-col items-center space-y-4 p-6">
                    <Code className="h-12 w-12 text-primary" />
                    <h3 className="text-center text-2xl font-bold">
                      Easy Integration
                    </h3>
                    <p className="text-center text-gray-500 dark:text-gray-400">
                      Embed The Emote Kit with just a few lines of code and
                      start collecting reactions instantly.
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="flex flex-col items-center space-y-4 p-6">
                    <CheckCircle className="h-12 w-12 text-primary" />
                    <h3 className="text-center text-2xl font-bold">
                      Verified Reactions
                    </h3>
                    <p className="text-center text-gray-500 dark:text-gray-400">
                      Ensure authenticity with verified user reactions that add
                      credibility and engagement to your site.
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="flex flex-col items-center space-y-4 p-6">
                    <Smile className="h-12 w-12 text-primary" />
                    <h3 className="text-center text-2xl font-bold">
                      Customizable Emojis
                    </h3>
                    <p className="text-center text-gray-500 dark:text-gray-400">
                      {
                        "Tailor the emoji reactions to fit your brand's personality with customizable options."
                      }
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="flex flex-col items-center space-y-4 p-6">
                    <BarChart2 className="h-12 w-12 text-primary" />
                    <h3 className="text-center text-2xl font-bold">
                      Real-Time Analytics
                    </h3>
                    <p className="text-center text-gray-500 dark:text-gray-400">
                      Monitor user engagement with real-time analytics and
                      insights on how your audience interacts with your site.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </section>
          <section
            id="how-it-works"
            className="flex w-full justify-center py-12 md:py-24 lg:py-32"
          >
            <div className="container px-4 md:px-6">
              <h2 className="mb-12 text-center text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                How It Works
              </h2>
              <div className="grid gap-6 lg:grid-cols-4 lg:gap-12">
                {[
                  {
                    title: "Sign Up",
                    description:
                      "Register your website and get access to The Emote Kit's dashboard.",
                  },
                  {
                    title: "Get Your Embed Code",
                    description:
                      "Generate your unique embed code from the dashboard.",
                  },
                  {
                    title: "Embed & Customize",
                    description:
                      "Add the code to your website and customize the appearance of the reactions.",
                  },
                  {
                    title: "Engage & Analyze",
                    description:
                      "Watch as your users engage with the reactions and use the analytics to refine your strategy.",
                  },
                ].map((step, index) => (
                  <div
                    key={index}
                    className="flex flex-col items-center space-y-2 text-center"
                  >
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-white dark:text-black">
                      {index + 1}
                    </div>
                    <h3 className="text-xl font-bold">{step.title}</h3>
                    <p className="text-gray-500 dark:text-gray-400">
                      {step.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </section>
          <section className="flex w-full justify-center bg-gray-100 py-12 dark:bg-gray-800 md:py-24 lg:py-32">
            <div className="container px-4 md:px-6">
              <h2 className="mb-12 text-center text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                What Our Users Are Saying
              </h2>
              <div className="grid gap-6 lg:grid-cols-2 lg:gap-12">
                {[
                  {
                    quote:
                      "The Emote Kit transformed our user engagement! Easy to integrate and fun for our audience.",
                    author: "Jane Doe, CEO of Acme",
                  },
                  {
                    quote:
                      "The verified reactions feature adds a layer of authenticity we were missing. Highly recommended!",
                    author: "John Smith, Founder of Acme",
                  },
                ].map((testimonial, index) => (
                  <Card key={index}>
                    <CardContent className="flex flex-col items-center space-y-4 p-6 text-center">
                      <p className="text-xl italic">{`"${testimonial.quote}"`}</p>
                      <p className="font-semibold">- {testimonial.author}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </section>
          <section
            id="pricing"
            className="flex w-full justify-center py-12 md:py-24 lg:py-32"
          >
            <div className="container px-4 md:px-6">
              <h2 className="mb-4 text-center text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Simple & Transparent Pricing
              </h2>
              <p className="mb-8 text-center text-gray-500 dark:text-gray-400">
                Choose a plan that fits your needs and start using The Emote Kit
                today.
              </p>
              <div className="grid gap-6 lg:grid-cols-3 lg:gap-12">
                {[
                  {
                    name: "Basic",
                    price: "$9",
                    features: [
                      "100k monthly reactions",
                      "Basic analytics",
                      "Email support",
                    ],
                  },
                  {
                    name: "Professional",
                    price: "$29",
                    features: [
                      "500k monthly reactions",
                      "Advanced analytics",
                      "Priority support",
                      "Custom emojis",
                    ],
                  },
                  {
                    name: "Enterprise",
                    price: "Custom",
                    features: [
                      "Unlimited reactions",
                      "Dedicated account manager",
                      "Custom integration",
                      "SLA",
                    ],
                  },
                ].map((plan, index) => (
                  <Card key={index}>
                    <CardContent className="flex h-full flex-col items-center gap-2 p-6">
                      <h3 className="text-2xl font-bold">{plan.name}</h3>
                      <p className="text-4xl font-bold">{plan.price}</p>
                      <ul className="space-y-2 text-center">
                        {plan.features.map((feature, featureIndex) => (
                          <li key={featureIndex}>{feature}</li>
                        ))}
                      </ul>
                      <Button className="mt-auto w-full">Choose Plan</Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </section>
        </main>
        <footer className="flex w-full shrink-0 flex-col items-center gap-2 border-t px-4 py-6 sm:flex-row md:px-6">
          <p className="text-xs text-gray-500 dark:text-gray-400">
            © 2024 The Emote Kit. All rights reserved.
          </p>
          <nav className="flex gap-4 sm:ml-auto sm:gap-6">
            <Link
              prefetch={false}
              className="text-xs underline-offset-4 hover:underline"
              href="#"
            >
              Terms of Service
            </Link>
            <Link
              prefetch={false}
              className="text-xs underline-offset-4 hover:underline"
              href="#"
            >
              Privacy
            </Link>
          </nav>
        </footer>
      </div>
    </HydrateClient>
  );
};

export default Page;
