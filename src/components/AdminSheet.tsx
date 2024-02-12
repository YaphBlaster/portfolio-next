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
import { _PageOwnerFullType } from "@/lib/actions";

type Props = {
  pageOwnerData: _PageOwnerFullType;
};

const AdminSheet = ({ pageOwnerData }: Props) => {
  const queryClient = useQueryClient();

  useEffect(() => {
    queryClient.setQueryData(["pageOwnerData"], () => pageOwnerData, {});
  }, [pageOwnerData, queryClient]);

  useEffect(() => {
    const convertedIcons: Record<string, icons.SimpleIcon> = {};

    Object.entries(icons).forEach(
      ([iconKey, iconInfo]) =>
        (convertedIcons[iconKey.toLowerCase()] = iconInfo)
    );
    queryClient.setQueryData(["techIcons"], () => convertedIcons);
  }, [queryClient]);

  return (
    <Sheet>
      <SheetTrigger>Open</SheetTrigger>
      <SheetContent className={"overflow-y-scroll"}>
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
