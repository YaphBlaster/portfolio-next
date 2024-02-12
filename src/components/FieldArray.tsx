import React, { useEffect, useState } from "react";
import { useFieldArray, useFormContext } from "react-hook-form";
import { Button } from "./ui/button";
import { Trash2Icon } from "lucide-react";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { AdminFormType } from "./AdminForm";
import { v4 as uuidv4 } from "uuid";

type FieldArrayType = Pick<AdminFormType, "projects">;

type Props = {};

const FieldArray = (props: Props) => {
  const [accordionValue, setAccordionValue] = useState("");
  const { control, trigger, getValues, reset, formState } =
    useFormContext<AdminFormType>(); // retrieve all hook methods

  const { fields, append, prepend, remove, swap, move, insert } =
    useFieldArray<FieldArrayType>({
      name: "projects", // unique name for your Field Array
    });

  useEffect(() => {
    const { projects } = formState.errors;
    if (projects) {
      const firstErrorIndex = (projects as []).findIndex(
        (project) => project != null
      );

      setAccordionValue(`project-${firstErrorIndex}`);
    }
  }, [formState.errors]);

  return (
    <div>
      <Accordion
        type="single"
        collapsible
        value={accordionValue}
        onValueChange={(value) => setAccordionValue(value)}
      >
        {fields.map((item, index) => (
          <AccordionItem key={item.id} value={`project-${index}`}>
            <AccordionTrigger>
              {getValues(`projects.${index}.title`)}
              <Button onClick={() => remove(index)}>
                <Trash2Icon className="h-4 w-4" />
              </Button>
            </AccordionTrigger>
            <AccordionContent>
              <FormField
                control={control}
                name={`projects.${index}.title`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Project Title</FormLabel>
                    <FormControl>
                      <Input placeholder="shadcn" {...field} />
                    </FormControl>
                    <FormDescription>Name this bitch</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                key={item.id}
                control={control}
                name={`projects.${index}.description`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Project Description</FormLabel>
                    <FormControl>
                      <Input placeholder="shadcn" {...field} />
                    </FormControl>
                    <FormDescription>Name this bitch</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>

      <Button
        onClick={() => {
          const newProjectIndex = ++fields.length;
          const newProjectPrefix = `Project_${newProjectIndex}`;
          append({
            id: uuidv4(),
            description: `[${newProjectPrefix}_Description]`,
            title: `[${newProjectPrefix}_Title]`,
          });
          setAccordionValue(`project-${newProjectIndex - 1}`);
        }}
      >
        Add Project
      </Button>
    </div>
  );
};

export default FieldArray;
