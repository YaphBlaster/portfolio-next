import { getUserData } from "@/app/page";
import React from "react";

type Props = {
  user: Awaited<ReturnType<typeof getUserData>>;
};

const User = ({ user }: Props) => {
  return <div>{user?.name}</div>;
};

export default User;
