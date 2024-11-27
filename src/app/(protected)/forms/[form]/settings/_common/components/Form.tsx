"use client";
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
import { useForm } from "@/form/hooks/useForm";
import { useFormUpdate } from "@/form/hooks/useFormUpdate";
import { schema } from "@/form/schema/update";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm as useHookForm } from "react-hook-form";
import type { TypeOf } from "zod";

export const Form = () => {
  const defaultValues = useForm();
  const { mutate, isPending } = useFormUpdate();
  const form = useHookForm<TypeOf<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues,
  });
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
          Update
        </Button>
      </form>
    </FormBody>
  );
};
