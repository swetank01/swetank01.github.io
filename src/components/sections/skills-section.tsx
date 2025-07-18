'use client';

import React, { useState, useEffect } from 'react';
import { Progress } from '@/components/ui/progress';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { DigitalRain } from '@/components/shared/digital-rain';
import { Skeleton } from '@/components/ui/skeleton';

const skills = [
  { name: 'Kubernetes', level: 95 },
  { name: 'AWS', level: 90 },
  { name: 'Terraform', level: 90 },
  { name: 'Docker', level: 98 },
  { name: 'Jenkins/CI-CD', level: 85 },
  { name: 'Python', level: 80 },
  { name: 'Ansible', level: 75 },
  { name: 'Prometheus & Grafana', level: 88 },
];

function SkillBar({ name, level }: { name: string; level: number }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Animate progress bar on mount
    const timer = setTimeout(() => setProgress(level), 100);
    return () => clearTimeout(timer);
  }, [level]);

  return (
    <div>
      <div className="flex justify-between items-center mb-1">
        <span className="text-sm font-medium text-foreground/80">{name}</span>
        <span className="text-sm font-mono text-primary">{progress}%</span>
      </div>
      <Progress value={progress} className="h-2 [&>div]:bg-primary" />
    </div>
  );
}

function SkillsSkeleton() {
  return (
    <Card className="bg-background/80 backdrop-blur-sm">
      <CardHeader>
        <Skeleton className="h-7 w-48" />
      </CardHeader>
      <CardContent className="space-y-6">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i}>
            <div className="flex justify-between items-center mb-1">
              <Skeleton className="h-5 w-32" />
              <Skeleton className="h-5 w-10" />
            </div>
            <Skeleton className="h-2 w-full" />
          </div>
        ))}
      </CardContent>
    </Card>
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
          {isLoading ? (
            <SkillsSkeleton />
          ) : (
            <Card className="bg-background/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle>Skills & Proficiencies</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {skills.map((skill) => (
                  <SkillBar key={skill.name} name={skill.name} level={skill.level} />
                ))}
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </section>
  );
}