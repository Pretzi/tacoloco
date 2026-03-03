import { Hero } from "@/components/Hero";
import { PromoMarquee } from "@/components/PromoMarquee";
import { Menu } from "@/components/Menu";
import { Testimonials } from "@/components/Testimonials";
import { ExploreMore } from "@/components/WhoWeAre";

export default function HomePage() {
  return (
    <>
      <Hero />
      <PromoMarquee />
      <Menu />
      <Testimonials />
      <div className="border-t-2 border-primary/15 bg-white" aria-hidden />
      <ExploreMore />
    </>
  );
}
