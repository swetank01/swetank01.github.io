import { InteractiveTerminal } from '@/components/shared/interactive-terminal';
import Image from 'next/image';
import { NeuralNetwork } from '@/components/shared/neural-network';

export function HeroSection() {
  return (
    <section id="home" className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
      <div className="container px-4 md:px-6">
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-12 xl:gap-16">
          <div className="w-full max-w-2xl mx-auto flex items-center">
            <InteractiveTerminal />
          </div>
          <div className="flex flex-col justify-center items-center">
            <div className="w-[400px] h-[400px] lg:w-[500px] lg:h-[500px] relative">
              <NeuralNetwork />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
