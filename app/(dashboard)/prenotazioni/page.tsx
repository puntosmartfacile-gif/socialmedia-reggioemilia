import { redirect } from "next/navigation";
import BookingStatusBadge from "@/app/components/dashboard/BookingStatusBadge";
import { createClient } from "@/app/lib/supabase/server";
import { getUserBookings } from "@/app/lib/supabase/queries";

export default async function PrenotazioniPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login?redirect=/prenotazioni");
  }

  const bookings = await getUserBookings(user.id);
  const selectedBooking = bookings[0] ?? null;

  return (
    <div className="space-y-8">
      <section className="flex flex-col gap-4 rounded-[32px] border border-[#2C2C2C]/8 bg-white p-8 shadow-[0_24px_80px_rgba(44,44,44,0.05)] lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="text-sm uppercase tracking-[0.28em] text-[#B8956B]">Le Mie Prenotazioni</p>
          <h1 className="mt-4 font-[family-name:var(--font-playfair)] text-4xl text-[#2C2C2C]">Gestisci i tuoi appuntamenti</h1>
          <p className="mt-3 max-w-2xl text-base leading-7 text-[#2C2C2C]/62">Consulta lo stato delle richieste, apri i dettagli di ogni servizio e tieni sotto controllo il calendario delle attività pianificate.</p>
        </div>
      </section>

      {bookings.length === 0 ? (
        <section className="rounded-[32px] border border-dashed border-[#2C2C2C]/12 bg-[#FFFEFC] px-8 py-16 text-center">
          <h2 className="font-[family-name:var(--font-playfair)] text-3xl text-[#2C2C2C]">Nessuna prenotazione trovata</h2>
          <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-[#2C2C2C]/60">Non ci sono ancora appuntamenti associati al tuo account.</p>
        </section>
      ) : (
        <section className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
          <div className="overflow-hidden rounded-[28px] border border-[#2C2C2C]/8 bg-white shadow-[0_20px_60px_rgba(44,44,44,0.05)]">
            <div className="hidden grid-cols-[1.5fr_1fr_0.8fr_0.9fr] gap-4 border-b border-[#2C2C2C]/8 px-6 py-4 text-xs uppercase tracking-[0.22em] text-[#2C2C2C]/45 md:grid">
              <span>Servizio</span><span>Data</span><span>Ora</span><span>Stato</span>
            </div>
            <div className="divide-y divide-[#2C2C2C]/8">
              {bookings.map((booking) => (
                <div key={booking.id} className="grid w-full gap-3 px-6 py-5 text-left transition md:grid-cols-[1.5fr_1fr_0.8fr_0.9fr] md:items-center hover:bg-[#FAFAF7]">
                  <div><p className="text-base font-medium text-[#2C2C2C]">{booking.serviceName}</p><p className="mt-1 text-sm text-[#2C2C2C]/55 md:hidden">{booking.date} · {booking.time}</p></div>
                  <span className="hidden text-sm text-[#2C2C2C]/70 md:block">{booking.date}</span>
                  <span className="hidden text-sm text-[#2C2C2C]/70 md:block">{booking.time}</span>
                  <div className="flex items-center justify-between gap-3 md:justify-start"><BookingStatusBadge status={booking.status} /></div>
                </div>
              ))}
            </div>
          </div>

          {selectedBooking ? (
            <aside className="rounded-[28px] border border-[#2C2C2C]/8 bg-white p-6 shadow-[0_20px_60px_rgba(44,44,44,0.05)]">
              <p className="text-sm uppercase tracking-[0.24em] text-[#B8956B]">Dettagli prenotazione</p>
              <h2 className="mt-4 font-[family-name:var(--font-playfair)] text-3xl text-[#2C2C2C]">{selectedBooking.serviceName}</h2>
              <div className="mt-5 flex items-center gap-3"><BookingStatusBadge status={selectedBooking.status} /><span className="text-sm text-[#2C2C2C]/45">{selectedBooking.id}</span></div>
              <dl className="mt-8 space-y-5 text-sm">
                <div className="border-b border-[#2C2C2C]/8 pb-4"><dt className="text-xs uppercase tracking-[0.2em] text-[#2C2C2C]/45">Data</dt><dd className="mt-2 text-base leading-6 text-[#2C2C2C]">{selectedBooking.date}</dd></div>
                <div className="border-b border-[#2C2C2C]/8 pb-4"><dt className="text-xs uppercase tracking-[0.2em] text-[#2C2C2C]/45">Orario</dt><dd className="mt-2 text-base leading-6 text-[#2C2C2C]">{selectedBooking.time}</dd></div>
                <div className="border-b border-[#2C2C2C]/8 pb-4"><dt className="text-xs uppercase tracking-[0.2em] text-[#2C2C2C]/45">Luogo</dt><dd className="mt-2 text-base leading-6 text-[#2C2C2C]">{selectedBooking.location}</dd></div>
                <div><dt className="text-xs uppercase tracking-[0.2em] text-[#2C2C2C]/45">Note</dt><dd className="mt-2 text-base leading-6 text-[#2C2C2C]">{selectedBooking.notes}</dd></div>
              </dl>
            </aside>
          ) : null}
        </section>
      )}
    </div>
  );
}
