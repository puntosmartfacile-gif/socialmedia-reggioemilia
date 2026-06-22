"use client";

import AnimatedSection from "./AnimatedSection";

export default function BookingCTA() {
  return (
    <section
      id="prenota"
      className="px-6 py-24 md:px-8 md:py-28"
    >
      <div className="mx-auto max-w-6xl rounded-[32px] border border-[#2C2C2C]/8 bg-white/80 px-8 py-12 shadow-[0_24px_80px_rgba(44,44,44,0.05)] md:px-12 md:py-14">
        <AnimatedSection>
          <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
            <div className="text-left">
              <p className="mb-4 text-sm font-medium uppercase tracking-[0.24em] text-[#B8956B]">
                Pronti a far crescere il tuo brand?
              </p>
              <h2 className="font-[family-name:var(--font-playfair)] text-3xl leading-tight text-[#2C2C2C] sm:text-4xl lg:text-5xl">
                Prenota una consulenza gratuita con il nostro team.
              </h2>
              <p className="mt-6 max-w-2xl text-base leading-8 text-[#2C2C2C]/65 sm:text-lg">
                Raccontaci il tuo progetto e scopriamo insieme la strategia
                migliore per valorizzare la tua presenza digitale con contenuti,
                fotografia e visione.
              </p>
            </div>

            <div className="flex flex-col gap-4 lg:items-end">
              <a
                href="mailto:info@socialmediareggioEmilia.it"
                className="inline-flex min-w-[240px] items-center justify-center rounded-full bg-[#B8956B] px-8 py-4 text-base font-medium text-white transition-colors duration-200 hover:bg-[#A07D5A]"
              >
                Prenota una sessione
              </a>
              <a
                href="tel:+390522000000"
                className="inline-flex min-w-[240px] items-center justify-center rounded-full border border-[#2C2C2C]/12 px-8 py-4 text-base font-medium text-[#2C2C2C] transition-colors duration-200 hover:border-[#B8956B]/40 hover:text-[#B8956B]"
              >
                Chiamaci ora
              </a>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
