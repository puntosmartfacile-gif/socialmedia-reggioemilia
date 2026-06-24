"use client";

import Link from "next/link";

export default function LoginError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[#FAFAF7] px-6 py-16">
      <div className="w-full max-w-md rounded-[32px] border border-[#2C2C2C]/8 bg-white p-8 text-center shadow-[0_30px_80px_rgba(44,44,44,0.08)] sm:p-10">
        <p className="text-sm uppercase tracking-[0.28em] text-[#B8956B]">
          Accesso temporaneamente non disponibile
        </p>
        <h1 className="mt-4 font-[family-name:var(--font-playfair)] text-4xl text-[#2C2C2C]">
          Impossibile caricare il login
        </h1>
        <p className="mt-4 text-sm leading-6 text-[#2C2C2C]/60">
          Riprova tra qualche istante oppure torna alla home.
        </p>
        <div className="mt-8 flex flex-col gap-3">
          <button
            type="button"
            onClick={() => reset()}
            className="rounded-2xl bg-[#B8956B] px-5 py-3 text-sm font-medium text-white transition hover:bg-[#A07D5A]"
          >
            Riprova
          </button>
          <Link
            href="/"
            className="rounded-2xl border border-[#2C2C2C]/10 px-5 py-3 text-sm font-medium text-[#2C2C2C] transition hover:border-[#B8956B]/40 hover:text-[#B8956B]"
          >
            Torna alla home
          </Link>
        </div>
      </div>
    </main>
  );
}