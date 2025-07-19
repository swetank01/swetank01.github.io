
'use client';

import { useState, useEffect, useRef } from 'react';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../ui/card';
import { Briefcase, Users, CheckCircle, Mail, Phone, Download } from 'lucide-react';
import { cn } from '@/lib/utils';

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
        // If a glitch is happening, don't start another one.
        if (isGlitching) return;
        
        setIsGlitching(true);

        // Reset the glitch after a short period (e.g., 1 second)
        if (glitchTimeoutRef.current) clearTimeout(glitchTimeoutRef.current);
        glitchTimeoutRef.current = setTimeout(() => {
            setIsGlitching(false);
        }, 1000);
    };

    const handleMouseMove = () => {
        // Clear the previous debounce timer
        if (debounceTimeoutRef.current) clearTimeout(debounceTimeoutRef.current);

        // Set a new random timer to trigger the glitch
        const randomDelay = Math.random() * 400 + 100; // between 100ms and 500ms
        debounceTimeoutRef.current = setTimeout(triggerGlitch, randomDelay);
    };


    useEffect(() => {
        // Cleanup timeouts on component unmount
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
            <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200">
                <div className="container mx-auto px-6 py-3 flex justify-between items-center">
                    <div>
                        <h1 className="text-xl font-bold text-slate-900">
                           <GlitchName onRestart={onRestart} isGlitching={isGlitching} /> Soni
                        </h1>
                        <p className="text-sm text-slate-500">Senior DevOps Engineer</p>
                    </div>
                    <nav className="flex items-center gap-2">
                        <Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-white">
                            <Download className="mr-2 h-4 w-4" /> Download Resume
                        </Button>
                    </nav>
                </div>
            </header>

            <main className="container mx-auto px-6 py-12">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2">
                        {/* About Me Section */}
                        <Card className="mb-8 shadow-sm border-slate-200">
                            <CardHeader>
                                <CardTitle className="text-slate-800">About Me</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p>
                                    Results-driven Senior DevOps Engineer with over 8 years of experience in designing, implementing, and managing scalable, secure, and highly available cloud infrastructures. Proven ability to streamline development lifecycles and enhance operational efficiency through automation and best practices.
                                </p>
                            </CardContent>
                        </Card>
                        
                        {/* Projects Section */}
                        <Card className="shadow-sm border-slate-200">
                            <CardHeader>
                                <CardTitle className="flex items-center text-slate-800"><Briefcase className="mr-2 h-5 w-5 text-blue-500" /> Key Initiatives</CardTitle>
                                <CardDescription>Selected projects demonstrating my expertise in automation and cloud infrastructure.</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                {projects.map((project, i) => (
                                    <div key={i}>
                                        <h3 className="font-semibold text-slate-800">{project.title}</h3>
                                        <p className="text-sm text-slate-600">{project.description}</p>
                                    </div>
                                ))}
                            </CardContent>
                        </Card>
                    </div>
                    
                    <div>
                        {/* Core Competencies Section */}
                        <Card className="mb-8 shadow-sm border-slate-200">
                            <CardHeader>
                                <CardTitle className="flex items-center text-slate-800"><Users className="mr-2 h-5 w-5 text-blue-500" /> Core Competencies</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <ul className="space-y-2">
                                    {skills.map((skill, i) => (
                                        <li key={i} className="flex items-center text-sm">
                                            <CheckCircle className="w-4 h-4 mr-2 text-green-500 flex-shrink-0" />
                                            {skill}
                                        </li>
                                    ))}
                                </ul>
                            </CardContent>
                        </Card>

                         {/* Contact Info Section */}
                        <Card className="shadow-sm border-slate-200">
                            <CardHeader>
                                <CardTitle className="text-slate-800">Contact Information</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-3">
                                <div className="flex items-center text-sm">
                                    <Mail className="w-4 h-4 mr-2 text-slate-500" />
                                    <span>s.soni.devops@email.com</span>
                                </div>
                                <div className="flex items-center text-sm">
                                    <Phone className="w-4 h-4 mr-2 text-slate-500" />
                                    <span>(555) 123-4567</span>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </main>
            
            <footer className="text-center p-6 text-sm text-slate-500 border-t bg-slate-100 mt-12">
                © {new Date().getFullYear()} <GlitchName onRestart={onRestart} isGlitching={isGlitching} /> Soni. All rights reserved.
            </footer>
        </div>
    );
}
