"use client";
import React from "react";
import { useQuery } from "@tanstack/react-query";
import Portfolio from "@/components/Portfolio";

const getPageOwnerById = async (id: string) => {
  return (await fetch(`/api/pageOwner/${id}`)).json();
};

type Props = {};

const PageOwnerPage = ({ params }: { params: { id: string } }) => {
  const { data } = useQuery({
    queryKey: ["user", params.id],
    queryFn: () => getPageOwnerById(params.id),
  });
  return (
    <div>
      <Portfolio pageOwner={data} />
      <div>{params.id}</div>
      <div>{data?.name}</div>
    </div>
  );
};

export default PageOwnerPage;
