
'use client';

import { useState, useEffect, useRef } from 'react';
import { Button } from '../ui/button';
import { Card, CardHeader } from '../ui/card';
import { Mail, Phone, Download, Github, Linkedin, Twitter, Cloud, Code, GitMerge, ShieldCheck, AreaChart, Server } from 'lucide-react';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import Link from 'next/link';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { YinYangIcon } from './yin-yang-icon';

const skills = [
    { 
        icon: Cloud,
        title: "Strategic Cloud Solutions",
        description: "Designing and managing scalable, secure infrastructures on AWS, GCP, and Azure."
    },
    { 
        icon: Code,
        title: "Declarative Infrastructure",
        description: "Automating environment provisioning and management using Terraform and Ansible."
    },
    { 
        icon: Server,
        title: "Container Ecosystems",
        description: "Orchestrating production-grade services with Docker and Kubernetes."
    },
    { 
        icon: GitMerge,
        title: "Automated Delivery Pipelines",
        description: "Building robust CI/CD workflows to improve developer velocity and reliability."
    },
    { 
        icon: AreaChart,
        title: "Proactive Observability",
        description: "Implementing comprehensive monitoring to ensure system health and performance."
    },
    { 
        icon: ShieldCheck,
        title: "Security & Compliance",
        description: "Integrating security best practices throughout the entire development lifecycle."
    }
];

const projects = [
    { 
        title: 'Enterprise Security Framework', 
        description: 'Architected a serverless security framework on AWS, automating vulnerability scanning and compliance checks to reduce manual audit time by 80%.'
    },
    { 
        title: 'Unified Pipeline Platform', 
        description: 'Developed a dynamic CI/CD pipeline generator using Go, enabling teams to self-serve complex Jenkins workflows from a simple YAML configuration, boosting developer velocity.' 
    },
    { 
        title: 'GitOps-Driven Environment Management', 
        description: 'Pioneered the adoption of ArgoCD for a fully automated GitOps workflow, achieving verifiable environment parity and enabling high-frequency, low-risk deployments.' 
    },
];

const agents = [
    { name: 'Agent Kube', role: 'Orchestration Specialist', avatar: 'https://placehold.co/100x100.png', hint: 'professional woman portrait', glitchAvatar: 'https://placehold.co/100x100.png', glitchHint: 'robot face' },
    { name: 'Agent Terra', role: 'Infrastructure Architect', avatar: 'https://placehold.co/100x100.png', hint: 'professional man portrait', glitchAvatar: 'https://placehold.co/100x100.png', glitchHint: 'robot circuits' },
    { name: 'Agent CI', role: 'Deployment Coordinator', avatar: 'https://placehold.co/100x100.png', hint: 'professional person portrait', glitchAvatar: 'https://placehold.co/100x100.png', glitchHint: 'abstract lines' },
]

const GlitchName = ({ isGlitching, name, glitchName, onRestart }: { isGlitching: boolean, name: string, glitchName: string, onRestart?: () => void }) => {
    const text = isGlitching ? glitchName : name;

    return (
        <span
            className={cn('glitch-wrapper', { 'glitching': isGlitching, 'cursor-pointer': !!onRestart })}
            onClick={onRestart}
        >
            <span className="glitch-text" data-text={glitchName}>
                {text}
            </span>
        </span>
    );
};

