"use client";

import { useForm } from "@/form/hooks/useForm";

export const Form = () => {
  const { name } = useForm();
  return <>{name}</>;
};
