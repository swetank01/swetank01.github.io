
'use client';

import React, { useState, useEffect, useRef } from 'react';

interface GlitchTextProps {
  text: string;
  delay?: number;
}

const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+-=[]{}|;:,.<>?/`~';

export function GlitchText({ text, delay = 50 }: GlitchTextProps) {
  const [displayText, setDisplayText] = useState('');
  const [isAnimating, setIsAnimating] = useState(true);
  const animationFrameRef = useRef<number>();

  useEffect(() => {
    let frame = 0;
    const targetText = text || '';
    
    const animate = () => {
      frame++;
      let newText = '';
      for (let i = 0; i < targetText.length; i++) {
        const char = targetText[i];
        if (frame > i * 2) {
          newText += char;
        } else {
          newText += characters[Math.floor(Math.random() * characters.length)];
        }
      }
      setDisplayText(newText);
      
      if (newText !== targetText) {
        animationFrameRef.current = requestAnimationFrame(animate);
      } else {
        setIsAnimating(false);
      }
    };
    
    const timeoutId = setTimeout(() => {
        animationFrameRef.current = requestAnimationFrame(animate);
    }, delay);

    return () => {
      clearTimeout(timeoutId);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [text, delay]);
  
  return <>{displayText}</>;
}
