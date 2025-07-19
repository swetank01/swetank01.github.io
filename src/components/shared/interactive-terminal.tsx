
'use client';

import { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Circle, Volume2, VolumeX } from 'lucide-react';
import { useSound } from '@/hooks/use-sound';
import { generateMissionLog } from '@/ai/flows/generate-log-flow';

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
  { title: "Project Cerberus", description: "A multi-headed security scanner that automates vulnerability detection across cloud environments. Integrates with Slack for real-time alerts." },
  { title: "Nexus Pipeline", description: "A dynamic CI/CD pipeline generator for microservices. Users define a simple YAML, and Nexus creates complex Jenkinsfiles on the fly." },
  { title: "Automated GitOps", description: "An ArgoCD-based GitOps framework for managing staging and production Kubernetes clusters, ensuring environment parity." },
];

const skills = [
    'Kubernetes',
    'AWS',
    'Terraform',
    'Docker',
    'CI/CD (Jenkins, GitHub Actions)',
    'Python & Go',
    'Ansible',
    'Prometheus & Grafana',
    'Linux & Networking',
    'Security Engineering'
];

const experience = [
    { title: 'Senior DevOps Engineer', company: 'Cyberdyne Systems', duration: '2021-Present'},
    { title: 'DevOps Engineer', company: 'Stark Industries', duration: '2018-2021'},
    { title: 'Junior System Administrator', company: 'Wayne Enterprises', duration: '2016-2018'},
];

const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export function InteractiveTerminal() {
  const [lines, setLines] = useState<{ text: string; prompt?: boolean }[]>([]);
  const [isAnimating, setIsAnimating] = useState(true);
  const [isCommandRunning, setIsCommandRunning] = useState(false);
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

  const runCommand = async (command: string) => {
    setIsCommandRunning(true);
    let newLines = [...lines, { text: command, prompt: true }];
    setLines([...newLines]);

    const [cmd] = command.split(' ');

    const commandProcess = async (title: string, data: string[]) => {
        newLines.push({ text: `> Running script for '${cmd}'...` });
        newLines.push({ text: `> Connecting to secure datastore...` });
        setLines([...newLines]);
        await sleep(300);

        newLines.push({ text: `> Decrypting records...` });
        setLines([...newLines]);

        const progressLineIndex = newLines.length;
        newLines.push({ text: `[${' '.repeat(20)}] 0%`});
        for (let i = 0; i <= 20; i++) {
            await sleep(40);
            const progress = `[${'█'.repeat(i)}${' '.repeat(20-i)}] ${i*5}%`;
            newLines[progressLineIndex] = { text: progress };
            setLines([...newLines]);
        }
        await sleep(200);

        newLines[progressLineIndex] = { text: `> Records decrypted successfully.` };
        newLines.push({ text: `> Rendering output...` });
        newLines.push({ text: `\n--- ${title} ---` });
        data.forEach(item => newLines.push({ text: `  - ${item}`}));
        newLines.push({ text: `--- END ---` });
        setLines([...newLines]);
    }
    
    const experienceProcess = async () => {
        const title = 'Professional Experience';
        let formattedExperience = experience.map(e => `${e.title} @ ${e.company} (${e.duration})`);
        await commandProcess(title, formattedExperience);
    }
    
    const projectsProcess = async () => {
        const title = 'Featured Projects';
        newLines.push({ text: `> Running script for 'projects'...` });
        newLines.push({ text: `> Initializing AI log generation subroutine...` });
        setLines([...newLines]);
        await sleep(300);

        newLines.push({ text: `> Generating mission logs:` });
        setLines([...newLines]);

        for (const project of projects) {
          await sleep(150);
          newLines.push({ text: `  - Analyzing project: ${project.title}` });
          setLines([...newLines]);
          
          try {
            const result = await generateMissionLog(project);
            await sleep(100);
            newLines.push({ text: `    LOG: ${result.log}` });
            setLines([...newLines]);
          } catch(e) {
            newLines.push({ text: `    ERROR: Could not generate log for ${project.title}` });
            setLines([...newLines]);
          }
        }
        
        await sleep(200);
        newLines.push({ text: `> Log generation complete.` });
        setLines([...newLines]);
    }

    switch(cmd.toLowerCase()) {
      case 'help':
        newLines.push({ text: 'Available commands:'});
        newLines.push({ text: '  whoami       - Display user information'});
        newLines.push({ text: '  skills       - List core competencies'});
        newLines.push({ text: '  experience   - Show professional experience'});
        newLines.push({ text: '  projects     - Generate AI mission logs for projects'});
        newLines.push({ text: '  contact      - Display contact information'});
        newLines.push({ text: '  clear        - Clear the terminal screen'});
        setLines(newLines);
        break;
      case 'whoami':
        newLines.push({ text: 'user: Sw3t@nK' });
        newLines.push({ text: 'role: Creative DevOps Engineer' });
        newLines.push({ text: 'status: Ready to build the future.' });
        setLines(newLines);
        break;
      case 'skills':
        await commandProcess('Core Competencies', skills);
        break;
      case 'experience':
        await experienceProcess();
        break;
      case 'projects':
        await projectsProcess();
        break;
      case 'contact':
        newLines.push({ text: 'Get in touch:' });
        newLines.push({ text: '  - Email: [REDACTED] - Please use the form on the full site.' });
        newLines.push({ text: '  - LinkedIn: linkedin.com/in/[REDACTED]' });
        newLines.push({ text: '  - GitHub: github.com/[REDACTED]' });
        setLines(newLines);
        break;
      case 'clear':
        setLines([]);
        setInputValue('');
        setIsCommandRunning(false);
        return; 
      default:
        newLines.push({ text: `command not found: ${command}` });
        setLines(newLines);
    }
    
    setInputValue('');
    setIsCommandRunning(false);
    setTimeout(() => inputRef.current?.focus(), 100);
  }

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!inputValue.trim() || isCommandRunning) return;
    runCommand(inputValue.trim());
  };

  const handleClick = () => {
    if (!isCommandRunning) {
      inputRef.current?.focus();
    }
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
              disabled={isCommandRunning}
            />
          </form>
        )}
      </CardContent>
    </Card>
  );
}
