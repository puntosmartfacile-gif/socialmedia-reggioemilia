import AdminPageHeader from "../../components/admin/AdminPageHeader";
import { createAvailabilitySlot, deleteAvailabilitySlot } from "@/app/lib/supabase/actions";
import { getAdminAvailabilitySlots } from "@/app/lib/supabase/queries";

function formatDate(value: string) {
  return new Intl.DateTimeFormat("it-IT", {
    weekday: "short",
    day: "2-digit",
    month: "short",
  }).format(new Date(`${value}T12:00:00`));
}

export default async function AdminAvailabilityPage() {
  const { slots, serviceTypes } = await getAdminAvailabilitySlots();

  return (
    <div className="space-y-6">
      <AdminPageHeader
        title="Disponibilità"
        description="Gestisci slot settimanali, ricorrenze e disponibilità per servizio con una vista calendario compatta."
      />

      <div className="grid gap-6 xl:grid-cols-[360px_minmax(0,1fr)]">
        <section className="rounded-2xl border border-[#2C2C2C]/8 bg-white p-5">
          <h2 className="text-lg font-semibold text-[#2C2C2C]">Aggiungi slot</h2>
          <form action={createAvailabilitySlot} className="mt-4 space-y-4">
            <label className="block">
              <span className="mb-2 block text-sm font-medium text-[#2C2C2C]">Data</span>
              <input
                name="date"
                type="date"
                required
                className="w-full rounded-xl border border-[#2C2C2C]/10 bg-[#FAFAF7] px-3 py-2.5 text-sm outline-none"
              />
            </label>
            <div className="grid gap-4 md:grid-cols-2">
              <label className="block">
                <span className="mb-2 block text-sm font-medium text-[#2C2C2C]">Inizio</span>
                <input
                  name="startTime"
                  type="time"
                  required
                  className="w-full rounded-xl border border-[#2C2C2C]/10 bg-[#FAFAF7] px-3 py-2.5 text-sm outline-none"
                />
              </label>
              <label className="block">
                <span className="mb-2 block text-sm font-medium text-[#2C2C2C]">Fine</span>
                <input
                  name="endTime"
                  type="time"
                  required
                  className="w-full rounded-xl border border-[#2C2C2C]/10 bg-[#FAFAF7] px-3 py-2.5 text-sm outline-none"
                />
              </label>
            </div>
            <label className="block">
              <span className="mb-2 block text-sm font-medium text-[#2C2C2C]">Servizio</span>
              <select
                name="serviceTypeId"
                className="w-full rounded-xl border border-[#2C2C2C]/10 bg-[#FAFAF7] px-3 py-2.5 text-sm outline-none"
              >
                {serviceTypes.map((service) => (
                  <option key={service.id} value={service.id}>
                    {service.name}
                  </option>
                ))}
              </select>
            </label>
            <label className="flex items-center gap-3 rounded-xl border border-[#2C2C2C]/8 bg-[#FAFAF7] px-3 py-3">
              <input
                name="isRecurring"
                type="checkbox"
                value="true"
                className="h-4 w-4 rounded border-[#2C2C2C]/20 accent-[#B8956B]"
              />
              <span className="text-sm text-[#2C2C2C]">Ripeti ogni settimana</span>
            </label>
            <button
              type="submit"
              className="w-full rounded-xl bg-[#B8956B] px-4 py-3 text-sm font-medium text-white"
            >
              Aggiungi slot
            </button>
          </form>
        </section>

        <section className="rounded-2xl border border-[#2C2C2C]/8 bg-white p-5">
          <div className="space-y-3">
            {slots.map((slot) => (
              <div
                key={slot.id}
                className="flex flex-col gap-3 rounded-2xl border border-[#2C2C2C]/8 bg-[#FAFAF7] p-4 md:flex-row md:items-center md:justify-between"
              >
                <div>
                  <p className="text-sm font-semibold text-[#2C2C2C]">
                    {slot.service_types?.name ?? "Servizio generico"}
                  </p>
                  <p className="mt-1 text-sm text-[#2C2C2C]/58">
                    {formatDate(slot.date)} · {slot.start_time.slice(0, 5)} - {slot.end_time.slice(0, 5)}
                  </p>
                  <p className="mt-1 text-xs text-[#2C2C2C]/45">
                    {slot.recurring_rule ? "Ricorrente" : "Singolo"}
                  </p>
                </div>
                <form action={deleteAvailabilitySlot.bind(null, slot.id)}>
                  <button
                    type="submit"
                    className="rounded-xl border border-rose-200 px-4 py-2 text-sm font-medium text-rose-700"
                  >
                    Rimuovi
                  </button>
                </form>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}