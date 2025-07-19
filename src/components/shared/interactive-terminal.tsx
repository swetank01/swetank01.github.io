'use client';

import { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Circle, Volume2, VolumeX } from 'lucide-react';
import { useSound } from '@/hooks/use-sound';

const initialCommands = [
  { cmd: 'system.boot()', delay: 50, typed: true, prompt: true },
  { cmd: '...', delay: 100 },
  { cmd: 'Loading kernel modules...', delay: 100 },
  { cmd: 'System online. Welcome, user.', delay: 200 },
  { cmd: './connect -u Sw3t@nK', delay: 1000, typed: true, prompt: true },
  { cmd: 'Authenticating with public key...', delay: 100 },
  { cmd: 'Access Granted. Type `help` to see available commands.', delay: 200 },
];

const projects = [
  'scalable-kubernetes-cluster.md',
  'secure-vpc-networking.md',
  'high-availability-database.md',
];

const skills = [
    'Kubernetes',
    'AWS',
    'Terraform',
    'Docker',
    'CI/CD (Jenkins, GitHub Actions)',
    'Python',
    'Ansible',
    'Prometheus & Grafana',
    'Linux System Administration',
    'Network Security'
];

const experience = [
    { title: 'Senior DevOps Engineer', company: 'Cyberdyne Systems', duration: '2021-Present'},
    { title: 'DevOps Engineer', company: 'Stark Industries', duration: '2018-2021'},
    { title: 'Junior System Administrator', company: 'Wayne Enterprises', duration: '2016-2018'},
];


export function InteractiveTerminal() {
  const [lines, setLines] = useState<{ text: string; prompt?: boolean }[]>([]);
  const [isAnimating, setIsAnimating] = useState(true);
  const [inputValue, setInputValue] = useState('');
  const terminalRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const { isSoundEnabled, toggleSound, playKeypressSound } = useSound();

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    let lineIndex = 0;

    const processCommand = () => {
      if (lineIndex >= initialCommands.length) {
        setIsAnimating(false);
        setTimeout(() => inputRef.current?.focus(), 100);
        return;
      }

      const current = initialCommands[lineIndex];

      if (current.typed) {
        let charIndex = 0;
        const lineText = current.cmd;
        
        setLines(prev => [...prev, { text: '', prompt: true }]);

        const typeChar = () => {
          if (charIndex < lineText.length) {
            playKeypressSound();
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
  }, [playKeypressSound]);

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [lines]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    playKeypressSound();
    setInputValue(e.target.value);
  };

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    const command = inputValue.trim();
    let newLines = [...lines, { text: command, prompt: true }];
    
    const [cmd, ...args] = command.split(' ');

    switch(cmd) {
      case 'help':
        newLines.push({ text: 'Available commands:'});
        newLines.push({ text: '  whoami       - Display user information'});
        newLines.push({ text: '  skills       - List core competencies'});
        newLines.push({ text: '  experience   - Show professional experience'});
        newLines.push({ text: '  projects     - List featured projects'});
        newLines.push({ text: '  contact      - Display contact information'});
        newLines.push({ text: '  clear        - Clear the terminal screen'});
        break;
      case 'whoami':
        newLines.push({ text: 'user: Sw3t@nK' });
        newLines.push({ text: 'role: Creative DevOps Engineer' });
        newLines.push({ text: 'status: Ready to build the future.' });
        break;
      case 'skills':
        newLines.push({ text: 'Core Competencies:' });
        skills.forEach(s => newLines.push({ text: `  - ${s}`}));
        break;
      case 'experience':
        newLines.push({ text: 'Professional Experience:' });
        experience.forEach(e => newLines.push({ text: `  - ${e.title} @ ${e.company} (${e.duration})`}));
        break;
      case 'projects':
        newLines.push({ text: 'Featured Projects:' });
        projects.forEach(p => newLines.push({ text: `  - ${p}` }));
        break;
      case 'contact':
        newLines.push({ text: 'Get in touch:' });
        newLines.push({ text: '  - Email: [REDACTED] - Please use the form on the full site.' });
        newLines.push({ text: '  - LinkedIn: linkedin.com/in/[REDACTED]' });
        newLines.push({ text: '  - GitHub: github.com/[REDACTED]' });
        break;
      case 'cat':
        const filename = args[0];
        if (projects.includes(filename)) {
           newLines.push({ text: `Reading ${filename}:` });
           if (filename === 'scalable-kubernetes-cluster.md') {
             newLines.push({ text: 'A multi-cloud, auto-scaling Kubernetes setup for high-traffic applications using Terraform, Istio, and Jenkins.' });
           } else if (filename === 'secure-vpc-networking.md') {
             newLines.push({ text: 'Secure AWS VPC with public/private subnets, NAT Gateways, and monitoring via Flow Logs and GuardDuty.' });
           } else if (filename === 'high-availability-database.md') {
             newLines.push({ text: 'Fault-tolerant PostgreSQL cluster with Patroni, Ansible for automated failover and replication.' });
           }
        } else {
          newLines.push({ text: `cat: ${filename}: No such file or directory` });
        }
        break;
      case 'clear':
        setLines([]);
        setInputValue('');
        return; 
      default:
        newLines.push({ text: `command not found: ${command}` });
    }

    setLines(newLines);
    setInputValue('');
  };

  const handleClick = () => {
    inputRef.current?.focus();
  }

  return (
    <Card className="w-full h-full font-mono text-sm shadow-2xl shadow-primary/10 bg-black/70 backdrop-blur-sm border-primary/20 flex flex-col">
      <CardHeader className="flex flex-row items-center justify-between p-2 border-b border-primary/20 flex-shrink-0">
        <div className="flex gap-1.5">
          <Circle className="w-3 h-3 text-red-500 fill-current" />
          <Circle className="w-3 h-3 text-yellow-500 fill-current" />
          <Circle className="w-3 h-3 text-green-500 fill-current" />
        </div>
        <p className="text-xs text-muted-foreground">/bin/Sw3t@nK</p>
        <button onClick={toggleSound} className="text-muted-foreground hover:text-primary">
            {isSoundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
            <span className="sr-only">Toggle Sound</span>
        </button>
      </CardHeader>
      <CardContent className="p-4 overflow-y-auto flex-grow" ref={terminalRef} onClick={handleClick}>
        {lines.map((line, index) => (
          <div key={index} className="flex">
            {line.prompt && <span className="text-primary mr-2 flex-shrink-0">$</span>}
            <p className="whitespace-pre-wrap break-words">{line.text}</p>
          </div>
        ))}
        {!isAnimating && (
          <form onSubmit={handleFormSubmit} className="flex">
            <label htmlFor="terminal-input" className="text-primary mr-2 flex-shrink-0">$</label>
            <input
              id="terminal-input"
              ref={inputRef}
              type="text"
              value={inputValue}
              onChange={handleInputChange}
              autoComplete="off"
              autoCapitalize="off"
              autoCorrect="off"
              className="bg-transparent border-none outline-none text-foreground w-full p-0"
            />
          </form>
        )}
      </CardContent>
    </Card>
  );
}
