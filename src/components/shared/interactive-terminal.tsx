'use client';

import { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Circle } from 'lucide-react';

const commands = [
  { cmd: 'system.boot()', delay: 50, typed: true, prompt: true },
  { cmd: '...', delay: 100 },
  { cmd: 'Loading kernel modules...', delay: 100 },
  { cmd: 'System online. Welcome, user.', delay: 200 },
  { cmd: 'whoami', delay: 800, typed: true, prompt: true },
  { cmd: 'root', delay: 200 },
  { cmd: './connect -u Sw3t@nK', delay: 1000, typed: true, prompt: true },
  { cmd: 'Authenticating with public key...', delay: 100 },
  { cmd: 'Access Granted. Fetching profile...', delay: 200 },
  { cmd: 'PROFILE:', delay: 50 },
  { cmd: 'NAME: Sw3t@nK', delay: 50 },
  { cmd: 'ROLE: Creative DevOps Engineer', delay: 50 },
  { cmd: 'STATUS: Ready to build the future.', delay: 50 },
];

export function InteractiveTerminal() {
  const [lines, setLines] = useState<{ text: string; prompt?: boolean }[]>([]);
  const [isComplete, setIsComplete] = useState(false);
  const terminalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    let lineIndex = 0;

    const processCommand = () => {
      if (lineIndex >= commands.length) {
        setIsComplete(true);
        return;
      }

      const current = commands[lineIndex];

      if (current.typed) {
        let charIndex = 0;
        const lineText = current.cmd;
        
        setLines(prev => [...prev, { text: '', prompt: true }]);

        const typeChar = () => {
          if (charIndex < lineText.length) {
            setLines(prev => {
              const newLines = [...prev];
              newLines[newLines.length - 1].text += lineText[charIndex];
              return newLines;
            });
            charIndex++;
            timeoutId = setTimeout(typeChar, 30);
          } else {
            lineIndex++;
            timeoutId = setTimeout(processCommand, current.delay);
          }
        };
        typeChar();

      } else {
        setLines(prev => [...prev, { text: current.cmd, prompt: current.prompt }]);
        lineIndex++;
        timeoutId = setTimeout(processCommand, current.delay);
      }
    };

    timeoutId = setTimeout(processCommand, 500);

    return () => clearTimeout(timeoutId);
  }, []);

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [lines]);

  return (
    <Card className="w-full font-mono text-sm shadow-2xl shadow-primary/10">
      <CardHeader className="flex flex-row items-center justify-between p-2 border-b">
        <div className="flex gap-1.5">
          <Circle className="w-3 h-3 text-red-500 fill-current" />
          <Circle className="w-3 h-3 text-yellow-500 fill-current" />
          <Circle className="w-3 h-3 text-green-500 fill-current" />
        </div>
        <p className="text-xs text-muted-foreground">/bin/bash</p>
      </CardHeader>
      <CardContent className="p-4 h-80 overflow-y-auto" ref={terminalRef}>
        {lines.map((line, index) => (
          <div key={index} className="flex">
            {line.prompt && <span className="text-primary mr-2">$</span>}
            <p className="whitespace-pre-wrap">{line.text}</p>
          </div>
        ))}
        {isComplete && (
          <div className="flex">
            <span className="text-primary mr-2">$</span>
            <span className="w-2 h-4 bg-primary animate-pulse" />
          </div>
        )}
      </CardContent>
    </Card>
  );
}
