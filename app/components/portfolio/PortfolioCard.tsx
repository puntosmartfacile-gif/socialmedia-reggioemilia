"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import type { PortfolioListItem } from "@/app/lib/supabase/queries";

interface PortfolioCardProps {
  item: PortfolioListItem;
  priority?: boolean;
}

export default function PortfolioCard({
  item,
  priority = false,
}: PortfolioCardProps) {
  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, ease: "easeOut" }}
      className="group h-full"
    >
      <Link
        href={`/portfolio/${item.slug}`}
        className="flex h-full flex-col overflow-hidden rounded-[28px] border border-[#2C2C2C]/8 bg-white/80 shadow-[0_24px_80px_rgba(44,44,44,0.06)] transition-transform duration-500 hover:-translate-y-1"
      >
        <div className="relative aspect-[4/5] overflow-hidden">
          <img
            src={item.coverImage}
            alt={item.title}
            loading={priority ? "eager" : "lazy"}
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#2C2C2C]/45 via-transparent to-transparent opacity-70 transition-opacity duration-500 group-hover:opacity-90" />
          <span className="absolute left-5 top-5 inline-flex rounded-full border border-white/40 bg-[#FAFAF7]/90 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.24em] text-[#B8956B]">
            {item.category}
          </span>
        </div>

        <div className="flex flex-1 flex-col gap-4 px-6 py-6 md:px-7 md:py-7">
          <div className="space-y-3">
            <h3 className="font-[family-name:var(--font-playfair)] text-[1.75rem] leading-tight text-[#2C2C2C]">
              {item.title}
            </h3>
            <p className="text-sm uppercase tracking-[0.22em] text-[#B8956B]">
              {item.clientName}
            </p>
            <p className="text-[15px] leading-7 text-[#2C2C2C]/72">
              {item.shortDescription}
            </p>
          </div>

          <div className="mt-auto flex items-center justify-between border-t border-[#2C2C2C]/8 pt-5 text-sm font-medium text-[#2C2C2C]">
            <span>Scopri il progetto</span>
            <span className="text-[#B8956B] transition-transform duration-300 group-hover:translate-x-1">
              →
            </span>
          </div>
        </div>
      </Link>
    </motion.article>
  );
}