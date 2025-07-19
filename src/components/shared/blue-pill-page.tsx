
'use client';

import { useState } from 'react';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../ui/card';
import { ArrowRight, CheckCircle, BarChart, ShieldCheck, Cpu, Users } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { cn } from '@/lib/utils';

const features = [
    { 
        icon: BarChart, 
        title: 'AI-Powered Insights', 
        description: 'Leverage machine learning to unlock actionable data points and drive business growth.' 
    },
    { 
        icon: Cpu, 
        title: 'Streamlined Scalability', 
        description: 'Our elastic infrastructure grows with you, ensuring seamless performance at any scale.' 
    },
    { 
        icon: ShieldCheck, 
        title: 'Enterprise-Grade Security', 
        description: 'Robust, multi-layered security protocols to protect your most valuable assets.' 
    },
];

const team = [
    { name: 'Jennifer Hale', role: 'Chief Executive Officer', avatar: 'https://placehold.co/100x100.png', hint: 'woman portrait' },
    { name: 'Mark Meer', role: 'Chief Financial Officer', avatar: 'https://placehold.co/100x100.png', hint: 'man portrait' },
    { name: 'Sw3t@nK', role: 'Chief Visionary Officer', avatar: 'https://placehold.co/100x100.png', hint: 'person portrait glitch', isGlitched: true },
    { name: 'Ali Hillis', role: 'Head of People', avatar: 'https://placehold.co/100x100.png', hint: 'woman portrait' },
];

export function BluePillPage({ onRestart }: { onRestart: () => void }) {
    const [hoveredGlitch, setHoveredGlitch] = useState(false);

    return (
        <div className="w-full h-screen bg-white text-gray-800 font-sans-corporate animate-fade-in-up overflow-y-auto">
            <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200">
                <div className="container mx-auto px-6 py-3 flex justify-between items-center">
                    <h1 className="text-2xl font-bold text-gray-900">InnovateX</h1>
                    <nav className="hidden md:flex items-center gap-6">
                        <a href="#" className="text-gray-600 hover:text-gray-900">Solutions</a>
                        <a href="#" className="text-gray-600 hover:text-gray-900">Platform</a>
                        <a href="#" className="text-gray-600 hover:text-gray-900">About Us</a>
                    </nav>
                    <Button className="bg-gray-900 text-white hover:bg-gray-700">
                        Request a Demo <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                </div>
            </header>

            <main className="container mx-auto px-6 py-16">
                <section className="text-center py-20">
                    <h2 className="text-5xl md:text-6xl font-extrabold text-gray-900 mb-4 leading-tight">
                        Pioneering Synergistic Futures
                    </h2>
                    <p className="max-w-2xl mx-auto text-lg text-gray-600 mb-8">
                        We empower enterprises to seamlessly integrate next-generation paradigms, fostering a new era of digital transformation.
                    </p>
                    <div className="flex justify-center gap-4">
                        <Button size="lg" className="bg-gray-900 text-white hover:bg-gray-700 shadow-lg">Get Started</Button>
                        <Button size="lg" variant="outline" className="border-gray-300 hover:bg-gray-100">Contact Sales</Button>
                    </div>
                </section>

                <section className="py-16">
                    <p className="text-center text-sm font-semibold text-gray-500 uppercase tracking-wider">Trusted by the world's most innovative companies</p>
                    <div className="mt-8 flex justify-center flex-wrap gap-x-12 gap-y-4 text-gray-400 font-bold text-xl">
                        <span>GlobalTrans</span>
                        <span>QuantumLeap</span>
                        <span>EcoSolutions</span>
                        <span>NexusData</span>
                        <span>ApexIndustries</span>
                    </div>
                </section>

                <section id="features" className="py-20 bg-gray-50 rounded-xl">
                    <div className="text-center mb-12">
                         <h3 className="text-4xl font-bold text-gray-900">A Platform Built for Tomorrow</h3>
                         <p className="text-lg text-gray-600 mt-2">Everything you need to stay ahead of the curve.</p>
                    </div>
                    <div className="grid md:grid-cols-3 gap-8">
                        {features.map((feature, i) => (
                            <Card key={i} className="bg-white border-gray-200 shadow-sm hover:shadow-lg transition-shadow">
                                <CardHeader>
                                    <div className="bg-gray-100 rounded-lg w-12 h-12 flex items-center justify-center mb-4">
                                        <feature.icon className="w-6 h-6 text-gray-700" />
                                    </div>
                                    <CardTitle className="text-xl font-semibold text-gray-900">{feature.title}</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-gray-600">{feature.description}</p>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </section>

                <section id="team" className="py-20">
                     <div className="text-center mb-12">
                         <h3 className="text-4xl font-bold text-gray-900">Meet Our Leadership</h3>
                         <p className="text-lg text-gray-600 mt-2">The visionaries behind our success.</p>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                        {team.map((member) => (
                            <div 
                                key={member.name} 
                                className={cn(
                                    "text-center cursor-pointer group", 
                                    member.isGlitched && "relative"
                                )}
                                onClick={member.isGlitched ? onRestart : undefined}
                                onMouseEnter={member.isGlitched ? () => setHoveredGlitch(true) : undefined}
                                onMouseLeave={member.isGlitched ? () => setHoveredGlitch(false) : undefined}
                            >
                                <Avatar className="w-24 h-24 mx-auto mb-4 border-4 border-transparent group-hover:border-gray-300 transition-colors">
                                    <AvatarImage src={member.avatar} alt={member.name} data-ai-hint={member.hint} />
                                    <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                                </Avatar>
                                <h4 className="font-semibold text-lg text-gray-900">{member.name}</h4>
                                <p className="text-gray-500">{member.role}</p>
                                {member.isGlitched && hoveredGlitch && (
                                    <span 
                                        className="absolute inset-0 flex items-center justify-center text-red-500 font-mono text-xs animate-pulse bg-black/20"
                                    >
                                        [ WAKE UP ]
                                    </span>
                                )}
                            </div>
                        ))}
                    </div>
                </section>
            </main>
            
            <footer className="text-center p-6 text-sm text-gray-500 border-t bg-gray-50">
                © {new Date().getFullYear()} InnovateX Corporation. All rights reserved.
            </footer>
        </div>
    );
}
