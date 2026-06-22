"use client";

import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { ReactNode } from "react";
import BookingProgress from "./BookingProgress";
import { BookingService, useBookingStore } from "../../stores/booking-store";

type BookingShellProps = {
  service: BookingService;
  title: string;
  eyebrow: string;
  description: string;
  labels: string[];
  totalSteps: number;
  children: ReactNode;
};

export default function BookingShell({
  service,
  title,
  eyebrow,
  description,
  labels,
  totalSteps,
  children,
}: BookingShellProps) {
  const currentStep = useBookingStore((state) => state.currentStep);

  return (
    <>
      <section className="border-b border-[#2C2C2C]/6 px-6 pb-12 pt-28 md:px-8 md:pb-16 md:pt-36">
        <div className="mx-auto max-w-6xl">
          <Link
            href="/prenota"
            className="inline-flex items-center gap-2 text-sm text-[#2C2C2C]/60 transition-colors hover:text-[#B8956B]"
          >
            <span aria-hidden="true">←</span>
            Torna ai servizi
          </Link>
          <p className="mt-6 text-xs uppercase tracking-[0.32em] text-[#B8956B]">
            {service === "fotografia" ? "Servizio fotografia" : "Servizio consulenza"}
          </p>
          <div className="mt-8 grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
            <div>
              <p className="text-xs uppercase tracking-[0.32em] text-[#B8956B]">
                {eyebrow}
              </p>
              <h1 className="mt-4 font-[family-name:var(--font-playfair)] text-4xl leading-tight text-[#2C2C2C] md:text-6xl">
                {title}
              </h1>
              <p className="mt-5 max-w-2xl text-base leading-8 text-[#2C2C2C]/65 md:text-lg">
                {description}
              </p>
            </div>
            <BookingProgress
              currentStep={currentStep}
              totalSteps={totalSteps}
              labels={labels}
            />
          </div>
        </div>
      </section>

      <section className="px-6 py-12 md:px-8 md:py-16">
        <div className="mx-auto max-w-6xl">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -24 }}
              transition={{ duration: 0.28, ease: "easeOut" }}
            >
              {children}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>
    </>
  );
}