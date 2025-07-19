import { HeroSection } from '@/components/sections/hero-section';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-black">
      <main className="flex-1">
        <HeroSection />
      </main>
    </div>
  );
}
