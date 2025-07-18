import { InteractiveTerminal } from '@/components/shared/interactive-terminal';

export function HeroSection() {
  return (
    <section id="home" className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
      <div className="container px-4 md:px-6">
        <div className="grid gap-6 lg:grid-cols-[1fr_550px] lg:gap-12 xl:grid-cols-[1fr_650px]">
          <div className="flex flex-col justify-center space-y-4">
            <div className="space-y-2">
              <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none font-headline">
                <span className="text-primary">Automate.</span> Scale. Secure.
              </h1>
              <p className="max-w-[600px] text-muted-foreground md:text-xl">
                A DevOps Engineer crafting resilient, efficient, and secure infrastructures. Explore my world through the command line.
              </p>
            </div>
          </div>
          <div className="w-full max-w-2xl mx-auto">
            <InteractiveTerminal />
          </div>
        </div>
      </div>
    </section>
  );
}
