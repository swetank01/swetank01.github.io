
'use client';

import { useState, useEffect, useRef } from 'react';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../ui/card';
import { Linkedin, Github, Download, CheckCircle, Mail, Phone } from 'lucide-react';
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

const GlitchName = ({ onRestart }: { onRestart: () => void }) => {
    const [name, setName] = useState('Swetank');
    const [isGlitching, setIsGlitching] = useState(false);
    const glitchIntervalRef = useRef<NodeJS.Timeout | null>(null);
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);

    const startGlitching = () => {
        setIsGlitching(true);
        let count = 0;
        glitchIntervalRef.current = setInterval(() => {
            setName(prev => (prev === 'Swetank' ? '$w3t@nK' : 'Swetank'));
            count++;
            if (count > 8) { // Glitch for about a second
                stopGlitching();
            }
        }, 100);
    };

    const stopGlitching = () => {
        if (glitchIntervalRef.current) {
            clearInterval(glitchIntervalRef.current);
            glitchIntervalRef.current = null;
        }
        setIsGlitching(false);
        setName('Swetank');
        // Schedule the next glitch
        timeoutRef.current = setTimeout(startGlitching, 3000 + Math.random() * 2000);
    };

    useEffect(() => {
        // Start the first glitch after a delay
        timeoutRef.current = setTimeout(startGlitching, 2000);

        return () => {
            if (glitchIntervalRef.current) clearInterval(glitchIntervalRef.current);
            if (timeoutRef.current) clearTimeout(timeoutRef.current);
        };
    }, []);

    return (
        <span
            className={cn('glitch-wrapper', { 'glitching': isGlitching })}
            onClick={onRestart}
        >
            <span className="glitch-text" data-text="$w3t@nK">
                {name}
            </span>
        </span>
    );
};


export function BluePillPage({ onRestart }: { onRestart: () => void }) {
    return (
        <div className="w-full h-screen bg-gray-50 text-gray-700 font-sans-corporate animate-fade-in-up overflow-y-auto">
            <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200">
                <div className="container mx-auto px-6 py-3 flex justify-between items-center">
                    <div>
                        <h1 className="text-xl font-bold text-gray-900"><GlitchName onRestart={onRestart} /> Soni</h1>
                        <p className="text-sm text-gray-500">Senior DevOps Engineer</p>
                    </div>
                    <nav className="flex items-center gap-2">
                        <Button variant="outline" size="sm" className="border-gray-300 hover:bg-gray-100">
                            <Download className="mr-2 h-4 w-4" /> Download Resume
                        </Button>
                        <a href="#" className="text-gray-500 hover:text-gray-900 p-2">
                            <Linkedin className="h-5 w-5" />
                        </a>
                        <a href="#" className="text-gray-500 hover:text-gray-900 p-2">
                            <Github className="h-5 w-5" />
                        </a>
                    </nav>
                </div>
            </header>

            <main className="container mx-auto px-6 py-12">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2">
                        {/* About Me Section */}
                        <Card className="mb-8 shadow-sm">
                            <CardHeader>
                                <CardTitle>About Me</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p>
                                    Results-driven Senior DevOps Engineer with over 8 years of experience in designing, implementing, and managing scalable, secure, and highly available cloud infrastructures. Proven ability to streamline development lifecycles and enhance operational efficiency through automation and best practices. 
                                </p>
                            </CardContent>
                        </Card>
                        
                        {/* Projects Section */}
                        <Card className="shadow-sm">
                            <CardHeader>
                                <CardTitle>Key Initiatives</CardTitle>
                                <CardDescription>Selected projects demonstrating my expertise in automation and cloud infrastructure.</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                {projects.map((project, i) => (
                                    <div key={i}>
                                        <h3 className="font-semibold text-gray-800">{project.title}</h3>
                                        <p className="text-sm text-gray-600">{project.description}</p>
                                    </div>
                                ))}
                            </CardContent>
                        </Card>
                    </div>
                    
                    <div>
                        {/* Core Competencies Section */}
                        <Card className="mb-8 shadow-sm">
                            <CardHeader>
                                <CardTitle>Core Competencies</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <ul className="space-y-2">
                                    {skills.map((skill, i) => (
                                        <li key={i} className="flex items-center text-sm">
                                            <CheckCircle className="w-4 h-4 mr-2 text-green-600" />
                                            {skill}
                                        </li>
                                    ))}
                                </ul>
                            </CardContent>
                        </Card>

                         {/* Contact Info Section */}
                        <Card className="shadow-sm">
                            <CardHeader>
                                <CardTitle>Contact Information</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-3">
                                <div className="flex items-center text-sm">
                                    <Mail className="w-4 h-4 mr-2 text-gray-500" />
                                    <span>s.soni.devops@email.com</span>
                                </div>
                                <div className="flex items-center text-sm">
                                    <Phone className="w-4 h-4 mr-2 text-gray-500" />
                                    <span>(555) 123-4567</span>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </main>
            
            <footer className="text-center p-6 text-sm text-gray-500 border-t bg-gray-100 mt-12">
                © {new Date().getFullYear()} <GlitchName onRestart={onRestart} /> Soni. All rights reserved.
            </footer>
        </div>
    );
}
