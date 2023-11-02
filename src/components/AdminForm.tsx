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
import { _PageOwnerFullType, updatePageOwner } from "@/lib/actions";
import { useQueryClient } from "@tanstack/react-query";
import { MultiSelect } from "./ui/multi-select";
import { SimpleIcon } from "simple-icons";

const formSchema = z.object({
  name: z.string().min(1),
  summary: z.string().min(1),
  skills: z.array(z.string()).min(1),
});

export type AdminFormType = z.infer<typeof formSchema>;

type Props = {};

const AdminForm = ({}: Props) => {
  const queryClient = useQueryClient();
  const { name, summary, id, skills } = queryClient.getQueryData([
    "pageOwnerData",
  ]) as _PageOwnerFullType;

  const techIcons = queryClient.getQueryData(["techIcons"]) as Record<
    string,
    SimpleIcon
  >;

  const form = useForm<AdminFormType>({
    defaultValues: {
      name,
      summary,
      skills: skills.map((skill) => skill.slug),
    },
    resolver: zodResolver(formSchema),
  });
  const onSubmit: SubmitHandler<AdminFormType> = async (data) => {
    const purifiedSkills = data.skills.map((skill) => {
      const key = `si${skill}`;
      const tech = techIcons[key];
      return {
        ...tech,
      };
    });

    await updatePageOwner({
      formData: data,
      purifiedSkills,
      pageOwnerId: id,
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
                  What&apos;s your nombre hombre?
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
                  What would you say you do here?
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
                <FormLabel>Skills</FormLabel>
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
                <FormDescription>Showoff time 🥳</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Submit</Button>
        </form>
      </Form>
      <DevTool control={form.control} />
    </>
  );
};

export default AdminForm;
