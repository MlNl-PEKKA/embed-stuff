"use client";

import { useForms } from "@/forms/hooks/useForms";
import { Content } from "./Content";
import { Card } from "./Card";

export const Forms = () => {
  const forms = useForms();
  return (
    <Content>
      {forms.map((form) => (
        <Card key={form.id} {...form} />
      ))}
    </Content>
  );
};
