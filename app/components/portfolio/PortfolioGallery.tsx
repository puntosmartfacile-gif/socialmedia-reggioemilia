"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

interface PortfolioGalleryProps {
  images: string[];
  title: string;
}

export default function PortfolioGallery({
  images,
  title,
}: PortfolioGalleryProps) {
  const [activeImage, setActiveImage] = useState<string | null>(null);

  return (
    <>
      <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
        {images.map((image, index) => (
          <button
            key={image}
            type="button"
            onClick={() => setActiveImage(image)}
            className={`group relative overflow-hidden rounded-[24px] ${
              index === 0 ? "col-span-2 md:col-span-2 md:row-span-2" : ""
            }`}
          >
            <img
              src={image}
              alt={`${title} ${index + 1}`}
              className="h-full min-h-[220px] w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
            />
            <div className="absolute inset-0 bg-[#2C2C2C]/0 transition-colors duration-300 group-hover:bg-[#2C2C2C]/12" />
          </button>
        ))}
      </div>

      <AnimatePresence>
        {activeImage ? (
          <motion.button
            type="button"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActiveImage(null)}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-[#2C2C2C]/82 p-6 backdrop-blur-sm"
          >
            <motion.img
              initial={{ scale: 0.96, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.98, opacity: 0 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              src={activeImage}
              alt={title}
              className="max-h-[88vh] w-auto max-w-[92vw] rounded-[28px] object-contain shadow-2xl"
            />
          </motion.button>
        ) : null}
      </AnimatePresence>
    </>
  );
}