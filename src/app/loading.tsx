'use client';

import { useState, useEffect } from 'react';
import { Check, Loader2, HardDrive } from 'lucide-react';

const bootSequence = [
  { text: 'BIOS check.....................', status: 'done', delay: 100 },
  { text: 'Initializing kernel............', status: 'done', delay: 150 },
  { text: 'Loading core modules...........', status: 'done', delay: 200 },
  { text: 'Mounting virtual file system...', status: 'loading', delay: 250 },
  { text: 'File system mounted at /dev/root', status: 'done', delay: 300 },
  { text: 'Starting CI/CD Pipeline Engine.', status: 'loading', delay: 350 },
  { text: 'Pipeline Engine active.........', status: 'done', delay: 400 },
  { text: 'Connecting to network daemon...', status: 'loading', delay: 450 },
  { text: 'Network connection established.', status: 'done', delay: 500 },
  { text: 'Authenticating user: Sw3t@nK...', status: 'loading', delay: 550 },
  { text: 'Authentication successful......', status: 'done', delay: 600 },
  { text: 'Launching portfolio UI.........', status: 'loading', delay: 650 },
];

export default function Loading() {
  const [log, setLog] = useState<{ text: string; status: 'done' | 'loading' }[]>([]);

  useEffect(() => {
    let currentIndex = 0;
    const intervalId = setInterval(() => {
      if (currentIndex < bootSequence.length) {
        setLog(prevLog => [...prevLog, bootSequence[currentIndex]]);
        currentIndex++;
      } else {
        clearInterval(intervalId);
      }
    }, bootSequence[currentIndex]?.delay || 300);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="flex items-center justify-center min-h-screen bg-background font-code text-primary">
      <div className="w-full max-w-2xl p-4">
        <div className="flex items-center gap-2 mb-4">
            <HardDrive className="w-6 h-6 animate-pulse" />
            <h1 className="text-xl font-bold font-headline">SYSTEM BOOT</h1>
        </div>
        <div className="p-4 bg-black/50 border border-primary/20 rounded-lg h-96 overflow-y-auto">
          {log.map((line, index) => (
            <div key={index} className="flex items-center gap-2 text-sm">
              {line.status === 'done' ? (
                <Check className="w-4 h-4 text-green-400" />
              ) : (
                <Loader2 className="w-4 h-4 animate-spin" />
              )}
              <p className="text-foreground/80">{line.text}</p>
            </div>
          ))}
           <div className="flex items-center gap-2 text-sm mt-2">
                <Loader2 className="w-4 h-4 animate-spin" />
                <p className="text-foreground/80 animate-pulse">Waiting for UI thread...</p>
            </div>
        </div>
      </div>
    </div>
  );
}
