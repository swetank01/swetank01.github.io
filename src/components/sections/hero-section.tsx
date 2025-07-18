import { InteractiveTerminal } from '@/components/shared/interactive-terminal';
import { NeuralNetwork } from '@/components/shared/neural-network';

export function HeroSection() {
  return (
    <section id="home" className="relative w-full h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <NeuralNetwork />
      </div>
      <div className="container z-10 px-4 md:px-6">
        <div className="w-full max-w-3xl mx-auto">
          <InteractiveTerminal />
        </div>
      </div>
    </section>
  );
}
