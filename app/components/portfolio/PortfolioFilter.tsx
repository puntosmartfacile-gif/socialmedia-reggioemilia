"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import PortfolioCard from "@/app/components/portfolio/PortfolioCard";
import type { PortfolioListItem } from "@/app/lib/supabase/queries";

interface PortfolioFilterProps {
  categories: string[];
  items: PortfolioListItem[];
}

export default function PortfolioFilter({
  categories,
  items,
}: PortfolioFilterProps) {
  const [activeCategory, setActiveCategory] = useState("Tutti");
  const [visibleItems, setVisibleItems] = useState(6);

  const filteredItems = useMemo(() => {
    if (activeCategory === "Tutti") {
      return items;
    }

    return items.filter((item) => item.category === activeCategory);
  }, [activeCategory, items]);

  const displayedItems = filteredItems.slice(0, visibleItems);
  const hasMore = visibleItems < filteredItems.length;

  return (
    <div className="w-full">
      <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <div className="flex flex-wrap gap-3">
          {categories.map((category) => {
            const isActive = category === activeCategory;

            return (
              <button
                key={category}
                type="button"
                onClick={() => {
                  setActiveCategory(category);
                  setVisibleItems(6);
                }}
                className={`rounded-full border px-5 py-2.5 text-sm transition-all duration-300 ${
                  isActive
                    ? "border-[#B8956B] bg-[#B8956B] text-white shadow-[0_12px_30px_rgba(184,149,107,0.22)]"
                    : "border-[#2C2C2C]/10 bg-white/70 text-[#2C2C2C]/72 hover:border-[#B8956B]/40 hover:text-[#2C2C2C]"
                }`}
              >
                {category}
              </button>
            );
          })}
        </div>
        <p className="text-sm uppercase tracking-[0.18em] text-[#2C2C2C]/48">
          {filteredItems.length} progetti selezionati
        </p>
      </div>

      <motion.div layout className="mt-10 grid gap-8 md:grid-cols-2 xl:grid-cols-3">
        {displayedItems.map((item, index) => (
          <PortfolioCard key={item.slug} item={item} priority={index < 3} />
        ))}
      </motion.div>

      <div className="mt-14 flex flex-col items-center gap-5">
        {hasMore ? (
          <button
            type="button"
            onClick={() => setVisibleItems((current) => current + 3)}
            className="inline-flex items-center gap-3 rounded-full border border-[#B8956B] px-7 py-3 text-sm font-medium text-[#2C2C2C] transition-colors duration-300 hover:bg-[#B8956B] hover:text-white"
          >
            Carica altri
            <span className="text-[#B8956B] transition-colors duration-300">→</span>
          </button>
        ) : (
          <p className="text-sm text-[#2C2C2C]/52">
            Hai visto tutti i progetti disponibili.
          </p>
        )}
      </div>
    </div>
  );
}