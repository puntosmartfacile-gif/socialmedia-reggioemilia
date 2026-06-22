"use client";

import AnimatedSection from "./AnimatedSection";

const stats = [
  { value: "150+", label: "Clienti Soddisfatti" },
  { value: "3x", label: "Crescita Media Follower" },
  { value: "95%", label: "Tasso di Rinnovo" },
  { value: "#1", label: "Posizionamento Local SEO" },
];

const testimonials = [
  {
    quote:
      "Grazie a SocialMediaRE il nostro ristorante ha triplicato le prenotazioni da Instagram in soli 3 mesi.",
    author: "Marco Rossi",
    role: "Ristorante Da Marco",
  },
  {
    quote:
      "Professionalità e risultati concreti. Le foto hanno trasformato il nostro profilo Google Business.",
    author: "Laura Bianchi",
    role: "Studio Dentistico Bianchi",
  },
];

export default function SocialProof() {
  return (
    <section className="py-24 md:py-32 px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Stats */}
        <AnimatedSection>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 mb-20 md:mb-28">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="font-[family-name:var(--font-playfair)] text-3xl sm:text-4xl lg:text-5xl font-medium text-[#B8956B] mb-2">
                  {stat.value}
                </p>
                <p className="text-sm text-[#2C2C2C]/60">{stat.label}</p>
              </div>
            ))}
          </div>
        </AnimatedSection>

        {/* Testimonials */}
        <AnimatedSection className="text-center mb-12">
          <p className="text-[#B8956B] text-sm font-medium tracking-widest uppercase mb-3">
            Testimonianze
          </p>
          <h2 className="font-[family-name:var(--font-playfair)] text-3xl sm:text-4xl lg:text-5xl font-medium text-[#2C2C2C]">
            Cosa dicono i nostri clienti
          </h2>
        </AnimatedSection>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {testimonials.map((t, i) => (
            <AnimatedSection key={t.author} delay={i * 0.15}>
              <div className="p-8 rounded-2xl bg-white border border-[#2C2C2C]/5">
                <svg
                  width="32"
                  height="32"
                  viewBox="0 0 24 24"
                  fill="none"
                  className="text-[#B8956B]/30 mb-4"
                >
                  <path
                    d="M10 8c-2.2 0-4 1.8-4 4v4h4v-4H8c0-1.1.9-2 2-2V8zm8 0c-2.2 0-4 1.8-4 4v4h4v-4h-2c0-1.1.9-2 2-2V8z"
                    fill="currentColor"
                  />
                </svg>
                <p className="text-[#2C2C2C]/70 leading-relaxed mb-6 italic">
                  &ldquo;{t.quote}&rdquo;
                </p>
                <div>
                  <p className="font-medium text-[#2C2C2C] text-sm">
                    {t.author}
                  </p>
                  <p className="text-[#2C2C2C]/50 text-xs">{t.role}</p>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
