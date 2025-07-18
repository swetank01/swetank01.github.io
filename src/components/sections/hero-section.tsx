import { InteractiveTerminal } from '@/components/shared/interactive-terminal';
import Image from 'next/image';

export function HeroSection() {
  return (
    <section id="home" className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
      <div className="container px-4 md:px-6">
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-12 xl:gap-16">
          <div className="w-full max-w-2xl mx-auto flex items-center">
            <InteractiveTerminal />
          </div>
          <div className="flex flex-col justify-center items-center">
            <Image
                src="https://placehold.co/600x400.png"
                alt="Isometric Infrastructure"
                width={600}
                height={400}
                className="rounded-lg shadow-2xl shadow-primary/20"
                data-ai-hint="isometric infrastructure dark"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
