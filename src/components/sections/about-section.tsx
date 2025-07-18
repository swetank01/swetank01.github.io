'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Circle, Terminal } from 'lucide-react';

const loginSequence = [
  { text: 'Booting BIOS...', delay: 50 },
  { text: 'Initializing kernel...', delay: 100 },
  { text: 'Loading user profile: [Sw3t@nK]...', delay: 150 },
  { text: 'Authentication successful. Access granted.', delay: 200 },
];

const summaryText = `I'm a Creative DevOps Engineer with a passion for automating complex infrastructure and building resilient, scalable systems. My expertise lies in cloud-native technologies, where I thrive on orchestrating CI/CD pipelines and optimizing performance. I believe in writing clean code, not just for machines, but for humans too. When I'm not architecting the cloud, you can find me exploring the latest in generative AI.`;

export function AboutSection() {
  const [log, setLog] = useState<{ text: string; id: number }[]>([]);
  const [typedSummary, setTypedSummary] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    let logIndex = 0;
    const intervalId = setInterval(() => {
      if (logIndex < loginSequence.length) {
        setLog(prevLog => [...prevLog, { text: loginSequence[logIndex].text, id: logIndex }]);
        logIndex++;
      } else {
        clearInterval(intervalId);
        setIsTyping(true);
      }
    }, 300);

    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    if (!isTyping) return;

    let charIndex = 0;
    const typingInterval = setInterval(() => {
      if (charIndex < summaryText.length) {
        setTypedSummary(prev => prev + summaryText.charAt(charIndex));
        charIndex++;
      } else {
        clearInterval(typingInterval);
      }
    }, 20);

    return () => clearInterval(typingInterval);
  }, [isTyping]);

  return (
    <section id="about" className="w-full py-12 md:py-24 lg:py-32">
        <div className="grid gap-10 lg:grid-cols-5">
            <div className="lg:col-span-2 space-y-4">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl font-headline text-primary">About Me</h2>
                <p className="text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                    A glimpse into the mind behind the terminal. My journey, my skills, and my philosophy on creating elegant solutions for complex problems.
                </p>
            </div>
            <div className="lg:col-span-3">
              <Card className="w-full font-mono text-sm shadow-2xl shadow-primary/10">
                  <CardHeader className="flex flex-row items-center justify-between p-2 border-b">
                      <div className="flex gap-1.5">
                      <Circle className="w-3 h-3 text-red-500 fill-current" />
                      <Circle className="w-3 h-3 text-yellow-500 fill-current" />
                      <Circle className="w-3 h-3 text-green-500 fill-current" />
                      </div>
                      <p className="text-xs text-muted-foreground">/home/sw3t@nk/about.txt</p>
                  </CardHeader>
                  <CardContent className="p-4">
                      {log.map((line) => (
                      <div key={line.id} className="flex items-center gap-2">
                          <Terminal className="w-4 h-4 text-primary/70"/>
                          <p className="text-foreground/80">{line.text}</p>
                      </div>
                      ))}
                      {isTyping && (
                      <div className="mt-4">
                          <p className="whitespace-pre-wrap break-words text-foreground">
                          <span className="text-primary mr-2">$</span>{typedSummary}
                          <span className="inline-block w-2 h-4 bg-primary animate-pulse ml-1"></span>
                          </p>
                      </div>
                      )}
                  </CardContent>
              </Card>
            </div>
        </div>
    </section>
  );
}
