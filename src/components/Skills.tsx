import { Tech } from "@prisma/client";
import React from "react";

type Props = {
  skills: Tech[];
};

const Skills = ({ skills }: Props) => {
  return (
    <>
      test
      {skills.map((skill) => {
        const { path, slug, title } = skill;
        return (
          <div key={slug}>
            <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
              <path d={path} />
            </svg>
            {title}
          </div>
        );
      })}
    </>
  );
};

export default Skills;
