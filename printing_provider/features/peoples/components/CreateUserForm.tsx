"use client"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { UserRole } from "@prisma/client";
import React from "react";
import { useForm } from "react-hook-form";
import { createUserFormSchema } from "../schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { QueryClient, useMutation, useQueryClient } from "@tanstack/react-query";
import { createUserByRole } from "../actions/people";
import { Spinner } from "@/components/spinner";
import FormSuccess from "@/features/auth/components/form-success";
import FormError from "@/features/auth/components/form-error";

const CreateUserForm = ({
  role,
  setOpen,
}: {
  role: UserRole;
  setOpen: React.Dispatch<boolean>;
}) => {
  const form = useForm<z.infer<typeof createUserFormSchema>>({
    // @ts-ignore
    resolver: zodResolver(createUserFormSchema),
    defaultValues: {
      role: role,
      name: "",
      email: "",
    },
  });

  const queryClient = useQueryClient();

  const { mutate, isPending, isSuccess, error, data } = useMutation({
    mutationFn: async (values: z.infer<typeof createUserFormSchema>) => {
      const res = await createUserByRole({
        role: role,
        name: values.name,
        email: values.email,
      });
      if (res.error) throw new Error(res.error);
      return res;
    },
    onSuccess: () => {
      form.reset();
      queryClient.invalidateQueries({ queryKey: ["users", role] });
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof createUserFormSchema>) {
    mutate(values);
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="Daniel" {...field} />
              </FormControl>
              <FormDescription>
                This is your public display name.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  placeholder="email@example.com"
                  {...field}
                  type="email"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {isSuccess && (
          <FormSuccess message={`Invitation email has been sent to the user`} />
        )}
        {error && <FormError message={error.message} />}
        <DialogFooter>
          <Button
            variant={"outline"}
            onClick={() => {
              form.reset();
              setOpen(false);
            }}
          >
            Cancel
          </Button>
          <Button className="" type="submit" disabled={isPending}>
            {isPending && <Spinner size={"small"} className="text-white" />}
            Create{" "}
            {role === "PRINTING_PROVIDER" ? "Printing Provider" : "Designer"}
          </Button>
        </DialogFooter>
      </form>
    </Form>
  );
};

export default CreateUserForm;
