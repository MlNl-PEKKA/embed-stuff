"use client";

import { Spinner } from "./ui/spinner";

export const LoadingPage = () => {
  return (
    <div className="flex flex-grow items-center justify-center">
      <Spinner />
    </div>
  );
};
