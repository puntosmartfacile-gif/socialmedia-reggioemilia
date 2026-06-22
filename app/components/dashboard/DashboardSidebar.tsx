"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { DashboardUser } from "@/app/lib/dashboard-data";

interface DashboardSidebarProps {
  user: DashboardUser;
}

const navItems = [
  {
    href: "/dashboard",
    label: "Dashboard",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className="h-5 w-5">
        <path strokeWidth="1.7" d="M4 13h7V4H4v9Zm9 7h7v-5h-7v5Zm0-9h7V4h-7v7ZM4 20h7v-5H4v5Z" />
      </svg>
    ),
  },
  {
    href: "/prenotazioni",
    label: "Le Mie Prenotazioni",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className="h-5 w-5">
        <path strokeWidth="1.7" d="M7 3v3M17 3v3M4 9h16M5 6h14a1 1 0 0 1 1 1v12a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V7a1 1 0 0 1 1-1Z" />
      </svg>
    ),
  },
  {
    href: "/profilo",
    label: "Profilo",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className="h-5 w-5">
        <path strokeWidth="1.7" d="M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8Zm-7 8a7 7 0 0 1 14 0" />
      </svg>
    ),
  },
];

export default function DashboardSidebar({ user }: DashboardSidebarProps) {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  const navContent = (
    <div className="flex h-full flex-col">
      <div className="border-b border-[#2C2C2C]/8 px-5 py-5">
        <Link
          href="/dashboard"
          className="font-[family-name:var(--font-playfair)] text-xl font-semibold tracking-tight text-[#2C2C2C]"
        >
          SocialMedia<span className="text-[#B8956B]">RE</span>
        </Link>
      </div>

      <nav className="flex-1 space-y-2 px-4 py-6">
        {navItems.map((item) => {
          const active = pathname === item.href;

          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setMobileOpen(false)}
              className={`flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium transition ${
                active
                  ? "bg-[#B8956B] text-white shadow-[0_12px_30px_rgba(184,149,107,0.28)]"
                  : "text-[#2C2C2C]/70 hover:bg-[#2C2C2C]/4 hover:text-[#2C2C2C]"
              }`}
            >
              {item.icon}
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>

      <div className="border-t border-[#2C2C2C]/8 px-4 py-5">
        <div className="flex items-center gap-3 rounded-2xl bg-[#FAFAF7] px-3 py-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#B8956B]/15 text-sm font-semibold text-[#B8956B]">
            {user.avatarFallback}
          </div>
          <div className="min-w-0">
            <p className="truncate text-sm font-medium text-[#2C2C2C]">{user.name}</p>
            <p className="truncate text-xs text-[#2C2C2C]/55">{user.email}</p>
          </div>
        </div>
        <Link
          href="/login"
          className="mt-4 flex items-center justify-center rounded-2xl border border-[#2C2C2C]/10 px-4 py-3 text-sm font-medium text-[#2C2C2C]/75 transition hover:border-[#B8956B]/40 hover:text-[#2C2C2C]"
        >
          Esci
        </Link>
      </div>
    </div>
  );

  return (
    <>
      <aside className="hidden w-80 shrink-0 border-r border-[#2C2C2C]/8 bg-[#FFFEFC] lg:block">
        {navContent}
      </aside>

      <div className="lg:hidden">
        <div className="sticky top-0 z-30 flex items-center justify-between border-b border-[#2C2C2C]/8 bg-[#FAFAF7]/95 px-5 py-4 backdrop-blur">
          <Link
            href="/dashboard"
            className="font-[family-name:var(--font-playfair)] text-lg font-semibold text-[#2C2C2C]"
          >
            SocialMedia<span className="text-[#B8956B]">RE</span>
          </Link>
          <button
            type="button"
            onClick={() => setMobileOpen((open) => !open)}
            className="rounded-full border border-[#2C2C2C]/10 p-2 text-[#2C2C2C]"
            aria-label="Apri menu area clienti"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className="h-5 w-5">
              {mobileOpen ? (
                <path strokeWidth="1.7" d="M6 6l12 12M6 18 18 6" />
              ) : (
                <path strokeWidth="1.7" d="M4 7h16M4 12h16M4 17h16" />
              )}
            </svg>
          </button>
        </div>

        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              className="fixed inset-x-4 top-20 z-40 rounded-[28px] border border-[#2C2C2C]/8 bg-white shadow-[0_24px_80px_rgba(44,44,44,0.12)]"
            >
              <div className="max-h-[calc(100vh-7rem)] overflow-y-auto">{navContent}</div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="fixed inset-x-4 bottom-4 z-30 rounded-[24px] border border-[#2C2C2C]/8 bg-white/95 p-2 shadow-[0_18px_50px_rgba(44,44,44,0.12)] backdrop-blur">
          <div className="grid grid-cols-3 gap-2">
            {navItems.map((item) => {
              const active = pathname === item.href;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex flex-col items-center gap-1 rounded-2xl px-3 py-2 text-[11px] font-medium ${
                    active ? "bg-[#B8956B] text-white" : "text-[#2C2C2C]/65"
                  }`}
                >
                  {item.icon}
                  <span className="text-center leading-tight">{item.label}</span>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}