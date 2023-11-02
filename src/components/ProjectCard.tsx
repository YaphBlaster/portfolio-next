import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { _ProjectFullType } from "@/lib/actions";
import { siReact } from "simple-icons";
import TechIcon from "./TechIcon";

type Props = {
  project: _ProjectFullType;
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
        <p>{description}</p>
      </CardContent>
      <CardFooter>
        <p>{year}</p>
      </CardFooter>
    </Card>
  );
};

export default ProjectCard;
