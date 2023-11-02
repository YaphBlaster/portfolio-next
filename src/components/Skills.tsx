import { Tech } from "@prisma/client";
import React from "react";
import TechIcon from "./TechIcon";

type Props = {
  skills: Tech[];
};

const Skills = ({ skills }: Props) => {
  return (
    <div className="flex gap-2">
      {skills.map((skill) => {
        return <TechIcon techInfo={skill} key={skill.slug} />;
      })}
    </div>
  );
};

export default Skills;
