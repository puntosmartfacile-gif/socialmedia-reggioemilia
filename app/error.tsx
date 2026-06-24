"use client";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="it">
      <body className="bg-[#FAFAF7] text-[#2C2C2C]">
        <main className="flex min-h-screen items-center justify-center px-6 py-16">
          <div className="w-full max-w-xl rounded-[32px] border border-[#2C2C2C]/8 bg-white p-8 text-center shadow-[0_30px_80px_rgba(44,44,44,0.08)] sm:p-10">
            <p className="text-sm uppercase tracking-[0.28em] text-[#B8956B]">
              Errore applicazione
            </p>
            <h1 className="mt-4 font-[family-name:var(--font-playfair)] text-4xl text-[#2C2C2C]">
              Qualcosa è andato storto
            </h1>
            <p className="mt-4 text-sm leading-6 text-[#2C2C2C]/60">
              Si è verificato un problema temporaneo. Riprova oppure torna alla home.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
              <button
                type="button"
                onClick={() => reset()}
                className="rounded-2xl bg-[#B8956B] px-5 py-3 text-sm font-medium text-white transition hover:bg-[#A07D5A]"
              >
                Riprova
              </button>
              <a
                href="/"
                className="rounded-2xl border border-[#2C2C2C]/10 px-5 py-3 text-sm font-medium text-[#2C2C2C] transition hover:border-[#B8956B]/40 hover:text-[#B8956B]"
              >
                Torna alla home
              </a>
            </div>
            {error.digest ? (
              <p className="mt-6 text-xs uppercase tracking-[0.18em] text-[#2C2C2C]/35">
                Codice: {error.digest}
              </p>
            ) : null}
          </div>
        </main>
      </body>
    </html>
  );
}