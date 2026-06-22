import Link from "next/link";
import { redirect } from "next/navigation";
import BookingCard from "@/app/components/dashboard/BookingCard";
import StatsCard from "@/app/components/dashboard/StatsCard";
import { createClient } from "@/app/lib/supabase/server";
import { getUserBookings } from "@/app/lib/supabase/queries";

export default async function DashboardPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login?redirect=/dashboard");
  }

  const bookings = await getUserBookings(user.id);
  const activeBookings = bookings.filter(
    (booking) => booking.status === "confirmed" || booking.status === "pending",
  ).length;
  const upcomingBooking =
    bookings.find((booking) => booking.status === "confirmed" || booking.status === "pending") ??
    bookings[0] ??
    null;

  return (
    <div className="space-y-8">
      <section className="rounded-[32px] border border-[#2C2C2C]/8 bg-[linear-gradient(135deg,rgba(255,255,255,0.96),rgba(250,250,247,0.92))] p-8 shadow-[0_24px_80px_rgba(44,44,44,0.05)]">
        <p className="text-sm uppercase tracking-[0.28em] text-[#B8956B]">Bentornata</p>
        <div className="mt-4 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <h1 className="font-[family-name:var(--font-playfair)] text-4xl text-[#2C2C2C] sm:text-5xl">
              Ciao
            </h1>
            <p className="mt-3 max-w-2xl text-base leading-7 text-[#2C2C2C]/62">
              Qui trovi una panoramica rapida delle tue prenotazioni, dei prossimi appuntamenti e delle azioni più utili per gestire il tuo percorso.
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Link href="/prenota" className="inline-flex items-center justify-center rounded-full bg-[#B8956B] px-6 py-3 text-sm font-medium text-white transition hover:bg-[#A07D5A]">Nuova Prenotazione</Link>
            <Link href="/#contatti" className="inline-flex items-center justify-center rounded-full border border-[#2C2C2C]/12 px-6 py-3 text-sm font-medium text-[#2C2C2C] transition hover:border-[#B8956B]/40 hover:text-[#B8956B]">Contattaci</Link>
          </div>
        </div>
      </section>

      <section className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        <StatsCard label="Prenotazioni Totali" value={String(bookings.length)} detail="Storico completo delle richieste inviate." icon={<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className="h-5 w-5"><path strokeWidth="1.7" d="M7 3v3M17 3v3M4 9h16M5 6h14a1 1 0 0 1 1 1v12a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V7a1 1 0 0 1 1-1Z" /></svg>} />
        <StatsCard label="Attive" value={String(activeBookings)} detail="Prenotazioni confermate o in attesa di conferma." icon={<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className="h-5 w-5"><path strokeWidth="1.7" d="m5 13 4 4L19 7" /></svg>} />
        <StatsCard label="Prossimo Slot" value={upcomingBooking?.time ?? "—"} detail={upcomingBooking?.date ?? "Nessuna prenotazione"} icon={<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className="h-5 w-5"><path strokeWidth="1.7" d="M12 7v5l3 3M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" /></svg>} />
        <StatsCard label="Supporto" value="24h" detail="Tempo medio di risposta alle richieste clienti." icon={<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className="h-5 w-5"><path strokeWidth="1.7" d="M8 10h8M8 14h5M6 5h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H9l-5 4V7a2 2 0 0 1 2-2Z" /></svg>} />
      </section>

      <section className="grid gap-6 xl:grid-cols-[1.4fr_0.9fr]">
        {upcomingBooking ? <BookingCard booking={upcomingBooking} /> : <div className="rounded-[28px] border border-[#2C2C2C]/8 bg-white p-6 shadow-[0_20px_60px_rgba(44,44,44,0.06)]"><p className="text-sm text-[#2C2C2C]/62">Nessuna prenotazione imminente.</p></div>}
        <div className="rounded-[28px] border border-[#2C2C2C]/8 bg-white p-6 shadow-[0_20px_60px_rgba(44,44,44,0.06)]">
          <p className="text-sm uppercase tracking-[0.24em] text-[#B8956B]">Azioni rapide</p>
          <div className="mt-5 space-y-4">
            <Link href="/prenotazioni" className="flex items-center justify-between rounded-2xl border border-[#2C2C2C]/8 px-4 py-4 text-sm font-medium text-[#2C2C2C] transition hover:border-[#B8956B]/35 hover:bg-[#FAFAF7]"><span>Visualizza tutte le prenotazioni</span><span aria-hidden>→</span></Link>
            <Link href="/profilo" className="flex items-center justify-between rounded-2xl border border-[#2C2C2C]/8 px-4 py-4 text-sm font-medium text-[#2C2C2C] transition hover:border-[#B8956B]/35 hover:bg-[#FAFAF7]"><span>Aggiorna il tuo profilo</span><span aria-hidden>→</span></Link>
            <Link href="/#contatti" className="flex items-center justify-between rounded-2xl border border-[#2C2C2C]/8 px-4 py-4 text-sm font-medium text-[#2C2C2C] transition hover:border-[#B8956B]/35 hover:bg-[#FAFAF7]"><span>Richiedi assistenza dedicata</span><span aria-hidden>→</span></Link>
          </div>
        </div>
      </section>
    </div>
  );
}
