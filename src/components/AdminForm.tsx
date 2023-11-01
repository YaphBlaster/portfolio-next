"use client";
import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import * as z from "zod";
import { DevTool } from "@hookform/devtools";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { PageOwnerFullType } from "@/lib/db";
import { useQueryClient } from "@tanstack/react-query";
import { MultiSelect } from "./ui/multi-select";
import { revalidatePath } from "next/cache";

const formSchema = z.object({
  name: z.string().min(1),
  summary: z.string().min(1),
  skills: z.array(z.string()).min(1),
  isDefaultOwner: z.boolean(),
});

export type AdminFormType = z.infer<typeof formSchema>;

type TechIconType = {
  title: string;
  slug: string;
  svg: string;
  path: string;
  source: string;
  hex: string;
};

type Props = {};

const AdminForm = ({}: Props) => {
  const queryClient = useQueryClient();
  const formData = queryClient.getQueryData([
    "pageOwnerData",
  ]) as PageOwnerFullType;

  const techIcons = queryClient.getQueryData(["techIcons"]) as TechIconType[];

  const form = useForm<AdminFormType>({
    defaultValues: {
      ...formData,
    },
    resolver: zodResolver(formSchema),
  });
  const onSubmit: SubmitHandler<AdminFormType> = async (data) => {
    await fetch(`/api/pageOwner/${formData.id}`, {
      method: "PATCH",
      body: JSON.stringify(data),
    });
  };

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Page Owner Name</FormLabel>
                <FormControl>
                  <Input placeholder="shadcn" {...field} />
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
            name="summary"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Summary</FormLabel>
                <FormControl>
                  <Input placeholder="shadcn" {...field} />
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
            name="skills"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Summary</FormLabel>
                <FormControl>
                  <MultiSelect
                    selected={field.value}
                    options={Object.values(techIcons).map((techIcon) => {
                      return {
                        value: techIcon.slug,
                        label: techIcon.title,
                      };
                    })}
                    {...field}
                    className="sm:w-[510px]"
                  />
                </FormControl>
                <FormDescription>
                  This is your public display name.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Submit</Button>
        </form>
      </Form>
      <DevTool control={form.control} /> {/* set up the dev tool */}
    </>
  );
};

export default AdminForm;
