"use client";
import React from "react";
import { useQuery } from "@tanstack/react-query";

const getUserById = async (id: string) => {
  return (await fetch(`/api/${id}`)).json();
};

type Props = {};

const User = ({ params }: { params: { id: string } }) => {
  const { data } = useQuery({
    queryKey: ["user", params.id],
    queryFn: () => getUserById(params.id),
  });
  return (
    <div>
      <div>{params.id}</div>
      <div>{data?.name}</div>
    </div>
  );
};

export default User;
