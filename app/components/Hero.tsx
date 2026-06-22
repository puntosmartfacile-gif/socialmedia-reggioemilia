"use client";

import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center pt-20 md:pt-0 px-6 lg:px-8">
      {/* Background subtle pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(184,149,107,0.06),transparent_50%)]" />

      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        {/* Text Content */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="order-2 lg:order-1"
        >
          <p className="text-[#B8956B] text-sm font-medium tracking-widest uppercase mb-4">
            Social Media Marketing &bull; Reggio Emilia
          </p>
          <h1 className="font-[family-name:var(--font-playfair)] text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-medium text-[#2C2C2C] leading-[1.1] mb-6">
            Raccontiamo la tua storia con immagini che{" "}
            <span className="italic text-[#B8956B]">convertono</span>
          </h1>
          <p className="text-base sm:text-lg text-[#2C2C2C]/60 max-w-lg mb-8 leading-relaxed">
            Fotografia professionale, Local SEO e strategie social su misura per
            le attività di Reggio Emilia che vogliono crescere online.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <a
              href="#prenota"
              className="inline-flex items-center justify-center px-7 py-3.5 bg-[#B8956B] text-white font-medium rounded-full hover:bg-[#A07D5A] transition-colors duration-200 text-sm"
            >
              Prenota una Sessione
            </a>
            <a
              href="#portfolio"
              className="inline-flex items-center justify-center px-7 py-3.5 border border-[#2C2C2C]/20 text-[#2C2C2C] font-medium rounded-full hover:border-[#2C2C2C]/40 transition-colors duration-200 text-sm"
            >
              Scopri il Portfolio
            </a>
          </div>
        </motion.div>

        {/* Hero Image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="order-1 lg:order-2"
        >
          <div className="relative aspect-[4/5] lg:aspect-[3/4] rounded-2xl overflow-hidden shadow-2xl shadow-[#2C2C2C]/10">
            <img
              src="https://picsum.photos/800/1000?random=1"
              alt="Fotografia professionale Reggio Emilia"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#2C2C2C]/20 to-transparent" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
