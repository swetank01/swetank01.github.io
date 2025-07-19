
'use client';

import { useState, useEffect, useRef } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { DigitalRain } from './digital-rain';
import { HeroSection } from '../sections/hero-section';
import { GlitchText } from './glitch-text';

type SequenceStep = 'BOOTING' | 'USERNAME' | 'MEET_WHO' | 'ACCESS_GRANTED';

const bootMessages = [
  'Powering On...',
  'init 10...',
  'Awaiting connection...',
];

export function IntroSequence() {
  const [step, setStep] = useState<SequenceStep>('BOOTING');
  const [username, setUsername] = useState('');
  const [meetName, setMeetName] = useState('');
  const [error, setError] = useState('');
  const [showRain, setShowRain] = useState(false);
  const [bootLog, setBootLog] = useState<string[]>([]);
  const [progress, setProgress] = useState(0);

  const usernameInputRef = useRef<HTMLInputElement>(null);
  const meetInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (step === 'BOOTING') {
      let messageIndex = 0;
      const bootInterval = setInterval(() => {
        if (messageIndex < bootMessages.length) {
          setBootLog(prev => [...prev, bootMessages[messageIndex]]);
          messageIndex++;
        } else {
          clearInterval(bootInterval);
          setTimeout(() => setStep('USERNAME'), 500);
        }
      }, 700);

      const progressInterval = setInterval(() => {
        setProgress(prev => {
          if (prev >= 100) {
            clearInterval(progressInterval);
            return 100;
          }
          return prev + Math.random() * 10;
        });
      }, 150);

      return () => {
        clearInterval(bootInterval);
        clearInterval(progressInterval);
      };
    }
  }, [step]);

  useEffect(() => {
    if (step === 'USERNAME') {
      usernameInputRef.current?.focus();
    } else if (step === 'MEET_WHO') {
      meetInputRef.current?.focus();
    }
  }, [step]);

  const handleUsernameSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (username.trim()) {
      setShowRain(true);
      setStep('MEET_WHO');
    }
  };

  const handleMeetSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (meetName.toLowerCase() === 'swetank') {
      setError('');
      setStep('ACCESS_GRANTED');
    } else {
      setError('Access Denied. Verification failed.');
      setMeetName('');
    }
  };

  const renderBooting = () => (
    <div className="w-full max-w-md p-4 text-primary font-code">
      {bootLog.map((msg, i) => (
        <div key={i} className="mb-2 text-lg">
          <GlitchText text={msg} />
        </div>
      ))}
      <div className="mt-4">
        <div className="w-full bg-primary/10 border border-primary/20 h-6 p-1">
          <div
            className="bg-primary/50 h-full"
            style={{ width: `${Math.min(progress, 100)}%` }}
          />
        </div>
        <p className="text-center mt-2">
            <GlitchText text={`[ ${Math.floor(Math.min(progress, 100))}% ]`} />
        </p>
      </div>
    </div>
  );

  return (
    <div className="w-full h-screen bg-black font-code">
      {showRain && <DigitalRain isMatrix a11y={false} />}
      
      <div className="relative z-10 w-full h-full flex items-center justify-center">
        {step === 'BOOTING' && renderBooting()}

        {step === 'USERNAME' && (
          <Card className="w-full max-w-md bg-black/50 border-primary/20 p-4 text-primary animate-fade-in-up">
            <CardContent className="p-2">
              <form onSubmit={handleUsernameSubmit}>
                <label htmlFor="username" className="block text-lg mb-4">
                  <GlitchText text="who are you?" />
                </label>
                <Input
                  ref={usernameInputRef}
                  id="username"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="bg-transparent border-primary/50 text-primary text-lg"
                  autoComplete="off"
                />
                <Button type="submit" variant="ghost" className="mt-4 w-full text-primary hover:bg-primary/10 hover:text-primary">
                  Proceed
                </Button>
              </form>
            </CardContent>
          </Card>
        )}

        {step === 'MEET_WHO' && (
          <Card className="w-full max-w-md bg-black/50 border-primary/20 p-4 text-primary animate-fade-in-up">
            <CardContent className="p-2">
              <form onSubmit={handleMeetSubmit}>
                <label htmlFor="meet" className="block text-lg mb-4">
                  <GlitchText text="Who do you want to meet?" />
                </label>
                <Input
                  ref={meetInputRef}
                  id="meet"
                  type="text"
                  value={meetName}
                  onChange={(e) => setMeetName(e.target.value)}
                  className="bg-transparent border-primary/50 text-primary text-lg"
                  autoComplete="off"
                />
                <Button type="submit" variant="ghost" className="mt-4 w-full text-primary hover:bg-primary/10 hover:text-primary">
                  Authenticate
                </Button>
                {error && (
                  <p className="mt-4 text-red-500 text-center">
                    <GlitchText text={error} />
                  </p>
                )}
              </form>
            </CardContent>
          </Card>
        )}

        {step === 'ACCESS_GRANTED' && <HeroSection />}
      </div>
    </div>
  );
}
