"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { href: "/#servizi", label: "Servizi" },
  { href: "/portfolio", label: "Portfolio" },
  { href: "/#prenota", label: "Prenota" },
  { href: "/#contatti", label: "Contatti" },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#FAFAF7]/90 backdrop-blur-md border-b border-[#2C2C2C]/5">
      <nav className="max-w-7xl mx-auto px-6 lg:px-8 flex items-center justify-between h-16 md:h-20">
        {/* Logo */}
        <Link href="/" className="font-[family-name:var(--font-playfair)] text-lg md:text-xl font-semibold text-[#2C2C2C] tracking-tight">
          SocialMedia<span className="text-[#B8956B]">RE</span>
        </Link>

        {/* Desktop Nav */}
        <ul className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="text-sm text-[#2C2C2C]/70 hover:text-[#2C2C2C] transition-colors duration-200 font-medium"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* CTA Button */}
        <Link
          href="/#prenota"
          className="hidden md:inline-flex items-center px-5 py-2.5 bg-[#B8956B] text-white text-sm font-medium rounded-full hover:bg-[#A07D5A] transition-colors duration-200"
        >
          Prenota Ora
        </Link>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden p-2 text-[#2C2C2C]"
          aria-label="Menu"
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
          >
            {mobileOpen ? (
              <path d="M6 6l12 12M6 18L18 6" />
            ) : (
              <path d="M4 8h16M4 16h16" />
            )}
          </svg>
        </button>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-[#FAFAF7] border-b border-[#2C2C2C]/5 overflow-hidden"
          >
            <ul className="px-6 py-4 space-y-4">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className="block text-base text-[#2C2C2C]/80 hover:text-[#2C2C2C] font-medium"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/#prenota"
                  onClick={() => setMobileOpen(false)}
                  className="inline-flex items-center px-5 py-2.5 bg-[#B8956B] text-white text-sm font-medium rounded-full"
                >
                  Prenota Ora
                </Link>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
