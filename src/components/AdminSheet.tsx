"use client";
import React, { useEffect } from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import * as icons from "simple-icons";
import { useQueryClient } from "@tanstack/react-query";

type Props = {};

const AdminSheet = (props: Props) => {
  const queryClient = useQueryClient();

  useEffect(() => {
    queryClient.setQueryData(["techIcons"], () => icons);
  }, [queryClient]);

  return (
    <Sheet>
      <SheetTrigger>Open</SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Edit Data</SheetTitle>
          <SheetDescription>Update all your info here!</SheetDescription>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
};

export default AdminSheet;
