
'use client';

import { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Circle, Volume2, VolumeX } from 'lucide-react';
import { useSound } from '@/hooks/use-sound';
import { generateMissionLog } from '@/ai/flows/generate-log-flow';

const asciiArt = `
  .d8888b. d88888b d888888b .d8888b.  .d88b.  d8b   db d88888D 
 88'  \`YP 88'       \`88'   88'  \`YP .8P  Y8. 888o  88 YP  88'  
 \`8bo.   88ooooo    88    \`8bo.   88    88 88V8o 88    88    
   \`Y8b. 88~~~~~    88      \`Y8b. 88    88 88 V8o88    88    
 db   8D 88.       .88.   db   8D \`8b  d8' 88  V888    88    
 \`8888Y' Y88888P Y888888P \`8888Y'  \`Y88P'  VP   V8P    YP    
`;

const initialCommands = [
  { cmd: 'system.boot()', delay: 50, typed: true, prompt: true },
  { cmd: '...', delay: 100 },
  { cmd: 'Loading kernel modules...', delay: 100 },
  { cmd: 'System online. Welcome, user.', delay: 200 },
  { cmd: './connect -u Sw3t@nK', delay: 1000, typed: true, prompt: true },
  { cmd: 'Authenticating with public key...', delay: 100 },
  { cmd: 'Access Granted.', delay: 200 },
  { cmd: asciiArt, delay: 100, color: 'text-primary' },
  { cmd: 'Type `help` to see available commands.', delay: 200 },
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

const createBox = (title: string, contentLines: string[]): string[] => {
    const maxWidth = Math.max(title.length + 4, ...contentLines.map(l => l.length)) + 4;
    const top = `┌─${title}─${'─'.repeat(maxWidth - title.length - 4)}┐`;
    const middle = contentLines.map(line => `│ ${line.padEnd(maxWidth - 4)} │`);
    const bottom = `└${'─'.repeat(maxWidth - 2)}┘`;
    return [top, ...middle, bottom];
}

export function InteractiveTerminal() {
  const [lines, setLines] = useState<{ text: string; prompt?: boolean, color?: string }[]>([]);
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
        setLines(prev => [...prev, { text: current.cmd, prompt: current.prompt, color: (current as any).color }]);
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

    const commandProcess = async (title: string, data: string[], color?: string) => {
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
        newLines.push({ text: "" }); // Spacer
        setLines([...newLines]);
        
        const box = createBox(title, data);
        box.forEach(line => newLines.push({ text: line, color }));

        newLines.push({ text: "" }); // Spacer
        setLines([...newLines]);
    }
    
    const experienceProcess = async () => {
        const title = 'Professional Experience';
        let formattedExperience = experience.map(e => `${e.title.padEnd(30)} | ${e.company.padEnd(20)} | ${e.duration}`);
        await commandProcess(title, formattedExperience, 'text-purple-400');
    }
    
    const projectsProcess = async () => {
        newLines.push({ text: `> Running script for 'projects'...` });
        newLines.push({ text: `> Initializing AI log generation subroutine...` });
        setLines([...newLines]);
        await sleep(300);

        newLines.push({ text: `> Generating mission logs:` });
        setLines([...newLines]);

        const projectLogs: string[] = [];

        for (const project of projects) {
          await sleep(150);
          newLines.push({ text: `  - Analyzing project: ${project.title}` });
          setLines([...newLines]);
          
          try {
            const result = await generateMissionLog(project);
            await sleep(100);
            const logLine = `${project.title}: ${result.log}`;
            projectLogs.push(logLine);
            newLines.push({ text: `    LOG: ${result.log}` });
            setLines([...newLines]);
          } catch(e) {
            const errorLine = `ERROR: Could not generate log for ${project.title}`;
            projectLogs.push(errorLine);
            newLines.push({ text: `    ${errorLine}` });
            setLines([...newLines]);
          }
        }
        
        await sleep(200);
        newLines.push({ text: `> Log generation complete.` });
        setLines([...newLines]);
        
        const box = createBox("AI-Generated Mission Logs", projectLogs);
        box.forEach(line => newLines.push({ text: line, color: 'text-green-400' }));
        newLines.push({ text: "" }); // Spacer
        setLines([...newLines]);
    }

    switch(cmd.toLowerCase()) {
      case 'help':
        const helpBox = createBox("Help", [
            "whoami       - Display user information",
            "skills       - List core competencies",
            "experience   - Show professional experience",
            "projects     - Generate AI mission logs for projects",
            "contact      - Display contact information",
            "clear        - Clear the terminal screen",
        ]);
        helpBox.forEach(line => newLines.push({ text: line, color: 'text-cyan-400' }));
        setLines(newLines);
        break;
      case 'whoami':
        const whoamiBox = createBox("whoami", [
            "user: Sw3t@nK",
            "role: Creative DevOps Engineer",
            "status: Ready to build the future.",
        ]);
        whoamiBox.forEach(line => newLines.push({ text: line, color: 'text-yellow-400'}));
        setLines(newLines);
        break;
      case 'skills':
        await commandProcess('Core Competencies', skills, 'text-blue-400');
        break;
      case 'experience':
        await experienceProcess();
        break;
      case 'projects':
        await projectsProcess();
        break;
      case 'contact':
        const contactBox = createBox("Contact", [
          'Email: [REDACTED] - Please use the form on the full site.',
          'LinkedIn: linkedin.com/in/[REDACTED]',
          'GitHub: github.com/[REDACTED]'
        ]);
        contactBox.forEach(line => newLines.push({ text: line, color: 'text-orange-400' }));
        setLines(newLines);
        break;
      case 'clear':
        setLines([]);
        setInputValue('');
        setIsCommandRunning(false);
        return; 
      default:
        newLines.push({ text: `command not found: ${command}`, color: 'text-red-500' });
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
            <p className={`whitespace-pre-wrap break-words ${line.color || ''}`}>{line.text}</p>
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
