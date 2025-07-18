import { InteractiveTerminal } from '@/components/shared/interactive-terminal';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export function HeroSection() {
  return (
    <section id="home" className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
      <div className="container px-4 md:px-6">
        <div className="grid gap-6 lg:grid-cols-[1fr_550px] lg:gap-12 xl:grid-cols-[1fr_650px]">
          <div className="flex flex-col justify-center space-y-4">
          </div>
          <div className="w-full max-w-2xl mx-auto">
            <InteractiveTerminal />
          </div>
        </div>
      </div>
    </section>
  );
}
