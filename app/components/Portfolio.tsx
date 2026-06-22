"use client";

import AnimatedSection from "./AnimatedSection";

const projects = [
  {
    title: "Ristorante Da Marco",
    category: "Fotografia",
    image: "https://picsum.photos/600/400?random=10",
  },
  {
    title: "Boutique Eleganza",
    category: "Social Strategy",
    image: "https://picsum.photos/600/400?random=11",
  },
  {
    title: "Studio Dentistico Bianchi",
    category: "Local SEO",
    image: "https://picsum.photos/600/400?random=12",
  },
  {
    title: "Caffè del Teatro",
    category: "Fotografia",
    image: "https://picsum.photos/600/400?random=13",
  },
];

export default function Portfolio() {
  return (
    <section id="portfolio" className="py-24 md:py-32 px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <AnimatedSection className="text-center mb-16 md:mb-20">
          <p className="text-[#B8956B] text-sm font-medium tracking-widest uppercase mb-3">
            Portfolio
          </p>
          <h2 className="font-[family-name:var(--font-playfair)] text-3xl sm:text-4xl lg:text-5xl font-medium text-[#2C2C2C]">
            I nostri lavori recenti
          </h2>
        </AnimatedSection>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {projects.map((project, i) => (
            <AnimatedSection key={project.title} delay={i * 0.1}>
              <div className="group relative rounded-2xl overflow-hidden cursor-pointer">
                <div className="aspect-[3/4]">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#2C2C2C]/80 via-[#2C2C2C]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                  <span className="inline-block px-3 py-1 bg-[#B8956B] text-white text-xs font-medium rounded-full w-fit mb-2">
                    {project.category}
                  </span>
                  <h3 className="text-white font-medium text-lg">
                    {project.title}
                  </h3>
                </div>
                {/* Always-visible badge on mobile */}
                <div className="absolute top-4 left-4 sm:hidden">
                  <span className="inline-block px-3 py-1 bg-[#B8956B] text-white text-xs font-medium rounded-full">
                    {project.category}
                  </span>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
