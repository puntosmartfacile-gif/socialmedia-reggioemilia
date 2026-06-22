import AdminPageHeader from "../../components/admin/AdminPageHeader";
import StatusBadge from "../../components/admin/StatusBadge";
import { updateBookingStatus } from "@/app/lib/supabase/actions";
import { getAdminBookings } from "@/app/lib/supabase/queries";

function formatDate(value: string) {
  return new Intl.DateTimeFormat("it-IT", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(new Date(`${value}T12:00:00`));
}

export default async function AdminBookingsPage() {
  const bookings = await getAdminBookings();
  const today = new Date().toISOString().slice(0, 10);
  const todaysBookings = bookings.filter((booking) => booking.date === today);

  return (
    <div className="space-y-6">
      <AdminPageHeader
        title="Prenotazioni"
        description="Monitora richieste, aggiorna lo stato e annota dettagli operativi per ogni appuntamento."
      />

      <section className="rounded-2xl border border-[#B8956B]/30 bg-[#B8956B]/10 p-4">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#B8956B]">
              Oggi
            </p>
            <h2 className="mt-1 text-lg font-semibold text-[#2C2C2C]">
              {todaysBookings.length} prenotazioni in agenda
            </h2>
          </div>
          <div className="flex flex-wrap gap-2">
            {todaysBookings.map((booking) => (
              <div
                key={booking.id}
                className="rounded-xl border border-[#B8956B]/20 bg-white px-3 py-2 text-sm text-[#2C2C2C]"
              >
                {booking.start_time.slice(0, 5)} • {booking.clientName}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="rounded-2xl border border-[#2C2C2C]/8 bg-white p-4">
        <div className="mt-5 space-y-4">
          {bookings.map((booking) => (
            <details
              key={booking.id}
              className="overflow-hidden rounded-2xl border border-[#2C2C2C]/8 bg-[#FAFAF7]"
            >
              <summary className="cursor-pointer list-none px-4 py-4">
                <div className="grid gap-3 md:grid-cols-[1.2fr_1fr_0.8fr_0.8fr_auto] md:items-center">
                  <div>
                    <p className="font-medium text-[#2C2C2C]">{booking.clientName}</p>
                    <p className="text-xs text-[#2C2C2C]/48">{booking.clientEmail}</p>
                  </div>
                  <p className="text-sm text-[#2C2C2C]">{booking.serviceName}</p>
                  <p className="text-sm text-[#2C2C2C]">{formatDate(booking.date)}</p>
                  <p className="text-sm text-[#2C2C2C]">{booking.start_time.slice(0, 5)}</p>
                  <StatusBadge status={booking.status} />
                </div>
              </summary>
              <div className="border-t border-[#2C2C2C]/8 bg-white px-4 py-4">
                <div className="grid gap-5 xl:grid-cols-[minmax(0,1fr)_320px]">
                  <div className="space-y-4">
                    <div className="grid gap-4 md:grid-cols-2">
                      <div className="rounded-2xl border border-[#2C2C2C]/8 bg-[#FAFAF7] p-4">
                        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#2C2C2C]/42">
                          Contatti
                        </p>
                        <p className="mt-3 text-sm text-[#2C2C2C]">{booking.clientPhone || "—"}</p>
                        <p className="mt-1 text-sm text-[#2C2C2C]/58">{booking.clientEmail}</p>
                      </div>
                      <div className="rounded-2xl border border-[#2C2C2C]/8 bg-[#FAFAF7] p-4">
                        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#2C2C2C]/42">
                          Note cliente
                        </p>
                        <p className="mt-3 text-sm leading-relaxed text-[#2C2C2C]/62">
                          {booking.notes || "Nessuna nota cliente."}
                        </p>
                      </div>
                    </div>

                    <form action={updateBookingStatus} className="space-y-4">
                      <input type="hidden" name="bookingId" value={booking.id} />
                      <label className="block">
                        <span className="mb-2 block text-sm font-medium text-[#2C2C2C]">
                          Note admin
                        </span>
                        <textarea
                          name="adminNotes"
                          defaultValue={booking.admin_notes ?? ""}
                          rows={4}
                          className="w-full rounded-2xl border border-[#2C2C2C]/10 bg-[#FAFAF7] px-3 py-2.5 text-sm outline-none"
                        />
                      </label>

                      <div className="rounded-2xl border border-[#2C2C2C]/8 bg-[#FAFAF7] p-4">
                        <p className="text-sm font-semibold text-[#2C2C2C]">Azioni rapide</p>
                        <div className="mt-4 grid gap-2">
                          <button
                            type="submit"
                            name="status"
                            value="confirmed"
                            className="rounded-xl bg-emerald-600 px-4 py-2.5 text-sm font-medium text-white"
                          >
                            Conferma
                          </button>
                          <button
                            type="submit"
                            name="status"
                            value="completed"
                            className="rounded-xl bg-slate-700 px-4 py-2.5 text-sm font-medium text-white"
                          >
                            Completa
                          </button>
                          <button
                            type="submit"
                            name="status"
                            value="cancelled"
                            className="rounded-xl bg-rose-600 px-4 py-2.5 text-sm font-medium text-white"
                          >
                            Cancella
                          </button>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </details>
          ))}
        </div>
      </section>
    </div>
  );
}