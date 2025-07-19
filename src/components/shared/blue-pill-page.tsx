
'use client';

import { useState, useEffect, useRef } from 'react';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../ui/card';
import { Briefcase, Users, CheckCircle, Mail, Phone, Download, Building, Bot, Github, Linkedin, Twitter } from 'lucide-react';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import Link from 'next/link';

const skills = [
    "Cloud Architecture (AWS, Azure)",
    "Infrastructure as Code (Terraform, Ansible)",
    "Containerization & Orchestration (Docker, Kubernetes)",
    "CI/CD Pipelines (Jenkins, GitHub Actions)",
    "Monitoring & Observability (Prometheus, Grafana)",
    "Scripting & Automation (Python, Go, Bash)"
];

const projects = [
    { 
        title: 'Cloud Security Automation Framework', 
        description: 'Developed a Python-based serverless framework on AWS Lambda to automate vulnerability scanning and compliance checks, reducing manual audit time by 80%.'
    },
    { 
        title: 'Dynamic CI/CD Pipeline Generator', 
        description: 'Architected a Go-based tool that dynamically generates complex Jenkinsfiles from a simplified YAML configuration, improving developer onboarding and pipeline consistency.' 
    },
    { 
        title: 'GitOps Implementation for Kubernetes', 
        description: 'Led the adoption of ArgoCD to establish a GitOps workflow, ensuring environment parity between staging and production and enabling fully automated, auditable deployments.' 
    },
];

const agents = [
    { name: 'Agent Kube', role: 'Orchestration Specialist', avatar: 'https://placehold.co/100x100.png', hint: 'robot face' },
    { name: 'Agent Terra', role: 'Infrastructure Architect', avatar: 'https://placehold.co/100x100.png', hint: 'robot face' },
    { name: 'Swetank Soni', role: 'Lead DevOps Architect', avatar: 'https://placehold.co/100x100.png', hint: 'man glasses face' },
    { name: 'Agent CI', role: 'Deployment Coordinator', avatar: 'https://placehold.co/100x100.png', hint: 'robot face' },
]

const GlitchName = ({ onRestart, isGlitching }: { onRestart: () => void, isGlitching: boolean }) => {
    const text = isGlitching ? '$w3t@nK' : 'Swetank';

    return (
        <span
            className={cn('glitch-wrapper', { 'glitching': isGlitching })}
            onClick={onRestart}
        >
            <span className="glitch-text" data-text="$w3t@nK">
                {text}
            </span>
        </span>
    );
};


