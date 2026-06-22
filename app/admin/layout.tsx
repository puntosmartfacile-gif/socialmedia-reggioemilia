import { ReactNode } from "react";
import AdminSidebar from "../components/admin/AdminSidebar";

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-[#F3F1EB] text-[#2C2C2C]">
      <div className="grid min-h-screen lg:grid-cols-[288px_minmax(0,1fr)]">
        <div className="lg:sticky lg:top-0 lg:h-screen">
          <AdminSidebar />
        </div>
        <div className="min-w-0">
          <header className="border-b border-[#2C2C2C]/8 bg-[#FAFAF7]/92 px-5 py-4 backdrop-blur md:px-8">
            <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#2C2C2C]/42">
                  Area riservata
                </p>
                <p className="mt-1 text-sm text-[#2C2C2C]/58">
                  Guard admin-only placeholder • controllo ruolo da collegare
                </p>
              </div>
              <div className="rounded-full border border-[#2C2C2C]/10 bg-white px-3 py-1.5 text-xs text-[#2C2C2C]/58">
                Home / Admin
              </div>
            </div>
          </header>
          <main className="px-5 py-6 md:px-8 md:py-8">{children}</main>
        </div>
      </div>
    </div>
  );
}