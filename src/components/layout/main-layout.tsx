import { Header } from './header';
import { Footer } from './footer';
import { SkillsSection } from '../sections/skills-section';
import { ProjectsSection } from '../sections/projects-section';
import { ExperienceSection } from '../sections/experience-section';
import { ContactSection } from '../sections/contact-section';
import { InfrastructureSection } from '../sections/infrastructure-section';
import { Separator } from '../ui/separator';

export function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        {children}
        <div className="container mx-auto px-4 md:px-6">
          <SkillsSection />
          <Separator className="my-12 bg-border/20" />
          <ProjectsSection />
          <Separator className="my-12 bg-border/20" />
          <InfrastructureSection />
          <Separator className="my-12 bg-border/20" />
          <ExperienceSection />
          <Separator className="my-12 bg-border/20" />
          <ContactSection />
        </div>
      </main>
      <Footer />
    </div>
  );
}
