"use client";

import { Form } from "./Form";

export const Create = () => {
  return (
    <div className="flex h-full w-full flex-col gap-4 p-4">
      <h1 className="text-3xl font-bold">Create a Form</h1>
      <Form />
    </div>
  );
};