const GlitchImage = ({ isGlitching, src, alt, width, height, 'data-ai-hint': dataAiHint, glitchSrc, 'data-glitch-ai-hint': dataGlitchAiHint, onClick, className }: { isGlitching: boolean, src: string, alt: string, width: number, height: number, 'data-ai-hint': string, glitchSrc?: string, 'data-glitch-ai-hint'?: string, onClick?: (e: React.MouseEvent<HTMLDivElement>) => void, className?: string }) => {
    return (
        <div onClick={onClick} className={cn('glitch-image-wrapper relative rounded-full mx-auto shadow-lg ring-4 ring-white', {'glitching': isGlitching, 'glitch-swap': !!glitchSrc }, className)}>
             {glitchSrc && (
                <div className="glitch-image-inner-hidden" style={{ backgroundImage: `url(${glitchSrc})` }} />
            )}
            <div className="glitch-image-inner" style={{ backgroundImage: `url(${src})` }} />
            <Image
                src={src}
                alt={alt}
                width={width}
                height={height}
                data-ai-hint={dataAiHint}
                {...(glitchSrc && { 'data-glitch-src': glitchSrc })}
                {...(dataGlitchAiHint && { 'data-glitch-ai-hint': dataGlitchAiHint })}
                className="rounded-full opacity-0" // Kept for layout and accessibility, but visually hidden
            />
        </div>
    );
};


