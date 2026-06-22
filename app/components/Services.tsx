"use client";

import AnimatedSection from "./AnimatedSection";

const services = [
  {
    title: "Fotografia",
    description:
      "Scatti professionali per il tuo brand: prodotti, interni, ritratti aziendali e contenuti per i social media.",
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="2" y="6" width="20" height="14" rx="2" />
        <circle cx="12" cy="13" r="4" />
        <path d="M7 6V4h10v2" />
      </svg>
    ),
  },
  {
    title: "Local SEO",
    description:
      "Ottimizzazione Google Business Profile, citazioni locali e strategie per dominare le ricerche a Reggio Emilia.",
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <circle cx="12" cy="10" r="3" />
        <path d="M12 2a8 8 0 0 0-8 8c0 5.4 7 11.5 7.3 11.8a1 1 0 0 0 1.4 0C13 21.5 20 15.4 20 10a8 8 0 0 0-8-8z" />
      </svg>
    ),
  },
  {
    title: "Social Strategy",
    description:
      "Piani editoriali, gestione profili Instagram e Facebook, campagne ads e analisi dei risultati.",
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
        <path d="M13.73 21a2 2 0 0 1-3.46 0" />
        <path d="M12 2v1" />
      </svg>
    ),
  },
];

export default function Services() {
  return (
    <section id="servizi" className="py-24 md:py-32 px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <AnimatedSection className="text-center mb-16 md:mb-20">
          <p className="text-[#B8956B] text-sm font-medium tracking-widest uppercase mb-3">
            I Nostri Servizi
          </p>
          <h2 className="font-[family-name:var(--font-playfair)] text-3xl sm:text-4xl lg:text-5xl font-medium text-[#2C2C2C]">
            Tutto ciò che serve al tuo business
          </h2>
        </AnimatedSection>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
          {services.map((service, i) => (
            <AnimatedSection key={service.title} delay={i * 0.15}>
              <div className="group p-8 lg:p-10 rounded-2xl bg-white border border-[#2C2C2C]/5 hover:border-[#B8956B]/30 hover:shadow-lg hover:shadow-[#B8956B]/5 transition-all duration-300">
                <div className="text-[#B8956B] mb-6">{service.icon}</div>
                <h3 className="font-[family-name:var(--font-playfair)] text-xl lg:text-2xl font-medium text-[#2C2C2C] mb-3">
                  {service.title}
                </h3>
                <p className="text-[#2C2C2C]/60 leading-relaxed text-sm lg:text-base">
                  {service.description}
                </p>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
