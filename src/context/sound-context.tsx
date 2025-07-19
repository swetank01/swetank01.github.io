'use client';

import React, { createContext, useState, useCallback, useRef, useEffect } from 'react';

type SoundType = 'keypress' | 'hover' | 'click';

interface SoundContextType {
  isSoundEnabled: boolean;
  toggleSound: () => void;
  playKeypressSound: () => void;
  playHoverSound: () => void;
  playClickSound: () => void;
}

export const SoundContext = createContext<SoundContextType | undefined>(undefined);

export const SoundProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isSoundEnabled, setIsSoundEnabled] = useState(true);
  const audioContextRef = useRef<AudioContext | null>(null);

  useEffect(() => {
    // Initialize AudioContext on the client side
    audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
    
    return () => {
        audioContextRef.current?.close();
    }
  }, []);
  
  const playSound = useCallback((type: SoundType) => {
    if (!isSoundEnabled || !audioContextRef.current) return;

    const audioCtx = audioContextRef.current;
    if (audioCtx.state === 'suspended') {
        audioCtx.resume();
    }

    const oscillator = audioCtx.createOscillator();
    const gainNode = audioCtx.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioCtx.destination);
    
    gainNode.gain.setValueAtTime(0, audioCtx.currentTime);
    gainNode.gain.linearRampToValueAtTime(0.1, audioCtx.currentTime + 0.01);
    
    switch (type) {
      case 'keypress':
        oscillator.type = 'sine';
        oscillator.frequency.setValueAtTime(Math.random() * 200 + 600, audioCtx.currentTime);
        break;
      case 'hover':
        oscillator.type = 'triangle';
        oscillator.frequency.setValueAtTime(800, audioCtx.currentTime);
        break;
      case 'click':
        oscillator.type = 'square';
        oscillator.frequency.setValueAtTime(440, audioCtx.currentTime);
        break;
    }
    
    oscillator.start(audioCtx.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.00001, audioCtx.currentTime + 0.05);
    oscillator.stop(audioCtx.currentTime + 0.05);

  }, [isSoundEnabled]);

  const toggleSound = () => {
    setIsSoundEnabled(prev => !prev);
  };
  
  const playKeypressSound = useCallback(() => playSound('keypress'), [playSound]);
  const playHoverSound = useCallback(() => playSound('hover'), [playSound]);
  const playClickSound = useCallback(() => playSound('click'), [playSound]);

  return (
    <SoundContext.Provider value={{ isSoundEnabled, toggleSound, playKeypressSound, playHoverSound, playClickSound }}>
      {children}
    </SoundContext.Provider>
  );
};
