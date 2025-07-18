import { InteractiveTerminal } from '@/components/shared/interactive-terminal';
import Image from 'next/image';

export function HeroSection() {
  return (
    <section id="home" className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
      <div className="container px-4 md:px-6">
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-12 xl:gap-16">
          <div className="flex flex-col justify-center space-y-4">
            <div className="space-y-2">
              <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl font-headline text-primary">
                Sw3t@nK
              </h1>
              <p className="max-w-[600px] text-muted-foreground md:text-xl">
                Creative DevOps Engineer orchestrating the digital frontier. Welcome to my command center.
              </p>
            </div>
            <div className="w-full max-w-md">
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
          <div className="w-full max-w-2xl mx-auto flex items-center">
            <InteractiveTerminal />
          </div>
        </div>
      </div>
    </section>
  );
}
