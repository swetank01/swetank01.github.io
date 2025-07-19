
'use client';

import { useState, useEffect, useRef } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { DigitalRain } from './digital-rain';
import { HeroSection } from '../sections/hero-section';
import { GlitchText } from './glitch-text';

type SequenceStep = 'USERNAME' | 'MATRIX_RAIN' | 'MEET_WHO' | 'ACCESS_GRANTED';

export function IntroSequence() {
  const [step, setStep] = useState<SequenceStep>('USERNAME');
  const [username, setUsername] = useState('');
  const [meetName, setMeetName] = useState('');
  const [error, setError] = useState('');

  const usernameInputRef = useRef<HTMLInputElement>(null);
  const meetInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (step === 'USERNAME') {
      usernameInputRef.current?.focus();
    }
  }, [step]);

  const handleUsernameSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (username.trim()) {
      setStep('MATRIX_RAIN');
      setTimeout(() => {
        setStep('MEET_WHO');
        setTimeout(() => meetInputRef.current?.focus(), 100);
      }, 2000);
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

  if (step === 'ACCESS_GRANTED') {
    return <HeroSection />;
  }

  if (step === 'MATRIX_RAIN') {
    return (
      <div className="absolute inset-0 z-50 bg-black">
        <DigitalRain isMatrix a11y={false} />
      </div>
    );
  }

  return (
    <div className="w-full h-screen flex items-center justify-center bg-black font-code">
      {step === 'USERNAME' && (
        <Card className="w-full max-w-md bg-black/50 border-primary/20 p-4 text-primary animate-fade-in-up">
          <CardContent className="p-2">
            <form onSubmit={handleUsernameSubmit}>
              <label htmlFor="username" className="block text-lg mb-4">
                <GlitchText text="Enter your designation:" />
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
    </div>
  );
}
