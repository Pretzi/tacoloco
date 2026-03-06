import { Hero } from "@/components/Hero";
import { PromoMarquee } from "@/components/PromoMarquee";
import { Menu } from "@/components/Menu";
import { Testimonials } from "@/components/Testimonials";
import { ExploreMore } from "@/components/WhoWeAre";
import Image from "next/image";

export default function HomePage() {
  return (
    <>
      <Hero />
      <PromoMarquee />
      <Menu />
      <section className="overflow-hidden bg-white px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="overflow-hidden rounded-2xl border border-primary/10 shadow-lg">
            <Image
              src="/images/restaurant-exterior.png"
              alt="TacoLoco Street Food at 160 Baldwin Street, Kensington Market — outdoor seating and storefront"
              width={1200}
              height={800}
              className="h-auto w-full object-cover"
              sizes="(max-width: 1024px) 100vw, 1152px"
            />
          </div>
        </div>
      </section>
      <Testimonials />
      <div className="border-t-2 border-primary/15 bg-white" aria-hidden />
      <ExploreMore />
    </>
  );
}
