
'use client';

import { useState, useEffect } from 'react';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../ui/card';
import { Briefcase, Mail, Phone, Users } from 'lucide-react';

const corporateProjects = [
    { title: 'Q3 Synergy Dashboard', description: 'Leveraged agile frameworks to provide a robust synopsis for high-level overviews.' },
    { title: 'Enterprise Resource Planning Portal', description: 'Iterative approaches to corporate strategy foster collaborative thinking to further the overall value proposition.' },
    { title: 'Cloud-Native Integration Platform', description: 'Organically grow the holistic world view of disruptive innovation via workplace diversity and empowerment.' },
];

export function BluePillPage({ onRestart }: { onRestart: () => void }) {
    const [showGlitch, setShowGlitch] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => setShowGlitch(true), 5000); // Glitch appears after 5 seconds
        return () => clearTimeout(timer);
    }, []);

    return (
        <div className="w-full h-screen bg-gray-100 text-gray-800 font-sans animate-fade-in-up">
            <nav className="bg-white border-b shadow-sm">
                <div className="container mx-auto px-4 py-3 flex justify-between items-center">
                    <h1 className="text-2xl font-bold text-blue-700">Swetank Kumar</h1>
                    <div className="flex gap-4 items-center">
                        <a href="#about" className="text-gray-600 hover:text-blue-700">About</a>
                        <a href="#projects" className="text-gray-600 hover:text-blue-700">Projects</a>
                        <a href="#contact" className="text-gray-600 hover:text-blue-700">Contact</a>
                    </div>
                </div>
            </nav>

            <main className="container mx-auto p-8">
                <section id="about" className="text-center py-16">
                    <h2 className="text-4xl font-semibold mb-4">Solutions-Oriented DevOps Professional</h2>
                    <p className="max-w-3xl mx-auto text-lg text-gray-600">
                        Passionate about optimizing workflows and enhancing team productivity through innovative and streamlined solutions.
                    </p>
                </section>

                <section id="projects" className="py-16 bg-white rounded-lg shadow-md">
                    <h2 className="text-3xl font-semibold text-center mb-8">Key Initiatives</h2>
                    <div className="grid md:grid-cols-3 gap-8 px-8">
                        {corporateProjects.map((proj, i) => (
                            <Card key={i} className="bg-gray-50">
                                <CardHeader>
                                    <div className="flex items-center gap-3">
                                        <Briefcase className="w-6 h-6 text-blue-600" />
                                        <CardTitle className="text-xl text-gray-800">{proj.title}</CardTitle>
                                    </div>
                                </CardHeader>
                                <CardContent>
                                    <CardDescription>{proj.description}</CardDescription>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </section>

                <section id="contact" className="text-center py-16">
                     <h2 className="text-3xl font-semibold mb-8">Get In Touch</h2>
                     <div className="flex justify-center gap-8 text-gray-700">
                        <div className="flex items-center gap-2"><Mail className="w-5 h-5" /> s.kumar@corporate.net</div>
                        <div className="flex items-center gap-2"><Phone className="w-5 h-5" /> (555) 123-4567</div>
                        <div className="flex items-center gap-2"><Users className="w-5 h-5" /> Team-Player</div>
                     </div>
                </section>
            </main>
            
            <footer className="text-center p-4 text-sm text-gray-500 border-t">
                © {new Date().getFullYear()} Swetank Kumar. All rights reserved.
                {showGlitch && (
                    <span 
                        onClick={onRestart}
                        className="absolute bottom-4 right-4 text-red-500 font-mono cursor-pointer animate-pulse"
                        style={{ animation: 'blink-cursor 1s infinite' }}
                    >
                        _
                    </span>
                )}
            </footer>
        </div>
    );
}
