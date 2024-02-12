"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import {
  Controller,
  FormProvider,
  SubmitHandler,
  useForm,
} from "react-hook-form";
import * as z from "zod";
import FieldArray from "./FieldArray";
import { Button } from "./ui/button";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import { DevTool } from "@hookform/devtools";

const formSchema = z.object({
  title: z.string().min(1),
  description: z.string(),
  year: z.number().max(new Date().getFullYear()),
});

export type ProjectFormType = z.infer<typeof formSchema>;

type Props = {};

const ProjectForm = (props: Props) => {
  const form = useForm<ProjectFormType>({
    defaultValues: {
      title: "",
      description: "",
      year: new Date().getFullYear(),
    },
    resolver: zodResolver(formSchema),
  });
  const onSubmit: SubmitHandler<ProjectFormType> = async (data) => {
    console.log("data :>> ", data);
  };

  return (
    <FormProvider {...form}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input placeholder="shadcn" {...field} />
                </FormControl>
                <FormDescription>Project Title</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>

                <FormControl>
                  <Input placeholder="shadcn" {...field} />
                </FormControl>
                <FormDescription>Project Description</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="year"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Year</FormLabel>

                <FormControl>
                  <Input
                    type="number"
                    placeholder="shadcn"
                    {...field}
                    onChange={(event) => field.onChange(+event.target.value)}
                  />
                </FormControl>
                <FormDescription>Project Year</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit">Submit</Button>
        </form>
      </Form>
      <DevTool control={form.control} />
    </FormProvider>
  );
};

export default ProjectForm;
