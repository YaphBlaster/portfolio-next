import { dbUtils } from "@/lib/db";
import React from "react";
import ProjectCard from "./ProjectCard";

type Props = {
  pageOwnerId?: string;
};

const Portfolio = async ({ pageOwnerId }: Props) => {
  const data = await dbUtils.getPageOwner({ id: pageOwnerId });

  if (!data) return;
  return (
    <div className="flex items-center justify-center flex-col">
      <div className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
        {data?.name}
      </div>
      <p className="leading-7 [&:not(:first-child)]:mt-6">{data?.summary}</p>
      {data.projects.map((project) => (
        <ProjectCard key={project.id} project={project} />
      ))}
    </div>
  );
};

export default Portfolio;