export function BluePillPage({ onRestart }: { onRestart: () => void }) {
    const [isGlitching, setIsGlitching] = useState(false);
    const glitchTimeoutRef = useRef<NodeJS.Timeout | null>(null);
    const debounceTimeoutRef = useRef<NodeJS.Timeout | null>(null);
    
    const triggerGlitch = () => {
        if (isGlitching) return;
        
        setIsGlitching(true);

        if (glitchTimeoutRef.current) clearTimeout(glitchTimeoutRef.current);
        glitchTimeoutRef.current = setTimeout(() => {
            setIsGlitching(false);
        }, 1000);
    };

    const handleMouseMove = () => {
        if (debounceTimeoutRef.current) clearTimeout(debounceTimeoutRef.current);
        const randomDelay = Math.random() * 400 + 100;
        debounceTimeoutRef.current = setTimeout(triggerGlitch, randomDelay);
    };

    useEffect(() => {
        return () => {
            if (glitchTimeoutRef.current) clearTimeout(glitchTimeoutRef.current);
            if (debounceTimeoutRef.current) clearTimeout(debounceTimeoutRef.current);
        };
    }, []);

    return (
        <div 
            className="w-full h-screen bg-slate-50 text-slate-700 font-sans-corporate animate-fade-in-up overflow-y-auto"
            onMouseMove={handleMouseMove}
        >
            <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200 shadow-sm">
                <div className="container mx-auto px-6 py-4 flex justify-between items-center">
                    <div>
                        <h1 className="text-xl font-bold text-slate-900">
                           <GlitchName onRestart={onRestart} isGlitching={isGlitching} /> Soni
                        </h1>
                        <p className="text-sm text-slate-500">Senior DevOps Engineer</p>
                    </div>
                    <nav className="flex items-center gap-4">
                        <Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-white rounded-full px-5">
                            <Download className="mr-2 h-4 w-4" /> Download Resume
                        </Button>
                        <div className="hidden md:flex items-center gap-4">
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

            <main className="container mx-auto px-6 py-16">
                
                {/* About Me Section */}
                <section id="about" className="text-center max-w-3xl mx-auto mb-24">
                    <h2 className="text-3xl font-bold text-slate-900 mb-4">Pioneering Efficient and Scalable Cloud Solutions</h2>
                    <p className="text-lg text-slate-600">
                        Results-driven Senior DevOps Engineer with over 8 years of experience in designing, implementing, and managing scalable, secure, and highly available cloud infrastructures. Proven ability to streamline development lifecycles and enhance operational efficiency through automation and best practices.
                    </p>
                </section>
                
                {/* Core Competencies & Key Initiatives */}
                <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 mb-24">
                    {/* Core Competencies Section */}
                    <div className="lg:col-span-2">
                         <Card className="shadow-lg border-slate-200/80 transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
                            <CardHeader>
                                <CardTitle className="flex items-center text-slate-800 text-xl"><Users className="mr-3 h-6 w-6 text-blue-500" /> Core Competencies</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <ul className="space-y-3">
                                    {skills.map((skill, i) => (
                                        <li key={i} className="flex items-center text-sm">
                                            <CheckCircle className="w-4 h-4 mr-2 text-green-500 flex-shrink-0" />
                                            {skill}
                                        </li>
                                    ))}
                                </ul>
                            </CardContent>
                        </Card>
                    </div>

                    <div className="lg:col-span-3">
                        <h2 className="text-2xl font-bold text-slate-800 mb-6 flex items-center"><Briefcase className="mr-3 h-6 w-6 text-blue-500" /> Key Initiatives</h2>
                        <div className="space-y-6">
                           {projects.map((project, i) => (
                                <Card key={i} className="shadow-lg border-slate-200/80 transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
                                    <CardHeader>
                                        <h3 className="font-semibold text-slate-800">{project.title}</h3>
                                        <p className="text-sm text-slate-600">{project.description}</p>
                                    </CardHeader>
                                </Card>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Team Section */}
                <section id="team" className="text-center mb-24">
                    <h2 className="text-3xl font-bold text-slate-900 mb-4">Meet My AI Agents</h2>
                    <p className="text-lg text-slate-600 max-w-2xl mx-auto mb-12">My team of specialized AI agents who assist in automating and managing complex cloud infrastructure, orchestrated by a human architect.</p>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                        {agents.map((agent, i) => (
                            <div key={i} className="flex flex-col items-center">
                                <Image
                                    src={agent.avatar}
                                    alt={agent.name}
                                    width={100}
                                    height={100}
                                    data-ai-hint={agent.hint}
                                    className="rounded-full mb-4 shadow-md"
                                />
                                 <h3 className="font-semibold text-slate-800">
                                    {agent.name === 'Swetank Soni' ? <GlitchName onRestart={onRestart} isGlitching={isGlitching} /> : agent.name.split(' ')[0]} {agent.name.split(' ')[1]}
                                 </h3>
                                <p className="text-sm text-slate-500">{agent.role}</p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Contact Section */}
                <section id="contact" className="bg-slate-100 rounded-2xl p-12">
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                        <div className="text-center md:text-left">
                           <h2 className="text-3xl font-bold text-slate-900 mb-2">Ready to Innovate?</h2>
                           <p className="text-slate-600">Let's connect and discuss how we can build the future, together.</p>
                        </div>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-end">
                             <div className="flex items-center text-sm justify-center">
                                <Mail className="w-4 h-4 mr-2 text-slate-500" />
                                <span>s.soni.devops@email.com</span>
                            </div>
                            <div className="flex items-center text-sm justify-center">
                                <Phone className="w-4 h-4 mr-2 text-slate-500" />
                                <span>(555) 123-4567</span>
                            </div>
                        </div>
                     </div>
                </section>
                
            </main>
            
            <footer className="bg-white border-t mt-12">
              <div className="container mx-auto px-6 py-6 flex flex-col md:flex-row justify-between items-center text-sm text-slate-500">
                <p>
                    © {new Date().getFullYear()} <GlitchName onRestart={onRestart} isGlitching={isGlitching} /> Soni. All rights reserved.
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
    );
}
