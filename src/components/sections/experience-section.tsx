import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const experiences = [
  {
    role: "Senior DevOps Engineer",
    company: "Cyberdyne Systems",
    period: "2021 - Present",
    description: "Led the automation of Skynet's global infrastructure. Implemented a self-healing Kubernetes cluster that increased uptime to 99.999%. Reduced deployment times by 90% through a CI/CD pipeline built with Jenkins and Terraform.",
    tags: ["AWS", "Kubernetes", "Terraform", "Jenkins", "Python"],
  },
  {
    role: "DevOps Engineer",
    company: "Stark Industries",
    period: "2018 - 2021",
    description: "Managed infrastructure for the Iron Man suit diagnostics and Jarvis AI. Developed custom monitoring solutions using Prometheus and Grafana, ensuring optimal suit performance. Automated server provisioning with Ansible.",
    tags: ["Azure", "Docker", "Ansible", "Prometheus", "Bash"],
  },
  {
    role: "Junior System Administrator",
    company: "Wayne Enterprises",
    period: "2016 - 2018",
    description: "Maintained the internal servers for Wayne Enterprises, including the systems for the Batcomputer. Handled network security and regular system updates. Gained foundational experience in Linux and network protocols.",
    tags: ["Linux", "Networking", "Security", "VMware"],
  },
];

export function ExperienceSection() {
  return (
    <section id="experience" className="w-full py-12 md:py-24 lg:py-32">
      <div className="space-y-4 text-center">
        <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl font-headline text-primary">
          Professional Experience
        </h2>
        <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
          A timeline of my journey, building and automating the future.
        </p>
      </div>
      <div className="relative mt-12">
        <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-border -translate-x-1/2" aria-hidden="true" />
        {experiences.map((exp, index) => (
          <div key={index} className="relative mb-8">
            <div className="flex items-center justify-center">
              <div className="absolute left-1/2 top-1/2 w-4 h-4 bg-primary rounded-full -translate-x-1/2 -translate-y-1/2 border-4 border-background" />
            </div>
            <div className={`flex ${index % 2 === 0 ? "justify-start" : "justify-end"} `}>
              <div className={`w-full md:w-5/12 ${index % 2 === 0 ? "md:pr-8" : "md:pl-8"}`}>
                <Card className="hover:border-primary/50 transition-all duration-300 transform hover:-translate-y-1">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle>{exp.role}</CardTitle>
                        <CardDescription>{exp.company}</CardDescription>
                      </div>
                      <p className="text-sm text-muted-foreground whitespace-nowrap">{exp.period}</p>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-foreground/80 mb-4">{exp.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {exp.tags.map((tag) => (
                        <Badge key={tag} variant="secondary">{tag}</Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
