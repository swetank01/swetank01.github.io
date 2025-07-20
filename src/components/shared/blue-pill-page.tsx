
'use client';

import { useState, useEffect, useRef } from 'react';
import { Button } from '../ui/button';
import { Card, CardHeader } from '../ui/card';
import { Mail, Phone, Download, Github, Linkedin, Twitter, Cloud, Code, GitMerge, ShieldCheck, AreaChart, Server } from 'lucide-react';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import Link from 'next/link';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

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

const GlitchName = ({ isGlitching, onRestart }: { isGlitching: boolean, onRestart?: () => void }) => {
    const text = isGlitching ? '$w3t@nK' : 'Swetank';

    return (
        <span
            className={cn('glitch-wrapper', { 'glitching': isGlitching, 'cursor-pointer': !!onRestart })}
            onClick={onRestart}
        >
            <span className="glitch-text" data-text="$w3t@nK">
                {text}
            </span>
        </span>
    );
};

const GlitchImage = ({ isGlitching, src, alt, width, height, 'data-ai-hint': dataAiHint, glitchSrc, 'data-glitch-ai-hint': dataGlitchAiHint, onClick }: { isGlitching: boolean, src: string, alt: string, width: number, height: number, 'data-ai-hint': string, glitchSrc?: string, 'data-glitch-ai-hint'?: string, onClick?: () => void }) => {
    return (
        <div onClick={onClick} className={cn('glitch-image-wrapper relative rounded-full mx-auto mb-6 shadow-lg ring-4 ring-white', {'glitching': isGlitching, 'glitch-swap': !!glitchSrc, 'cursor-pointer': !!onClick })}>
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

    return (
        <TooltipProvider>
            <div 
                className="w-full min-h-screen bg-white text-slate-800 font-sans-corporate"
            >
                <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200 shadow-sm">
                    <div className="container mx-auto px-6 py-4 flex justify-between items-center">
                        <div>
                            <h1 className="text-xl font-bold text-slate-900">
                               <GlitchName onRestart={onEnterHackerverse} isGlitching={isGlitching} /> Soni
                            </h1>
                            <p className="text-sm text-slate-500">Senior DevOps Engineer</p>
                        </div>
                        <nav className="flex items-center gap-4">
                            <Button size="sm" className="bg-black text-white rounded-full px-5 hidden sm:flex transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
                                <Download className="mr-2 h-4 w-4" /> Download Resume
                            </Button>
                            <div className="flex items-center gap-4">
                                <Link href="#" aria-label="Github">
                                    <Github className="h-5 w-5 text-slate-500 hover:text-blue-600 transition-colors" />
                                </Link>
                                <Link href="#" aria-label="LinkedIn">
                                    <Linkedin className="h-5 w-5 text-slate-500 hover:text-blue-600 transition-colors" />
                                </Link>
                                <Link href="#" aria-label="Twitter">
                                    <Twitter className="h-5 w-5 text-slate-500 hover:text-blue-600 transition-colors" />
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
                        />
                        <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4 max-w-3xl mx-auto">Pioneering Efficient and Scalable Cloud Solutions</h2>
                        <p className="text-lg text-slate-600 max-w-3xl mx-auto">
                            Results-driven Senior DevOps Engineer with over 8 years of experience in designing, implementing, and managing scalable, secure, and highly available cloud infrastructures. Proven ability to streamline development lifecycles and enhance operational efficiency through automation and best practices.
                        </p>
                    </section>
                    
                    <section id="competencies" className="py-12 lg:py-20 bg-slate-50/70 rounded-3xl my-12 lg:my-20">
                        <div className="text-center max-w-3xl mx-auto px-6">
                            <h2 className="text-3xl font-bold text-slate-900 mb-4">Core Competencies</h2>
                            <p className="text-lg text-slate-600 mb-12">
                                A holistic approach to DevOps, combining strategic architecture with hands-on implementation to drive business value and technical excellence.
                            </p>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-6">
                            {skills.map((skill, i) => (
                               <div key={i} className="bg-white p-6 rounded-xl border border-slate-200/80 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
                                    <skill.icon className="w-8 h-8 mb-4 text-blue-600" />
                                    <h3 className="font-semibold text-lg text-slate-900 mb-1">{skill.title}</h3>
                                    <p className="text-slate-600 text-sm">{skill.description}</p>
                               </div>
                            ))}
                        </div>
                    </section>

                    <section id="initiatives" className="py-12 lg:py-20">
                        <div className="text-center max-w-3xl mx-auto px-6">
                            <h2 className="text-3xl font-bold text-slate-900 mb-4">Key Initiatives</h2>
                            <p className="text-lg text-slate-600 mb-12">
                                A selection of high-impact projects that delivered measurable improvements in security, efficiency, and scalability.
                            </p>
                        </div>
                        <div className="space-y-8 px-6">
                           {projects.map((project, i) => (
                                <Card key={i} className="shadow-lg border-slate-200/80 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 bg-white p-4">
                                    <CardHeader>
                                        <h3 className="font-semibold text-slate-900 text-xl">{project.title}</h3>
                                        <p className="text-slate-600">{project.description}</p>
                                    </CardHeader>
                                </Card>
                            ))}
                        </div>
                    </section>

                    <section id="team" className="text-center py-12 lg:py-20 bg-slate-100/70 rounded-3xl my-12 lg:my-20">
                       <div className="px-6">
                            <h2 className="text-3xl font-bold text-slate-900 mb-4">Meet My AI Agents</h2>
                            <p className="text-lg text-slate-600 max-w-2xl mx-auto mb-12">My team of specialized AI agents who assist in automating and managing complex cloud infrastructure, orchestrated by a human architect.</p>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                                {agents.map((agent, i) => (
                                    <div key={i} className="flex flex-col items-center">
                                        <Tooltip>
                                            <TooltipTrigger>
                                                <GlitchImage
                                                    isGlitching={isGlitching}
                                                    src={agent.avatar}
                                                    glitchSrc={agent.glitchAvatar}
                                                    alt={agent.name}
                                                    width={100}
                                                    height={100}
                                                    data-ai-hint={agent.hint}
                                                    data-glitch-ai-hint={agent.glitchHint}
                                                />
                                            </TooltipTrigger>
                                            <TooltipContent>
                                                <p>Functionality Under Construction</p>
                                            </TooltipContent>
                                        </Tooltip>
                                        <h3 className="font-semibold text-slate-800">
                                            {agent.name}
                                        </h3>
                                        <p className="text-sm text-slate-500">{agent.role}</p>
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
                
                <footer className="bg-white border-t">
                  <div className="container mx-auto px-6 py-6 flex flex-col md:flex-row justify-between items-center text-sm text-slate-500">
                    <p>
                        © {new Date().getFullYear()} <GlitchName isGlitching={isGlitching} /> Soni. All rights reserved.
                    </p>
                    <div className="flex items-center gap-4 mt-4 md:mt-0">
                        <Link href="#" aria-label="Github">
                            <Github className="h-5 w-5 text-slate-500 hover:text-blue-600 transition-colors" />
                        </Link>
                        <Link href="#" aria-label="LinkedIn">
                            <Linkedin className="h-5 w-5 text-slate-500 hover:text-blue-600 transition-colors" />
                        </Link>
                        <Link href="#" aria-label="Twitter">
                            <Twitter className="h-5 w-5 text-slate-500 hover:text-blue-600 transition-colors" />
                        </Link>
                    </div>
                  </div>
                </footer>
            </div>
        </TooltipProvider>
    );
}