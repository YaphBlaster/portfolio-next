import { getPageOwnerData } from "@/app/page";
import React from "react";

type Props = {
  pageOwner: Awaited<ReturnType<typeof getPageOwnerData>>;
};

const Portfolio = ({ pageOwner }: Props) => {
  return (
    <div className="flex items-center justify-center flex-col">
      <div className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
        {pageOwner?.name}
      </div>
      <p className="leading-7 [&:not(:first-child)]:mt-6">
        {pageOwner?.summary}
      </p>
    </div>
  );
};

export default Portfolio;
