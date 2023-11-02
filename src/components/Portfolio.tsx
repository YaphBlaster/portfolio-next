import { _PageOwnerFullType } from "@/lib/actions";
import React from "react";
import ProjectCard from "./ProjectCard";
import AdminSheet from "./AdminSheet";
import Skills from "./Skills";
import TechIcon from "./TechIcon";
import Image from "next/image";

type Props = {
  pageOwnerId?: string;
  data: _PageOwnerFullType;
};

const Portfolio = async ({ data, pageOwnerId }: Props) => {
  return (
    <>
      <AdminSheet pageOwnerData={data} />
      <div className="flex items-center justify-center flex-col">
        <div className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
          {data?.name}
        </div>
        {data.skills.map((skill) => (
          <TechIcon key={skill.slug} path={skill.path} />
        ))}
        {data.skills.map((skill) => (
          <div key={skill.slug}>
            <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
              <path d={skill.path} />
            </svg>
            {skill.title}
          </div>
        ))}

        <Skills skills={data.skills} />
        <p className="leading-7 [&:not(:first-child)]:mt-6">{data?.summary}</p>
        {data.projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </>
  );
};

export default Portfolio;
