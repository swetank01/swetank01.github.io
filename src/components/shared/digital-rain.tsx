'use client';

import React, { useRef, useEffect } from 'react';

export function DigitalRain({ isMatrix = false, a11y = true }) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      columns = Math.floor(width / fontSize);
      drops = [];
      for (let i = 0; i < columns; i++) {
        drops[i] = 1;
      }
    };
    
    window.addEventListener('resize', handleResize);

    const characters = 'アァカサタナハマヤャラワガザダバパイィキシチニヒミリヰギジヂビピウゥクスツヌフムユュルグズブヅプエェケセテネヘメレヱゲゼデベペオォコソトノホモヨョロヲゴゾドボポヴッン0123456789';
    const charactersArray = characters.split('');
    const fontSize = 16;
    let columns = Math.floor(width / fontSize);
    let drops: number[] = [];

    for (let i = 0; i < columns; i++) {
      drops[i] = 1;
    }

    let animationFrameId: number;

    const draw = () => {
      ctx.fillStyle = isMatrix ? 'rgba(0, 0, 0, 0.05)' : 'rgba(38, 38, 38, 0.05)';
      ctx.fillRect(0, 0, width, height);
      
      ctx.fillStyle = isMatrix ? '#0F0' : '#BFFF00';
      ctx.font = `${fontSize}px monospace`;

      for (let i = 0; i < drops.length; i++) {
        const text = charactersArray[Math.floor(Math.random() * charactersArray.length)];
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);

        if (drops[i] * fontSize > height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }
      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
    };
  }, [isMatrix]);

  return (
    <canvas
      ref={canvasRef}
      className={`absolute top-0 left-0 w-full h-full z-0 ${isMatrix ? '' : 'opacity-20'}`}
      aria-hidden={a11y}
    />
  );
}
