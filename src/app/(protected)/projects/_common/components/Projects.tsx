"use client";

import { useProjects } from "@/projects/hooks/useProjects";
import { Content } from "./Content";
import { Card } from "./Card";

export const Projects = () => {
  const projects = useProjects();
  return (
    <Content>
      {projects.map((project) => (
        <Card key={project.id} {...project} />
      ))}
    </Content>
  );
};
