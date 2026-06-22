import Link from "next/link";
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";
import PortfolioFilter from "@/app/components/portfolio/PortfolioFilter";
import AnimatedSection from "@/app/components/AnimatedSection";
import { getPortfolioData } from "@/app/lib/supabase/queries";

export default async function PortfolioPage() {
  const { categories, items } = await getPortfolioData();

  return (
    <>
      <Navbar />
      <main className="bg-[#FAFAF7] pt-16 md:pt-20">
        <section className="px-6 pb-14 pt-16 md:px-8 md:pb-20 md:pt-24">
          <div className="mx-auto max-w-7xl">
            <AnimatedSection className="max-w-3xl">
              <p className="mb-4 text-sm uppercase tracking-[0.28em] text-[#B8956B]">
                Portfolio
              </p>
              <h1 className="font-[family-name:var(--font-playfair)] text-5xl leading-[0.98] text-[#2C2C2C] sm:text-6xl lg:text-7xl">
                I nostri lavori, raccontati con eleganza e risultati concreti.
              </h1>
              <p className="mt-6 max-w-2xl text-base leading-8 text-[#2C2C2C]/68 md:text-lg">
                Una selezione di progetti tra fotografia, Local SEO e strategy
                pensati per brand locali che desiderano crescere con una presenza
                digitale più curata, coerente e memorabile.
              </p>
            </AnimatedSection>
          </div>
        </section>

        <section className="px-6 pb-24 md:px-8 md:pb-32">
          <div className="mx-auto max-w-7xl">
            <div className="mb-10 flex flex-col gap-6 border-y border-[#2C2C2C]/8 py-6 md:flex-row md:items-center md:justify-between">
              <PortfolioFilter
                categories={categories}
                items={items}
              />
            </div>
            <div className="mt-14 flex flex-col items-center gap-5">
              <Link
                href="#prenota"
                className="text-sm uppercase tracking-[0.2em] text-[#B8956B]"
              >
                Vuoi un progetto simile? Prenota una sessione
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}