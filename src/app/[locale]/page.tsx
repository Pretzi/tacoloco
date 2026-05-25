import { Hero } from "@/components/Hero";
import { StatsBand } from "@/components/StatsBand";
import { Menu } from "@/components/Menu";
import { CinematicSections } from "@/components/CinematicSections";
import { Testimonials } from "@/components/Testimonials";
import { ExploreMore } from "@/components/WhoWeAre";

export default function HomePage() {
  return (
    <>
      <Hero />
      <StatsBand />
      <Menu />
      <Testimonials />
      <CinematicSections />
      <ExploreMore />
    </>
  );
}
