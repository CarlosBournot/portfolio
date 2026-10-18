import React from 'react';
import Section from './Section';
import ProjectCard from './ProjectCard';

export default function ProjectsSection({ projects }) {
  return (
    <Section id="projects" title="Proyectos" intro="Proyectos publicados, con sitio en vivo y código en GitHub.">
      <div className="space-y-24">
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </Section>
  );
}
