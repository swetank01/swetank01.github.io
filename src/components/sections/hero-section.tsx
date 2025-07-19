import { InteractiveTerminal } from '@/components/shared/interactive-terminal';

export function HeroSection() {
  return (
    <section id="home" className="relative w-full h-screen flex items-center justify-center overflow-hidden">
      <div className="relative z-10 w-full h-full flex items-center justify-center p-4">
        <div className="w-full h-full max-w-6xl">
          <InteractiveTerminal />
        </div>
      </div>
    </section>
  );
}
