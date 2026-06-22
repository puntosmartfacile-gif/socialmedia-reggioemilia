"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { adminNavItems } from "./adminData";

export default function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="flex h-full w-full flex-col bg-[#2C2C2C] text-[#FAFAF7] lg:w-72">
      <div className="border-b border-white/10 px-5 py-5">
        <Link
          href="/admin"
          className="font-[family-name:var(--font-playfair)] text-xl font-semibold tracking-tight"
        >
          SocialMedia<span className="text-[#B8956B]">RE</span>
        </Link>
        <p className="mt-2 text-xs text-white/55">Pannello amministrazione</p>
      </div>

      <nav className="flex-1 px-3 py-4">
        <ul className="space-y-1.5">
          {adminNavItems.map((item) => {
            const isActive =
              item.href === "/admin"
                ? pathname === item.href
                : pathname.startsWith(item.href);

            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`flex items-center rounded-xl px-3 py-2.5 text-sm font-medium transition-colors ${
                    isActive
                      ? "bg-[#B8956B] text-white"
                      : "text-white/72 hover:bg-white/6 hover:text-white"
                  }`}
                >
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="border-t border-white/10 px-5 py-5">
        <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
          <p className="text-sm font-medium">Chiara Ferri</p>
          <p className="mt-1 text-xs text-white/55">Admin • SocialMediaRE</p>
        </div>
        <button
          type="button"
          className="mt-4 w-full rounded-xl border border-white/12 px-3 py-2 text-sm font-medium text-white/80 transition hover:bg-white/6 hover:text-white"
        >
          Logout
        </button>
      </div>
    </aside>
  );
}