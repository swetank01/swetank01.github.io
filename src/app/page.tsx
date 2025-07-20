
'use client';

import { useState, useEffect } from 'react';
import { IntroSequence } from '@/components/shared/intro-sequence';
import { BluePillPage } from '@/components/shared/blue-pill-page';
import { GlitchText } from '@/components/shared/glitch-text';
import { cn } from '@/lib/utils';

type AppState = 'corporate' | 'hackerverse' | 'exiting';

export default function Home() {
  const [appState, setAppState] = useState<AppState>('corporate');
  const [isExiting, setIsExiting] = useState(false);

  const enterHackerverse = () => {
    setIsExiting(false);
    setAppState('hackerverse');
  };

  const restartExperience = () => {
    setIsExiting(true);
    setTimeout(() => {
        setAppState('corporate');
    }, 1500) // Match animation duration
  }

  if (appState === 'corporate') {
    return <BluePillPage onEnterHackerverse={enterHackerverse} />;
  }
  
  if (appState === 'hackerverse') {
      return <IntroSequence onRestart={restartExperience} />;
  }

  if (appState === 'exiting') {
    return (
        <div className={cn("w-full h-screen bg-black font-code text-primary flex items-center justify-center", {
            "animate-glitch-screen-to-white": isExiting
        })}>
            <div className="w-full max-w-md p-4 text-center">
                <GlitchText text="Escaping Reality... redirecting back to the Matrix" />
            </div>
        </div>
    );
  }

  return null;
}
