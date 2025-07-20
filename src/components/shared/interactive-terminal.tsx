
'use client';

import { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Circle, Volume2, VolumeX } from 'lucide-react';
import { useSound } from '@/hooks/use-sound';
import { GlitchText } from '@/components/shared/glitch-text';
import { DigitalRain } from '@/components/shared/digital-rain';

const asciiArt = `
██╗  ██╗ █████╗ ██╗      ██████╗ ██╗  ██╗
██║ ██╔╝██╔══██╗██║      ██╔══██╗██║  ██║
█████═╝ ███████║██║      ███████║██╗  ██║
██╔═██╗ ██╔══██║██║      ██╔═══██╝██║  ██║
██║  ██╗██║  ██║███████╗  ██████╔╝ ███████║
╚═╝  ╚═╝╚═╝  ╚═╝╚══════╝  ╚═════╝  ╚══════╝
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
  { id: "cerberus", title: "Project Cerberus", description: "A multi-headed security scanner that automates vulnerability detection across cloud environments." },
  { id: "nexus", title: "Nexus Pipeline", description: "A dynamic CI/CD pipeline generator for microservices, creating complex Jenkinsfiles on the fly." },
  { id: "gitops", title: "Automated GitOps", description: "An ArgoCD-based framework for managing Kubernetes clusters, ensuring environment parity." },
];

const skills = [
    'Kubernetes', 'AWS', 'Terraform', 'Docker',
    'CI/CD (Jenkins, GitHub Actions)', 'Python & Go', 'Ansible',
    'Prometheus & Grafana', 'Linux & Networking', 'Security Engineering'
];

const experience = [
    { title: 'Senior DevOps Engineer', company: 'Cyberdyne Systems', duration: '2021-Present'},
    { title: 'DevOps Engineer', company: 'Stark Industries', duration: '2018-2021'},
    { title: 'Junior System Administrator', company: 'Wayne Enterprises', duration: '2016-2018'},
];

const availableCommands = ['help', 'whoami', 'skills', 'experience', 'projects', 'contact', 'clear', 'matrix', 'open', 'exit', 'bye', 'init 0'];

const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

const createBox = (title: string, contentLines: string[]): string[] => {
    const maxWidth = Math.max(title.length + 4, ...contentLines.map(l => l.length)) + 4;
    const top = `┌─${title}─${'─'.repeat(maxWidth - title.length - 4)}┐`;
    const middle = contentLines.map(line => `│ ${line.padEnd(maxWidth - 4)} │`);
    const bottom = `└${'─'.repeat(maxWidth - 2)}┘`;
    return [top, ...middle, bottom];
}

interface InteractiveTerminalProps {
  onExit: () => void;
}

export function InteractiveTerminal({ onExit }: InteractiveTerminalProps) {
  const [lines, setLines] = useState<{ text: string; prompt?: boolean; color?: string; isGlitch?: boolean }[]>([]);
  const [isAnimating, setIsAnimating] = useState(true);
  const [isCommandRunning, setIsCommandRunning] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [suggestion, setSuggestion] = useState('');
  const [history, setHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [showMatrix, setShowMatrix] = useState(false);
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
    const value = e.target.value;
    setInputValue(value);

    if (value) {
      const valueLower = value.toLowerCase();
      const match = availableCommands.find(cmd => cmd.startsWith(valueLower));
      if (match && match !== valueLower) {
        setSuggestion(value + match.substring(value.length));
      } else if (value.startsWith('open ')) {
        const arg = value.substring(5);
        const projectMatch = projects.find(p => p.id.startsWith(arg));
        if (projectMatch && projectMatch.id !== arg) {
            setSuggestion(`open ${projectMatch.id}`);
        } else {
            setSuggestion('');
        }
      } else {
        setSuggestion('');
      }
    } else {
      setSuggestion('');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Tab' && suggestion) {
      e.preventDefault();
      setInputValue(suggestion);
      setSuggestion('');
    } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        if (history.length > 0) {
            const newIndex = Math.min(history.length - 1, historyIndex + 1);
            setHistoryIndex(newIndex);
            setInputValue(history[history.length - 1 - newIndex]);
        }
    } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        if (historyIndex > -1) {
            const newIndex = historyIndex - 1;
            setHistoryIndex(newIndex);
            setInputValue(newIndex >= 0 ? history[history.length - 1 - newIndex] : '');
        }
    }
  };

  const runCommand = async (command: string) => {
    setIsCommandRunning(true);
    setSuggestion('');
    const newHistory = [command, ...history];
    setHistory(newHistory);
    setHistoryIndex(-1);

    let newLines = [...lines, { text: command, prompt: true }];
    setLines([...newLines]);

    const [cmd, ...args] = command.trim().split(' ');
    const normalizedCmd = cmd.trim().toLowerCase();

    const addGlitchLine = async (text: string, color?: string) => {
      newLines.push({ text, color, isGlitch: true });
      setLines([...newLines]);
      await sleep(50); // Typing latency
    };
    
    const addLine = (text: string, color?: string) => {
        newLines.push({ text, color });
    };

    const commandProcess = async (title: string, data: string[], color?: string) => {
        await addGlitchLine(`> Running script for '${cmd}'...`);
        await sleep(500);

        await addGlitchLine(`> Connecting to secure datastore... [DONE]`);
        await sleep(300);

        await addGlitchLine(`> Authenticating... [DONE]`);
        await sleep(300);

        await addGlitchLine(`> Decrypting records...`);
        const progressLineIndex = newLines.length;
        addLine(`[${' '.repeat(20)}] 0%`);
        for (let i = 0; i <= 20; i++) {
            await sleep(30);
            newLines[progressLineIndex] = { text: `[${'█'.repeat(i)}${' '.repeat(20-i)}] ${i*5}%` };
            setLines([...newLines]);
        }
        await sleep(200);

        newLines[progressLineIndex] = { text: `> Records decrypted successfully.`, isGlitch: true };
        addLine(""); // Spacer
        setLines([...newLines]);
        await sleep(500);
        
        const box = createBox(title, data);
        for (const line of box) {
            await addGlitchLine(line, color);
        }

        addLine(""); // Spacer
        setLines([...newLines]);
    }
    
    const experienceProcess = async () => {
        const title = 'Professional Experience';
        let formattedExperience = experience.map(e => `${e.title.padEnd(30)} | ${e.company.padEnd(20)} | ${e.duration}`);
        await commandProcess(title, formattedExperience, 'text-purple-400');
    }
    
    const projectsProcess = async () => {
        const title = 'Projects';
        const formattedProjects = projects.map(p => `[${p.id.padEnd(10)}] - ${p.title}`);
        await commandProcess(title, formattedProjects, 'text-green-400');
    }

    switch(normalizedCmd) {
      case 'help':
        const helpBox = createBox("Help", [
            "whoami       - Display user information",
            "skills       - List core competencies",
            "experience   - Show professional experience",
            "projects     - View key projects",
            "open <id>    - View project details",
            "contact      - Display contact information",
            "matrix       - ???",
            "clear        - Clear the terminal screen",
            "exit         - Log out and restart sequence",
        ]);
        for (const line of helpBox) {
            await addGlitchLine(line, 'text-cyan-400');
        }
        break;
      case 'whoami':
        const whoamiBox = createBox("whoami", [
            "user: Sw3t@nK",
            "role: Creative DevOps Engineer",
            "status: Ready to build the future.",
        ]);
        for (const line of whoamiBox) {
            await addGlitchLine(line, 'text-yellow-400');
        }
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
      case 'open':
        const projectId = args[0];
        const project = projects.find(p => p.id === projectId);
        if (project) {
          const projectBox = createBox(`Project: ${project.title}`, [
              project.description,
          ]);
          for (const line of projectBox) {
              await addGlitchLine(line, 'text-green-400');
          }
        } else {
            await addGlitchLine(`Error: Project with ID "${projectId || ''}" not found.`, 'text-red-500');
        }
        break;
      case 'contact':
        const contactBox = createBox("Contact", [
          'Email: [REDACTED] - Please use the form on the full site.',
          'LinkedIn: linkedin.com/in/[REDACTED]',
          'GitHub: github.com/[REDACTED]'
        ]);
        for (const line of contactBox) {
            await addGlitchLine(line, 'text-orange-400');
        }
        break;
      case 'clear':
        setLines([]);
        setInputValue('');
        setIsCommandRunning(false);
        return;
      case 'matrix':
        setShowMatrix(true);
        setLines(prev => [...prev, {text: 'Entering the Matrix...'}]);
        await sleep(2000);
        setLines([]);
        setShowMatrix(false);
        break;
      case 'exit':
      case 'bye':
      case 'init':
        if (command.trim().toLowerCase() === 'init 0') {
           await addGlitchLine('> sudo: permission granted.');
           await sleep(500);
        }
        onExit();
        return;
      default:
        await addGlitchLine(`[ ACCESS DENIED ]`, 'text-red-500');
        await addGlitchLine(`> Command not found: ${command}`, 'text-red-500');
        await addGlitchLine(`> Security event logged.`, 'text-yellow-500');
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
    <>
      {showMatrix && (
        <div className="absolute inset-0 z-50 bg-black">
          <DigitalRain isMatrix a11y={false} />
        </div>
      )}
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
              <p className={`whitespace-pre-wrap break-words ${line.color || ''}`}>
                  {line.isGlitch ? <GlitchText text={line.text} /> : line.text}
              </p>
            </div>
          ))}
          {!isAnimating && !isCommandRunning && (
            <form onSubmit={handleFormSubmit} className="flex relative">
              <label htmlFor="terminal-input" className="text-primary mr-2 flex-shrink-0">$</label>
              <div className="relative w-full">
                <input
                  id="terminal-input"
                  ref={inputRef}
                  type="text"
                  value={inputValue}
                  onChange={handleInputChange}
                  onKeyDown={handleKeyDown}
                  autoComplete="off"
                  autoCapitalize="off"
                  autoCorrect="off"
                  className="bg-transparent border-none outline-none text-foreground w-full p-0"
                  disabled={isCommandRunning}
                />
                {suggestion && (
                  <div className="absolute top-0 left-0 text-muted-foreground pointer-events-none">
                    <span className="text-transparent">{inputValue}</span>
                    {suggestion.substring(inputValue.length)}
                  </div>
                )}
                {!isCommandRunning && <span className="block-cursor"></span>}
              </div>
            </form>
          )}
        </CardContent>
      </Card>
    </>
  );
}
