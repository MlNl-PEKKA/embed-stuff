import { Redirect } from "~/public/landing/components/Redirect";

const Page = () => (
  <main className="flex h-full w-full flex-col items-center justify-center gap-4">
    <div className="text-4xl font-semibold">Coming soon</div>
    <Redirect.ErrorBoundary>
      <Redirect.Suspense>
        <Redirect />
      </Redirect.Suspense>
    </Redirect.ErrorBoundary>
  </main>
);

export default Page;
