import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ProjectFullType } from "@/lib/db";
import { siReact } from "simple-icons";
import TechIcon from "./TechIcon";

type Props = {
  project: ProjectFullType;
};
const ProjectCard = ({ project }: Props) => {
  const { links, description, title, year, techStack } = project;
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <TechIcon path={siReact.path} />
        <p>{description}</p>
      </CardContent>
      <CardFooter>
        <p>{year}</p>
      </CardFooter>
    </Card>
  );
};

export default ProjectCard;
