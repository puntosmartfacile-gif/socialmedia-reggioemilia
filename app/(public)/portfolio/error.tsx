"use client";

export default function PortfolioError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <main className="flex min-h-[60vh] items-center justify-center px-6 py-16">
      <div className="w-full max-w-2xl rounded-[32px] border border-[#2C2C2C]/8 bg-white p-8 text-center shadow-[0_30px_80px_rgba(44,44,44,0.08)] sm:p-10">
        <p className="text-sm uppercase tracking-[0.28em] text-[#B8956B]">
          Portfolio non disponibile
        </p>
        <h1 className="mt-4 font-[family-name:var(--font-playfair)] text-4xl text-[#2C2C2C]">
          Stiamo aggiornando i progetti
        </h1>
        <p className="mt-4 text-sm leading-6 text-[#2C2C2C]/60">
          Il portfolio non è disponibile in questo momento. Riprova tra poco.
        </p>
        <div className="mt-8 flex justify-center">
          <button
            type="button"
            onClick={() => reset()}
            className="rounded-2xl bg-[#B8956B] px-5 py-3 text-sm font-medium text-white transition hover:bg-[#A07D5A]"
          >
            Riprova
          </button>
        </div>
      </div>
    </main>
  );
}