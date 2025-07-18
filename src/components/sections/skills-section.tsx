
'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { DigitalRain } from '@/components/shared/digital-rain';
import { Skeleton } from '@/components/ui/skeleton';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Cpu, Dna, Bot, Database, GitBranch, Terminal } from 'lucide-react';

const skills = [
  { 
    name: 'Kubernetes', 
    icon: Cpu, 
    log: '> kubectl get pods --all-namespaces\n> All systems operational.' 
  },
  { 
    name: 'AWS', 
    icon: Dna, 
    log: '> aws ec2 describe-instances --region us-east-1\n> All instances running.' 
  },
  { 
    name: 'Terraform', 
    icon: Bot, 
    log: '> terraform apply -auto-approve\n> Apply complete! Resources: 3 added, 0 changed, 0 destroyed.' 
  },
  { 
    name: 'Docker', 
    icon: Database, 
    log: '> docker ps\n> CONTAINER ID   IMAGE          COMMAND\n> c3f279d17e0a   nginx:latest   "nginx -g \'daemon of…"' 
  },
  { 
    name: 'CI/CD', 
    icon: GitBranch, 
    log: '> pipeline status: SUCCESS\n> Deployment to production complete.' 
  },
  { 
    name: 'Python', 
    icon: Terminal,
    log: 'import automation_script\nautomation_script.run()' 
  },
];

function SkillCardSkeleton() {
  return (
    <div className="p-4 border rounded-lg bg-muted/30">
        <div className="flex items-center gap-4">
            <Skeleton className="h-8 w-8 rounded-md" />
            <Skeleton className="h-5 w-32" />
        </div>
    </div>
  );
}

export function SkillsSection() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500); 
    return () => clearTimeout(timer);
  }, []);

  return (
    <section id="skills" className="w-full py-12 md:py-24 lg:py-32 relative overflow-hidden">
      <DigitalRain />
      <div className="container px-4 md:px-6 relative z-10">
        <div className="grid gap-10 lg:grid-cols-2">
          <div className="space-y-4">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl font-headline text-primary">Core Competencies</h2>
            <p className="text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              My expertise lies in building robust, scalable, and automated cloud-native solutions. I thrive on orchestrating complex systems and streamlining development lifecycles.
            </p>
          </div>
          
          <Card className="bg-background/80 backdrop-blur-sm p-6">
            <CardContent className="p-0">
              {isLoading ? (
                 <div className="grid grid-cols-2 gap-4">
                    {Array.from({ length: 6 }).map((_, i) => <SkillCardSkeleton key={i} />)}
                 </div>
              ) : (
                <div className="grid grid-cols-2 gap-4">
                  {skills.map((skill) => (
                    <Popover key={skill.name}>
                      <PopoverTrigger asChild>
                        <div className="group flex items-center gap-4 p-4 rounded-lg border border-primary/20 bg-muted/30 hover:bg-primary/10 hover:border-primary/50 cursor-pointer transition-all">
                          <skill.icon className="w-8 h-8 text-primary/70 group-hover:text-primary transition-colors" />
                          <h3 className="font-headline text-lg text-foreground/80 group-hover:text-foreground transition-colors">{skill.name}</h3>
                        </div>
                      </PopoverTrigger>
                      <PopoverContent className="w-80 bg-black/80 border-primary/30 text-primary font-code backdrop-blur-sm">
                        <div className="flex items-center gap-2 mb-2">
                            <Terminal className="w-4 h-4" />
                            <p className="text-sm font-semibold">Log Output</p>
                        </div>
                        <div className="p-2 rounded-sm bg-black/50 text-xs whitespace-pre-wrap">
                            {skill.log}
                        </div>
                      </PopoverContent>
                    </Popover>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
