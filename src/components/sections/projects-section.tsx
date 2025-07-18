'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Github, ExternalLink } from "lucide-react";
import Link from 'next/link';

const projects = [
  {
    title: "Project Cerberus",
    description: "A multi-headed security scanner that automates vulnerability detection across cloud environments. Integrates with Slack for real-time alerts.",
    tags: ["Python", "AWS Lambda", "Serverless", "Security"],
    github: "#",
    link: "#",
  },
  {
    title: "Nexus Pipeline",
    description: "A dynamic CI/CD pipeline generator for microservices. Users define a simple YAML, and Nexus creates complex Jenkinsfiles on the fly.",
    tags: ["Go", "Jenkins", "Kubernetes", "CI/CD"],
    github: "#",
    link: "#",
  },
  {
    title: "Automated GitOps",
    description: "An ArgoCD-based GitOps framework for managing staging and production Kubernetes clusters, ensuring environment parity.",
    tags: ["ArgoCD", "GitOps", "Helm", "Kubernetes"],
    github: "#",
    link: "#",
  }
];

export function ProjectsSection() {
  return (
    <section id="projects" className="w-full py-12 md:py-24 lg:py-32">
      <div className="space-y-4 text-center">
        <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl font-headline text-primary">
          Side Projects & Creations
        </h2>
        <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
          Explorations in automation, security, and open-source.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
        {projects.map((project, index) => (
          <Card 
            key={project.title} 
            className="group bg-background/50 border-border/30 hover:border-primary/50 transition-all duration-300 transform hover:-translate-y-2 fade-in-up flex flex-col"
            style={{ animationDelay: `${index * 150}ms`, opacity: 0 }}
          >
            <CardHeader>
              <div className="flex justify-between items-start">
                <CardTitle className="group-hover:text-primary transition-colors duration-300">{project.title}</CardTitle>
                <div className="flex items-center gap-2">
                  <Link href={project.github} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
                    <Github className="w-5 h-5" />
                  </Link>
                   <Link href={project.link} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
                    <ExternalLink className="w-5 h-5" />
                  </Link>
                </div>
              </div>
              <CardDescription>{project.description}</CardDescription>
            </CardHeader>
            <CardContent className="flex-grow flex flex-col justify-end">
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <Badge key={tag} variant="secondary" className="bg-primary/10 text-primary/80 border-primary/20">{tag}</Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
