import { IntroSequence } from '@/components/shared/intro-sequence';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-black">
      <main className="flex-1">
        <IntroSequence />
      </main>
    </div>
  );
}
