'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Server, Share2, Database } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';

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
  },
];

function InfraCardSkeleton() {
  return (
    <Card className="overflow-hidden">
      <CardHeader className="flex-row items-center gap-4">
        <Skeleton className="w-8 h-8 rounded-sm" />
        <div className="w-full space-y-2">
          <Skeleton className="h-5 w-3/4" />
          <Skeleton className="h-4 w-full" />
        </div>
      </CardHeader>
      <CardContent>
        <Skeleton className="aspect-video w-full" />
      </CardContent>
    </Card>
  );
}

export function InfrastructureSection() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

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
          {isLoading ? (
            <>
              <InfraCardSkeleton />
              <InfraCardSkeleton />
              <InfraCardSkeleton />
            </>
          ) : (
            infraItems.map((item) => (
              <Dialog key={item.id}>
                <DialogTrigger asChild>
                  <Card className="overflow-hidden cursor-pointer group transition-all duration-300 hover:border-primary/50 hover:shadow-lg hover:shadow-primary/10">
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
                <DialogContent className="sm:max-w-[625px]">
                  <DialogHeader>
                    <DialogTitle className="text-2xl text-primary font-headline">{item.title}</DialogTitle>
                    <DialogDescription>{item.details}</DialogDescription>
                  </DialogHeader>
                  <div className="py-4">
                    <h4 className="font-semibold mb-2">Technologies Used:</h4>
                    <div className="flex flex-wrap gap-2">
                      {item.tech.map((tech) => (
                        <Badge key={tech} variant="secondary">{tech}</Badge>
                      ))}
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            ))
          )}
        </div>
      </div>
    </section>
  );
}
