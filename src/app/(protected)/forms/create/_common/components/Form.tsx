"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import type { TypeOf } from "zod";
import { schema } from "@/forms/create/schema/create";
import { Button } from "@/components/ui/button";
import {
  Form as FormBody,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useFormCreate } from "@/forms/create/hooks/useFormCreate";

export const Form = () => {
  const form = useForm<TypeOf<typeof schema>>({
    resolver: zodResolver(schema),
  });
  const { mutate, isPending } = useFormCreate();
  return (
    <FormBody {...form}>
      <form
        onSubmit={form.handleSubmit((input) => mutate(input))}
        className="space-y-8"
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="Name" {...field} />
              </FormControl>
              <FormDescription>This is your form name.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={isPending}>
          Submit
        </Button>
      </form>
    </FormBody>
  );
};
