import { _ProjectFullType } from "@/lib/actions";
import React from "react";
import ProjectCard from "./ProjectCard";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import ProjectForm from "./ProjectForm";

type Props = {
  data: _ProjectFullType[];
};

const Projects = ({ data }: Props) => {
  return (
    <div>
      <div className="text-center">Projects</div>
      <Dialog>
        <DialogTrigger>Add Project</DialogTrigger>
        <DialogContent className="relative">
          <DialogHeader>
            <DialogTitle>Project Info</DialogTitle>
            <DialogDescription>Add a new project</DialogDescription>
          </DialogHeader>
          <ProjectForm />
        </DialogContent>
      </Dialog>
      {data.map((project) => (
        <ProjectCard key={project.id} project={project} />
      ))}
    </div>
  );
};

export default Projects;
