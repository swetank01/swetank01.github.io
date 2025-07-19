import { InteractiveTerminal } from '@/components/shared/interactive-terminal';
import { NeuralNetwork } from '@/components/shared/neural-network';

export function HeroSection() {
  return (
    <section id="home" className="relative w-full h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <NeuralNetwork />
      </div>
      <div className="relative z-10 w-full h-full flex items-center justify-center p-4">
        <div className="w-full h-full max-w-6xl">
          <InteractiveTerminal />
        </div>
      </div>
    </section>
  );
}
