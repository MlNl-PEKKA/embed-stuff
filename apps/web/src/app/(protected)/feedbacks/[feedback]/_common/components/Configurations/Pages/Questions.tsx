import type { PropsWithChildren } from "react";
import type { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useFormContext, useWatch } from "react-hook-form";

import { cn } from "@embed-stuff/ui/lib/utils";
import { AccordionContent } from "@embed-stuff/ui/ui/accordion";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@embed-stuff/ui/ui/form";
import { Input } from "@embed-stuff/ui/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@embed-stuff/ui/ui/select";
import { Textarea } from "@embed-stuff/ui/ui/textarea";
import { feedbackPageTypeSchema } from "@embed-stuff/utils/dbValidators";
import {
  feebackPageModeType,
  feedbackPageMetaSchema,
} from "@embed-stuff/utils/feedbackValidators";

import type { Node as NodeType } from "~/feedback/store";
import { NodeInPortal } from "~/feedback/components/Node";
import { usePlaygroundStore } from "~/feedback/store";

type Props = NodeType["data"];

type FieldValues = z.infer<typeof feedbackPageMetaSchema>;

export const Questions = (props: PropsWithChildren<Props>) => {
  const form = useForm<FieldValues>({
    resolver: zodResolver(feedbackPageMetaSchema),
    values: props.meta,
    defaultValues: props.meta,
  });
  return (
    <Form {...form}>
      <AccordionContent>
        <Content />
      </AccordionContent>
      <Node id={props.id} />
    </Form>
  );
};

const Node = (props: Pick<Props, "id">) => {
  const data = useFormValues();
  const { nodes } = usePlaygroundStore();
  const selected = nodes.find((node) => node.selected)?.id === props.id;
  return (
    <NodeInPortal
      id={props.id}
      card={{
        className: cn("pointer-events-none min-w-[480px] bg-background"),
        variant: selected ? "special" : "default",
      }}
      data={data}
    />
  );
};

const useMetaForm = () => useFormContext<FieldValues>();

const useFormValues = () => {
  const form = useMetaForm();
  const values = useWatch({ control: form.control });
  return {
    ...values,
    ...form.getValues(),
  };
};

const Content = () => {
  return (
    <form className="flex flex-col gap-4">
      <Title />
      <Description />
      <Type />
      <TypeOptions />
    </form>
  );
};

const Title = () => {
  const form = useMetaForm();
  return (
    <FormField
      control={form.control}
      name="title"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Title</FormLabel>
          <FormControl>
            <Input {...field} />
          </FormControl>
        </FormItem>
      )}
    />
  );
};

const Description = () => {
  const form = useMetaForm();
  return (
    <FormField
      control={form.control}
      name="description"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Description</FormLabel>
          <FormControl>
            <Textarea {...field} />
          </FormControl>
        </FormItem>
      )}
    />
  );
};

const Type = () => {
  const form = useMetaForm();
  return (
    <FormField
      control={form.control}
      name="type"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Type</FormLabel>
          <Select
            onValueChange={field.onChange}
            value={field.value}
            defaultValue={feedbackPageTypeSchema.options[0].value}
          >
            <SelectTrigger className="capitalize">
              <SelectValue placeholder="Select a type" />
            </SelectTrigger>
            <SelectContent>
              {feedbackPageTypeSchema.options.map(({ value }) => (
                <SelectItem key={value} value={value} className="capitalize">
                  {value}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </FormItem>
      )}
    />
  );
};

const TypeOptions = () => {
  const form = useMetaForm();
  const value = useWatch({ control: form.control, name: "type" });
  switch (value) {
    case "select":
      return <SelectType />;
    case "checkbox":
      return <CheckboxType />;
    case "level":
      return <LevelType />;
    default:
      return null;
  }
};

const SelectType = () => {
  return <>Select</>;
};

const CheckboxType = () => {
  return <>Checkbox</>;
};

const LevelType = () => {
  const form = useMetaForm();
  return (
    <FormField
      control={form.control}
      name="mode"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Type</FormLabel>
          <Select
            onValueChange={field.onChange}
            value={field.value}
            defaultValue={feebackPageModeType.options[0]}
          >
            <SelectTrigger className="capitalize">
              <SelectValue placeholder="Select a mode" />
            </SelectTrigger>
            <SelectContent>
              {feebackPageModeType.options.map((value) => (
                <SelectItem key={value} value={value} className="capitalize">
                  {value}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </FormItem>
      )}
    />
  );
};
