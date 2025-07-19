'use client';

import { useState, useEffect, useRef } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { DigitalRain } from './digital-rain';
import { HeroSection } from '../sections/hero-section';
import { GlitchText } from './glitch-text';
import { YinYangIcon } from './yin-yang-icon';

type SequenceStep = 'BOOTING' | 'CHOICE' | 'BLUE_PILL_OUTCOME' | 'MEET_WHO' | 'ACCESS_GRANTED' | 'YIN_YANG';

const bootMessages = [
  'Powering On...',
  'init 10...',
  'Awaiting connection...',
];

export function IntroSequence() {
  const [step, setStep] = useState<SequenceStep>('BOOTING');
  const [meetName, setMeetName] = useState('');
  const [error, setError] = useState('');
  const [showRain, setShowRain] = useState(false);
  const [bootLog, setBootLog] = useState<string[]>([]);
  const [progress, setProgress] = useState(0);
  const [isExiting, setIsExiting] = useState(false);

  const meetInputRef = useRef<HTMLInputElement>(null);

  const startBootSequence = () => {
    setStep('BOOTING');
    setShowRain(false);
    setBootLog([]);
    setProgress(0);
    setIsExiting(false);
    let messageIndex = 0;
    const bootInterval = setInterval(() => {
      if (messageIndex < bootMessages.length) {
        setBootLog(prev => [...prev, bootMessages[messageIndex]]);
        messageIndex++;
      } else {
        clearInterval(bootInterval);
        setTimeout(() => setStep('CHOICE'), 500);
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
  };
  
  useEffect(() => {
    startBootSequence();
  }, []);

  useEffect(() => {
    if (step === 'MEET_WHO') {
      meetInputRef.current?.focus();
    }
  }, [step]);

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

  const handleRedPillClick = () => {
    setShowRain(true);
    setStep('MEET_WHO');
  };

  const handleBluePillClick = () => {
    setStep('BLUE_PILL_OUTCOME');
    setTimeout(() => {
        startBootSequence();
    }, 4000)
  };

  const handleExit = () => {
    setIsExiting(true);
    // After animation, go to Yin Yang screen.
    setTimeout(() => {
      setStep('YIN_YANG');
      // Hide rain *after* the zoom animation completes
      setShowRain(false);
    }, 1500); // This duration should match the zoom-out animation
  }

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

  const renderChoice = () => (
    <Card className="w-full max-w-md bg-black/50 border-primary/20 p-8 text-primary animate-fade-in-up text-center">
        <CardContent className="p-2">
            <p className="text-lg mb-6">
                <GlitchText text="The system is online. The choice is yours." />
            </p>
            <div className="flex justify-around gap-4">
                <Button 
                    onClick={handleBluePillClick}
                    className="w-1/2 bg-blue-600/20 text-blue-400 border-2 border-blue-500/50 hover:bg-blue-600/40 hover:text-blue-300 hover:shadow-[0_0_15px_rgba(59,130,246,0.5)] transition-all duration-300">
                    Take the Blue Pill
                </Button>
                <Button 
                    onClick={handleRedPillClick}
                    className="w-1/2 bg-red-600/20 text-red-400 border-2 border-red-500/50 hover:bg-red-600/40 hover:text-red-300 hover:shadow-[0_0_15px_rgba(239,68,68,0.5)] transition-all duration-300">
                    Take the Red Pill
                </Button>
            </div>
        </CardContent>
    </Card>
  );

  const renderBluePillOutcome = () => (
     <div className="w-full max-w-lg p-4 text-center font-code text-blue-400 animate-fade-in-up">
        <p className="text-lg">
            <GlitchText text="The story ends. You wake up in your bed and believe whatever you want to believe." />
        </p>
        <p className="text-sm mt-4 text-muted-foreground">
            <GlitchText text="Re-initializing sequence..." />
        </p>
    </div>
  );
  
  const renderYinYang = () => (
    <div className="w-full h-full flex items-center justify-center fade-in cursor-pointer" onClick={startBootSequence}>
      <YinYangIcon className="w-24 h-24 text-primary hover:text-white hover:rotate-180 transition-all duration-1000" />
    </div>
  );
  
  const renderMeetWho = () => (
    <Card className="w-full max-w-md bg-black/50 border-primary/20 p-4 text-primary animate-fade-in-up">
      <CardContent className="p-2">
        <form onSubmit={handleMeetSubmit}>
          <label htmlFor="meet" className="block text-lg mb-4">
            <GlitchText text="How deep does the rabbit-hole go? Who do you want to meet?" />
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
  );

  const renderContent = () => {
    if (step === 'YIN_YANG') return renderYinYang();

    let content;
    switch(step) {
      case 'BOOTING':
        content = renderBooting();
        break;
      case 'CHOICE':
        content = renderChoice();
        break;
      case 'BLUE_PILL_OUTCOME':
        content = renderBluePillOutcome();
        break;
      case 'MEET_WHO':
        content = renderMeetWho();
        break;
      case 'ACCESS_GRANTED':
        content = <HeroSection onExit={handleExit} />;
        break;
      default:
        content = null;
    }
    
    return (
       <div className={isExiting ? 'animate-zoom-out-fade' : ''}>
        {content}
       </div>
    );
  }

  return (
    <div className="w-full h-screen bg-black font-code">
      {showRain && <DigitalRain isMatrix a11y={false} />}
      <div className="relative z-10 w-full h-full flex items-center justify-center">
        {renderContent()}
      </div>
    </div>
  );
}
