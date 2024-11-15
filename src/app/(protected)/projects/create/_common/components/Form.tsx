"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import type { TypeOf } from "zod";
import { schema } from "@/projects/create/schema/create";
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
import { useProjectCreate } from "@/projects/create/hooks/useProjectCreate";

export const Form = () => {
  const form = useForm<TypeOf<typeof schema>>({
    resolver: zodResolver(schema),
  });
  const { mutate, isPending } = useProjectCreate();
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
              <FormDescription>This is your project name.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="url"
          render={({ field }) => (
            <FormItem>
              <FormLabel>URL</FormLabel>
              <FormControl>
                <Input placeholder="URL" {...field} />
              </FormControl>
              <FormDescription>This is your project URL.</FormDescription>
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