export function BluePillPage({ onEnterHackerverse }: { onEnterHackerverse: () => void }) {
    const [isGlitching, setIsGlitching] = useState(false);
    const [theme, setTheme] = useState<'light' | 'dark'>('light');
    const glitchTimeoutRef = useRef<NodeJS.Timeout | null>(null);
    
    const triggerGlitch = () => {
        setIsGlitching(true);

        if (glitchTimeoutRef.current) clearTimeout(glitchTimeoutRef.current);
        glitchTimeoutRef.current = setTimeout(() => {
            setIsGlitching(false);
        }, 1000);
    };

    useEffect(() => {
        const intervalId = setInterval(() => {
            triggerGlitch();
        }, 2500);

        return () => {
            clearInterval(intervalId);
            if (glitchTimeoutRef.current) clearTimeout(glitchTimeoutRef.current);
        };
    }, []);

    const toggleTheme = () => {
        setTheme(currentTheme => (currentTheme === 'light' ? 'dark' : 'light'));
    };

    return (
        <TooltipProvider>
            <div 
                className={cn(
                    "w-full min-h-screen font-sans-corporate transition-colors duration-500",
                    "bg-[hsl(var(--bg-corporate))]",
                    "text-[hsl(var(--text-corporate-secondary))]",
                    theme === 'dark' && 'corporate-dark'
                )}
            >
                <header className="sticky top-0 z-50 bg-[hsl(var(--bg-corporate-header))] backdrop-blur-md border-b border-[hsl(var(--border-corporate))] shadow-sm">
                    <div className="container mx-auto px-6 py-4 flex justify-between items-center">
                        <div>
                            <h1 className="text-xl font-bold text-[hsl(var(--text-corporate-primary))]">
                               <GlitchName onRestart={onEnterHackerverse} isGlitching={isGlitching} name="Swetank" glitchName="$w3t@nK" /> Soni
                            </h1>
                            <p className="text-sm text-[hsl(var(--text-corporate-muted))]">Senior DevOps Engineer</p>
                        </div>
                        <nav className="flex items-center gap-4">
                            <Button variant="black" size="sm" className="rounded-full px-5 hidden sm:flex transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
                                <Download className="mr-2 h-4 w-4" /> Download Resume
                            </Button>
                            <div className="flex items-center gap-4">
                                <Link href="#" aria-label="Github">
                                    <Github className="h-5 w-5 text-[hsl(var(--text-corporate-muted))] hover:text-blue-600 transition-colors" />
                                </Link>
                                <Link href="#" aria-label="LinkedIn">
                                    <Linkedin className="h-5 w-5 text-[hsl(var(--text-corporate-muted))] hover:text-blue-600 transition-colors" />
                                </Link>
                                <Link href="#" aria-label="Twitter">
                                    <Twitter className="h-5 w-5 text-[hsl(var(--text-corporate-muted))] hover:text-blue-600 transition-colors" />
                                </Link>
                            </div>
                        </nav>
                    </div>
                </header>

                <main className="container mx-auto px-6 py-12">
                    
                    <section id="about" className="text-center py-12 lg:py-16">
                         <GlitchImage
                            onClick={onEnterHackerverse}
                            isGlitching={isGlitching}
                            src="https://lh3.googleusercontent.com/a/ACg8ocLgAiwsma-rBKylapneIfEmb8GU5SaZMWExotCGafW-CoYvCmw=s576-c-no"
                            glitchSrc="https://avatars.githubusercontent.com/u/57257799?v=4?s=400"
                            alt="Profile Picture"
                            width={256}
                            height={256}
                            data-ai-hint="professional portrait"
                            data-glitch-ai-hint="github avatar"
                            className="mb-6 cursor-pointer"
                        />
                        <h2 className="text-3xl md:text-4xl font-bold text-[hsl(var(--text-corporate-primary))] mb-4 max-w-3xl mx-auto">Pioneering Efficient and Scalable Cloud Solutions</h2>
                        <p className="text-lg text-[hsl(var(--text-corporate-subtle))] max-w-3xl mx-auto">
                            Results-driven Senior DevOps Engineer with over 8 years of experience in designing, implementing, and managing scalable, secure, and highly available cloud infrastructures. Proven ability to streamline development lifecycles and enhance operational efficiency through automation and best practices.
                        </p>
                    </section>
                    
                    <section id="competencies" className="py-12 lg:py-20 bg-[hsl(var(--bg-corporate-section))] rounded-3xl my-12 lg:my-20">
                        <div className="text-center max-w-3xl mx-auto px-6">
                            <h2 className="text-3xl font-bold text-[hsl(var(--text-corporate-primary))] mb-4">Core Competencies</h2>
                            <p className="text-lg text-[hsl(var(--text-corporate-subtle))] mb-12">
                                A holistic approach to DevOps, combining strategic architecture with hands-on implementation to drive business value and technical excellence.
                            </p>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-6">
                            {skills.map((skill, i) => (
                               <div key={i} className="bg-[hsl(var(--bg-corporate-card))] p-6 rounded-xl border border-[hsl(var(--border-corporate))] shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
                                    <skill.icon className="w-8 h-8 mb-4 text-blue-600" />
                                    <h3 className="font-semibold text-lg text-[hsl(var(--text-corporate-primary))] mb-1">{skill.title}</h3>
                                    <p className="text-[hsl(var(--text-corporate-subtle))] text-sm">{skill.description}</p>
                               </div>
                            ))}
                        </div>
                    </section>

                    <section id="initiatives" className="py-12 lg:py-20">
                        <div className="text-center max-w-3xl mx-auto px-6">
                            <h2 className="text-3xl font-bold text-[hsl(var(--text-corporate-primary))] mb-4">Key Initiatives</h2>
                            <p className="text-lg text-[hsl(var(--text-corporate-subtle))] mb-12">
                                A selection of high-impact projects that delivered measurable improvements in security, efficiency, and scalability.
                            </p>
                        </div>
                        <div className="space-y-8 px-6">
                           {projects.map((project, i) => (
                                <Card key={i} className="shadow-lg border-[hsl(var(--border-corporate))] transition-all duration-300 hover:shadow-xl hover:-translate-y-1 bg-[hsl(var(--bg-corporate-card))] p-4">
                                    <CardHeader>
                                        <h3 className="font-semibold text-[hsl(var(--text-corporate-primary))] text-xl">{project.title}</h3>
                                        <p className="text-[hsl(var(--text-corporate-subtle))]">{project.description}</p>
                                    </CardHeader>
                                </Card>
                            ))}
                        </div>
                    </section>

                    <section id="team" className="text-center py-12 lg:py-20 bg-[hsl(var(--bg-corporate-section))] rounded-3xl my-12 lg:my-20">
                       <div className="px-6">
                            <h2 className="text-3xl font-bold text-[hsl(var(--text-corporate-primary))] mb-4">Meet My AI Agents</h2>
                            <p className="text-lg text-[hsl(var(--text-corporate-subtle))] max-w-2xl mx-auto mb-12">My team of specialized AI agents who assist in automating and managing complex cloud infrastructure, orchestrated by a human architect.</p>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                                {agents.map((agent, i) => (
                                    <div key={i} className="flex flex-col items-center">
                                        <Tooltip>
                                            <TooltipTrigger asChild>
                                                <div onClick={(e) => e.preventDefault()}>
                                                    <GlitchImage
                                                        isGlitching={isGlitching}
                                                        src={agent.avatar}
                                                        glitchSrc={agent.glitchAvatar}
                                                        alt={agent.name}
                                                        width={100}
                                                        height={100}
                                                        data-ai-hint={agent.hint}
                                                        data-glitch-ai-hint={agent.glitchHint}
                                                        className="mb-4 cursor-pointer"
                                                    />
                                                </div>
                                            </TooltipTrigger>
                                            <TooltipContent className="text-xs">
                                                <p>Under Construction 🚧</p>
                                            </TooltipContent>
                                        </Tooltip>
                                        <h3 className="font-semibold text-[hsl(var(--text-corporate-primary))]">
                                            <GlitchName isGlitching={isGlitching} name={agent.name} glitchName={agent.name.toUpperCase().replace(' ', '_')} />
                                        </h3>
                                        <p className="text-sm text-[hsl(var(--text-corporate-muted))]">{agent.role}</p>
                                    </div>
                                ))}
                            </div>
                       </div>
                    </section>

                    <section id="contact" className="my-12 lg:my-20 bg-black text-white rounded-2xl p-12 mx-6 transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
                         <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                            <div className="text-center md:text-left">
                               <h2 className="text-3xl font-bold mb-2">Ready to Innovate?</h2>
                               <p className="text-slate-300">Let's connect and discuss how we can build the future, together.</p>
                            </div>
                            <div className="flex flex-col sm:flex-row gap-6 justify-center md:justify-end">
                                 <div className="flex items-center text-sm justify-center">
                                    <Mail className="w-4 h-4 mr-2 text-slate-400" />
                                    <span>s.soni.devops@email.com</span>
                                </div>
                                <div className="flex items-center text-sm justify-center">
                                    <Phone className="w-4 h-4 mr-2 text-slate-400" />
                                    <span>(555) 123-4567</span>
                                </div>
                            </div>
                         </div>
                    </section>
                    
                </main>
                
                <footer className="bg-[hsl(var(--bg-corporate-header))] border-t border-[hsl(var(--border-corporate))]">
                  <div className="container mx-auto px-6 py-6 flex flex-col md:flex-row justify-between items-center text-sm text-[hsl(var(--text-corporate-muted))]">
                    <p>
                        © {new Date().getFullYear()} <GlitchName isGlitching={isGlitching} name="Swetank" glitchName="$w3t@nK" /> Soni. All rights reserved.
                    </p>
                    <div className="flex items-center gap-4 mt-4 md:mt-0">
                        <Link href="#" aria-label="Github">
                            <Github className="h-5 w-5 text-[hsl(var(--text-corporate-muted))] hover:text-blue-600 transition-colors" />
                        </Link>
                        <Link href="#" aria-label="LinkedIn">
                            <Linkedin className="h-5 w-5 text-[hsl(var(--text-corporate-muted))] hover:text-blue-600 transition-colors" />
                        </Link>
                        <Link href="#" aria-label="Twitter">
                            <Twitter className="h-5 w-5 text-[hsl(var(--text-corporate-muted))] hover:text-blue-600 transition-colors" />
                        </Link>
                    </div>
                  </div>
                </footer>
            </div>
            <button
                onClick={toggleTheme}
                className="fixed bottom-5 right-5 z-50 w-12 h-12 rounded-full bg-[hsl(var(--bg-corporate-card))] border border-[hsl(var(--border-corporate))] flex items-center justify-center text-[hsl(var(--text-corporate-primary))] shadow-lg hover:scale-110 transition-transform"
                aria-label="Toggle theme"
            >
                <YinYangIcon className="w-6 h-6" />
            </button>
        </TooltipProvider>
    );
}
