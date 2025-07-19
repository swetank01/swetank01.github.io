'use client';

import { useState } from 'react';
import { IntroSequence } from '@/components/shared/intro-sequence';
import { BluePillPage } from '@/components/shared/blue-pill-page';

type AppState = 'corporate' | 'hackerverse';

export default function Home() {
  const [appState, setAppState] = useState<AppState>('corporate');

  const enterHackerverse = () => {
    setAppState('hackerverse');
  };

  const restartExperience = () => {
    setAppState('corporate');
  }

  if (appState === 'corporate') {
    return <BluePillPage onEnterHackerverse={enterHackerverse} />;
  }

  return <IntroSequence onRestart={restartExperience} />;
}
