"use client";

import type { TypeOf } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { cn } from "@embed-stuff/ui/lib/utils";
import { Button } from "@embed-stuff/ui/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@embed-stuff/ui/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@embed-stuff/ui/ui/dialog";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@embed-stuff/ui/ui/form";
import { Input } from "@embed-stuff/ui/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@embed-stuff/ui/ui/select";
import { updateSchema } from "@embed-stuff/utils/feedbackValidators";

import {
  useFeedbackDelete,
  useFeedbackRead,
  useFeedbackUpdate,
} from "~/feedback/hooks";

export const Project = () => {
  return (
    <div className="flex h-full w-full flex-col gap-4 border-none bg-background">
      <ProjectDetails className="basis-[65%]" />
      <DangerZone className="basis-[35%]" />
    </div>
  );
};

const ProjectDetails = ({
  className,
  ...props
}: Parameters<typeof Card>[0]) => {
  const { title, status } = useFeedbackRead();
  const form = useForm<TypeOf<typeof updateSchema>>({
    resolver: zodResolver(updateSchema),
    values: {
      title,
      status,
    },
  });
  const { mutate, isPending } = useFeedbackUpdate();
  const onSubmit = (value: TypeOf<typeof updateSchema>) => mutate(value);
  return (
    <Card className={cn("h-full bg-background", className)} {...props}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardHeader className="flex flex-row items-center justify-between border-b py-4">
            <CardTitle className="text-xl font-semibold">
              Project details
            </CardTitle>
            <Button
              disabled={isPending || !form.formState.isDirty}
              type="submit"
            >
              Submit
            </Button>
          </CardHeader>
          <CardContent className="flex w-full flex-col justify-end gap-4 py-4">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Project Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Project Mayhem" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="status"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Status</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a project status" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="inactive">Inactive</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormDescription>
                    Only an active project can generate a visible widget.
                  </FormDescription>
                </FormItem>
              )}
            />
          </CardContent>
        </form>
      </Form>
    </Card>
  );
};

const DangerZone = ({ className, ...props }: Parameters<typeof Card>[0]) => {
  const { mutate, isPending } = useFeedbackDelete();
  return (
    <Dialog>
      <Card className={cn("h-full bg-background", className)} {...props}>
        <CardHeader className="flex flex-row items-center justify-between border-b py-4">
          <CardTitle className="text-xl font-semibold">Danger zone</CardTitle>
        </CardHeader>
        <CardContent className="flex w-full flex-col gap-4 py-4">
          <div className="flex w-full flex-row items-center justify-between">
            <div className="flex flex-col gap-1">
              <h4 className="text-sm font-semibold text-red-500">
                Delete this project
              </h4>
              <h6 className="text-sm text-muted-foreground">
                Once you delete a project, there is no going back. Please be
                certain.
              </h6>
            </div>
            <DialogTrigger asChild>
              <Button disabled={isPending} variant="destructive">
                Delete this project
              </Button>
            </DialogTrigger>
          </div>
        </CardContent>
      </Card>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete this project</DialogTitle>
          <DialogDescription>
            Are you sure, you want to delete this project? Once you delete a
            project, there is no going back. Please be certain.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button
            disabled={isPending}
            onClick={() => mutate()}
            variant="destructive"
          >
            Delete this project
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
