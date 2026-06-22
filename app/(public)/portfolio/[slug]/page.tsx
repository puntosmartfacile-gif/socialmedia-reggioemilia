import Link from "next/link";
import { notFound } from "next/navigation";
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";
import BookingCTA from "@/app/components/BookingCTA";
import PortfolioCard from "@/app/components/portfolio/PortfolioCard";
import PortfolioGallery from "@/app/components/portfolio/PortfolioGallery";
import ResultsGrid from "@/app/components/portfolio/ResultsGrid";
import { portfolioItems } from "@/app/data/portfolio";
import { getPortfolioItemData } from "@/app/lib/supabase/queries";

interface PortfolioDetailPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export function generateStaticParams() {
  return portfolioItems.map((item) => ({
    slug: item.slug,
  }));
}

export default async function PortfolioDetailPage({
  params,
}: PortfolioDetailPageProps) {
  const { slug } = await params;
  const portfolioData = await getPortfolioItemData(slug);

  if (!portfolioData) {
    notFound();
  }

  const { item, relatedProjects } = portfolioData;

  return (
    <>
      <Navbar />
      <main className="bg-[#FAFAF7] pt-16 md:pt-20">
        <section className="px-4 pb-12 pt-4 md:px-8 md:pb-16 md:pt-8">
          <div className="mx-auto max-w-[1440px] overflow-hidden rounded-[32px]">
            <img
              src={item.coverImage}
              alt={item.title}
              className="h-[48vh] min-h-[360px] w-full object-cover md:h-[62vh]"
            />
          </div>
        </section>

        <section className="px-6 pb-16 md:px-8 md:pb-20">
          <div className="mx-auto max-w-6xl">
            <Link
              href="/portfolio"
              className="inline-flex items-center gap-2 text-sm uppercase tracking-[0.18em] text-[#B8956B]"
            >
              ← Torna al portfolio
            </Link>

            <div className="mt-8 grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
              <div>
                <p className="mb-4 text-sm uppercase tracking-[0.28em] text-[#B8956B]">
                  {item.category}
                </p>
                <h1 className="font-[family-name:var(--font-playfair)] text-4xl leading-tight text-[#2C2C2C] sm:text-5xl lg:text-6xl">
                  {item.title}
                </h1>
                <p className="mt-6 max-w-3xl text-base leading-8 text-[#2C2C2C]/68 md:text-lg">
                  {item.excerpt}
                </p>
              </div>

              <div className="rounded-[28px] border border-[#2C2C2C]/8 bg-white/70 p-7 shadow-[0_18px_60px_rgba(44,44,44,0.05)]">
                <p className="text-xs uppercase tracking-[0.22em] text-[#2C2C2C]/45">
                  Cliente
                </p>
                <p className="mt-2 font-[family-name:var(--font-playfair)] text-3xl text-[#2C2C2C]">
                  {item.clientName}
                </p>
                <p className="mt-5 text-sm leading-7 text-[#2C2C2C]/62">
                  Un progetto costruito per valorizzare identità, presenza
                  digitale e risultati misurabili con un’estetica pulita e
                  contemporanea.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="px-6 pb-16 md:px-8 md:pb-24">
          <div className="mx-auto grid max-w-6xl gap-16 lg:grid-cols-[0.95fr_1.05fr]">
            <div className="space-y-6">
              <p className="text-sm uppercase tracking-[0.24em] text-[#B8956B]">
                Il progetto
              </p>
              {item.content.map((paragraph) => (
                <p
                  key={paragraph}
                  className="text-base leading-8 text-[#2C2C2C]/72 md:text-lg"
                >
                  {paragraph}
                </p>
              ))}
            </div>

            <div className="space-y-6">
              <p className="text-sm uppercase tracking-[0.24em] text-[#B8956B]">
                Risultati
              </p>
              <ResultsGrid metrics={item.results} />
            </div>
          </div>
        </section>

        <section className="px-6 pb-20 md:px-8 md:pb-28">
          <div className="mx-auto max-w-6xl">
            <div className="mb-8 flex items-end justify-between gap-6">
              <div>
                <p className="text-sm uppercase tracking-[0.24em] text-[#B8956B]">
                  Galleria
                </p>
                <h2 className="mt-3 font-[family-name:var(--font-playfair)] text-3xl text-[#2C2C2C] md:text-4xl">
                  Immagini che raccontano il progetto.
                </h2>
              </div>
            </div>

            <PortfolioGallery images={item.gallery} title={item.title} />
          </div>
        </section>

        <BookingCTA />

        <section className="px-6 py-20 md:px-8 md:py-28">
          <div className="mx-auto max-w-6xl">
            <div className="mb-10 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
              <div>
                <p className="text-sm uppercase tracking-[0.24em] text-[#B8956B]">
                  Progetti correlati
                </p>
                <h2 className="mt-3 font-[family-name:var(--font-playfair)] text-3xl text-[#2C2C2C] md:text-4xl">
                  Altri lavori nello stesso universo.
                </h2>
              </div>
              <Link
                href="/portfolio"
                className="text-sm uppercase tracking-[0.18em] text-[#B8956B]"
              >
                Vedi tutto il portfolio
              </Link>
            </div>

            <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
              {relatedProjects.map((project, index) => (
                <PortfolioCard
                  key={project.slug}
                  item={project}
                  priority={index === 0}
                />
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}