'use client';

import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Server, Share2, Database, X } from 'lucide-react';
import { Separator } from '@/components/ui/separator';

const infraItems = [
  {
    id: "server-farm",
    title: "Scalable Kubernetes Cluster",
    description: "A multi-cloud, auto-scaling Kubernetes setup for high-traffic applications.",
    image: "https://placehold.co/600x400.png",
    aiHint: "server farm isometric",
    details: "This project involved deploying a Kubernetes cluster across AWS and GCP using Terraform for infrastructure-as-code. We utilized Istio for service mesh management and implemented robust CI/CD pipelines with Jenkins, resulting in a 70% reduction in deployment time and 99.99% uptime.",
    tech: ["Kubernetes", "AWS", "GCP", "Terraform", "Istio", "Jenkins"],
    icon: Server,
    blueprintImage: "https://placehold.co/800x600.png",
    blueprintAiHint: "blueprint architecture schematic",
  },
  {
    id: "network",
    title: "Secure VPC Networking",
    description: "Designed and implemented a secure and isolated network infrastructure on AWS.",
    image: "https://placehold.co/600x400.png",
    aiHint: "network infrastructure isometric",
    details: "Architected a Virtual Private Cloud (VPC) with public and private subnets, NAT Gateways, and strict security group rules. All traffic is monitored using VPC Flow Logs and GuardDuty for threat detection, ensuring a highly secure environment for sensitive data.",
    tech: ["AWS VPC", "Security Groups", "GuardDuty", "Network ACLs"],
    icon: Share2,
    blueprintImage: "https://placehold.co/800x600.png",
    blueprintAiHint: "network blueprint schematic",
  },
  {
    id: "database",
    title: "High-Availability Database",
    description: "A fault-tolerant, replicated database architecture for critical services.",
    image: "https://placehold.co/600x400.png",
    aiHint: "database cluster isometric",
    details: "Deployed a PostgreSQL cluster using Patroni on a set of virtual machines managed by Ansible. The setup includes automated failover, point-in-time recovery, and read replicas to distribute load, ensuring data integrity and constant availability.",
    tech: ["PostgreSQL", "Patroni", "Ansible", "HAProxy", "Replication"],
    icon: Database,
    blueprintImage: "https://placehold.co/800x600.png",
    blueprintAiHint: "database architecture schematic",
  },
];

export function InfrastructureSection() {
  return (
    <section id="infra" className="w-full py-12 md:py-24 lg:py-32 bg-muted/30">
      <div className="container px-4 md:px-6">
        <div className="space-y-4 text-center">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl font-headline text-primary">
            Interactive Infrastructure
          </h2>
          <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
            Click on any component to explore the projects and technologies behind them.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
          {infraItems.map((item, index) => (
            <Dialog key={item.id}>
              <DialogTrigger asChild>
                <Card className="overflow-hidden cursor-pointer group transition-all duration-300 hover:border-primary/50 hover:shadow-lg hover:shadow-primary/10 hover:-translate-y-1 fade-in-up" style={{ animationDelay: `${index * 150}ms`, opacity: 0 }}>
                  <CardHeader className="flex-row items-center gap-4">
                    <item.icon className="w-8 h-8 text-primary" />
                    <div>
                      <CardTitle>{item.title}</CardTitle>
                      <CardDescription>{item.description}</CardDescription>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="aspect-video overflow-hidden">
                      <Image
                        src={item.image}
                        alt={item.title}
                        width={600}
                        height={400}
                        data-ai-hint={item.aiHint}
                        className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  </CardContent>
                </Card>
              </DialogTrigger>
              <DialogContent className="sm:max-w-4xl bg-background/95 border-primary/20 font-code text-primary/80 p-0 backdrop-blur-sm">
                <DialogHeader className="p-4 border-b border-primary/20 flex-row justify-between items-center">
                  <DialogTitle className="text-xl text-primary font-headline flex items-center gap-2">
                    <item.icon className="w-6 h-6" /> {item.title}
                  </DialogTitle>
                  <DialogTrigger>
                      <X className="w-5 h-5 text-muted-foreground hover:text-primary transition-colors" />
                      <span className="sr-only">Close</span>
                  </DialogTrigger>
                </DialogHeader>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
                  <div className="p-6 pr-3">
                      <h3 className="font-headline text-primary text-lg mb-2">SYSTEM DETAILS</h3>
                      <DialogDescription className="text-foreground/70 mb-4">{item.details}</DialogDescription>
                      
                      <Separator className="my-4 bg-primary/20"/>

                      <h4 className="font-headline text-primary mb-2">TECHNOLOGIES USED:</h4>
                      <div className="flex flex-wrap gap-2">
                        {item.tech.map((tech) => (
                          <Badge key={tech} variant="secondary" className="bg-primary/10 text-primary border-primary/20 hover:bg-primary/20">{tech}</Badge>
                        ))}
                      </div>
                  </div>
                  <div className="p-6 pl-3 border-l border-primary/20 bg-black/20">
                      <h3 className="font-headline text-primary text-lg mb-2">ARCHITECTURE BLUEPRINT</h3>
                      <div className="aspect-video relative overflow-hidden rounded-md border-2 border-primary/30 p-2 bg-black/30">
                         <Image 
                              src={item.blueprintImage}
                              alt={`${item.title} blueprint`}
                              layout="fill"
                              objectFit="cover"
                              data-ai-hint={item.blueprintAiHint}
                              className="opacity-70"
                         />
                         <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                         <p className="absolute bottom-2 right-2 text-xs text-primary/50">CLASSIFIED: LEVEL 7</p>
                      </div>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          ))}
        </div>
      </div>
    </section>
  );
}
