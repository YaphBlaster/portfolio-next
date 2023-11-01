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
import AdminForm from "./AdminForm";
import { PageOwnerFullType } from "@/lib/db";

type Props = {
  pageOwnerData: PageOwnerFullType;
};

const AdminSheet = ({ pageOwnerData }: Props) => {
  const queryClient = useQueryClient();

  useEffect(() => {
    queryClient.setQueryData(["techIcons"], () => icons);
    queryClient.setQueryData(["pageOwnerData"], () => pageOwnerData);
  }, [pageOwnerData, queryClient]);

  return (
    <Sheet>
      <SheetTrigger>Open</SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Edit Data</SheetTitle>
          <SheetDescription>Update all your info here!</SheetDescription>
          <AdminForm />
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
};

export default AdminSheet;
