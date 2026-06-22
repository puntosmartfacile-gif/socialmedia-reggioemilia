"use client";

import Link from "next/link";
import { useActionState, useEffect, useMemo } from "react";
import { FormEvent } from "react";
import Footer from "@/app/components/Footer";
import Navbar from "@/app/components/Navbar";
import BookingCalendar from "@/app/components/booking/BookingCalendar";
import BookingShell from "@/app/components/booking/BookingShell";
import BookingSummary from "@/app/components/booking/BookingSummary";
import TimeSlotPicker from "@/app/components/booking/TimeSlotPicker";
import { createBooking, type BookingFormState } from "@/app/lib/supabase/actions";
import type { AvailabilitySlotRow, ServiceTypeRow } from "@/app/types/database";
import { useBookingStore } from "@/app/stores/booking-store";

type SlotWithService = AvailabilitySlotRow & { service_types?: ServiceTypeRow | null };

interface BookingFlowClientProps {
  service: "fotografia" | "consulenza";
  title: string;
  eyebrow: string;
  description: string;
  labels: string[];
  totalSteps: number;
  serviceTypes: ServiceTypeRow[];
  slots: SlotWithService[];
}

const initialState: BookingFormState = {
  success: false,
  message: "",
};

function formatDate(date: string | null) {
  if (!date) return "Da selezionare";
  return new Intl.DateTimeFormat("it-IT", {
    weekday: "long",
    day: "numeric",
    month: "long",
  }).format(new Date(`${date}T12:00:00`));
}

function formatSlot(slot: SlotWithService) {
  return `${slot.start_time.slice(0, 5)} - ${slot.end_time.slice(0, 5)}`;
}

export default function BookingFlowClient({
  service,
  title,
  eyebrow,
  description,
  labels,
  totalSteps,
  serviceTypes,
  slots,
}: BookingFlowClientProps) {
  const [state, formAction, pending] = useActionState(createBooking, initialState);
  const currentStep = useBookingStore((store) => store.currentStep);
  const nextStep = useBookingStore((store) => store.nextStep);
  const previousStep = useBookingStore((store) => store.previousStep);
  const selectedDate = useBookingStore((store) => store.selectedDate);
  const selectedTimeSlot = useBookingStore((store) => store.selectedTimeSlot);
  const photographySessionType = useBookingStore((store) => store.photographySessionType);
  const consultationDetails = useBookingStore((store) => store.consultationDetails);
  const contactInfo = useBookingStore((store) => store.contactInfo);
  const setSelectedDate = useBookingStore((store) => store.setSelectedDate);
  const setSelectedTimeSlot = useBookingStore((store) => store.setSelectedTimeSlot);
  const setPhotographySessionType = useBookingStore((store) => store.setPhotographySessionType);
  const setConsultationDetails = useBookingStore((store) => store.setConsultationDetails);
  const setContactInfo = useBookingStore((store) => store.setContactInfo);
  const resetBooking = useBookingStore((store) => store.resetBooking);
  const setService = useBookingStore((store) => store.setService);

  useEffect(() => {
    resetBooking(service);
    setService(service);
  }, [resetBooking, service, setService]);

  useEffect(() => {
    if (state.success) {
      nextStep(totalSteps);
    }
  }, [nextStep, state.success, totalSteps]);

  const selectedServiceType = useMemo(() => {
    if (service === "fotografia") {
      return serviceTypes.find((entry) =>
        photographySessionType === "premium"
          ? entry.slug === "sessione-premium"
          : entry.slug === "sessione-fotografica-standard",
      );
    }
    return serviceTypes[0];
  }, [photographySessionType, service, serviceTypes]);

  const filteredSlots = useMemo(
    () =>
      slots.filter((slot) =>
        selectedServiceType ? slot.service_type_id === selectedServiceType.id : true,
      ),
    [selectedServiceType, slots],
  );

  const availableDates = useMemo(
    () => Array.from(new Set(filteredSlots.map((slot) => slot.date))),
    [filteredSlots],
  );

  const slotsForSelectedDate = useMemo(
    () => filteredSlots.filter((slot) => slot.date === selectedDate),
    [filteredSlots, selectedDate],
  );

  const selectedSlot = useMemo(
    () => slotsForSelectedDate.find((slot) => formatSlot(slot) === selectedTimeSlot) ?? null,
    [selectedTimeSlot, slotsForSelectedDate],
  );

  const summaryItems = [
    {
      label: "Servizio",
      value:
        service === "fotografia"
          ? selectedServiceType?.name ?? "Sessione Fotografica"
          : selectedServiceType?.name ?? "Consulenza Strategica",
    },
    ...(service === "fotografia"
      ? [
          {
            label: "Pacchetto",
            value: photographySessionType === "premium" ? "Premium" : "Standard",
          },
        ]
      : [{ label: "Interesse", value: consultationDetails.interest || "Da definire" }]),
    { label: "Data", value: formatDate(selectedDate) },
    { label: "Orario", value: selectedTimeSlot ?? "Da selezionare" },
    { label: "Contatto", value: contactInfo.email || "Da compilare" },
  ];

  const handleNeedsSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    setConsultationDetails({
      needs: String(formData.get("needs") ?? ""),
      interest: String(formData.get("interest") ?? ""),
    });
    nextStep(totalSteps);
  };

  const handleContactSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    setContactInfo({
      name: String(formData.get("name") ?? ""),
      email: String(formData.get("email") ?? ""),
      phone: String(formData.get("phone") ?? ""),
      notes: String(formData.get("notes") ?? ""),
    });
    nextStep(totalSteps);
  };

  return (
    <>
      <Navbar />
      <main className="pt-20 md:pt-24">
        <BookingShell
          service={service}
          title={title}
          eyebrow={eyebrow}
          description={description}
          labels={labels}
          totalSteps={totalSteps}
        >
          {service === "fotografia" && currentStep === 1 ? (
            <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
              <div className="rounded-[2rem] border border-[#2C2C2C]/8 bg-white p-8 md:p-10">
                <p className="text-xs uppercase tracking-[0.28em] text-[#B8956B]">Step 1</p>
                <h2 className="mt-4 font-[family-name:var(--font-playfair)] text-3xl text-[#2C2C2C]">
                  Conferma i dettagli del servizio
                </h2>
                <div className="mt-8 grid gap-4">
                  {serviceTypes.map((option) => {
                    const isPremium = option.slug === "sessione-premium";
                    const isSelected =
                      photographySessionType === (isPremium ? "premium" : "standard");
                    return (
                      <button
                        key={option.id}
                        type="button"
                        onClick={() =>
                          setPhotographySessionType(isPremium ? "premium" : "standard")
                        }
                        className={[
                          "rounded-[1.75rem] border p-6 text-left transition-all",
                          isSelected
                            ? "border-[#B8956B] bg-[#B8956B]/8 shadow-[0_20px_60px_rgba(184,149,107,0.12)]"
                            : "border-[#2C2C2C]/8 hover:border-[#B8956B]/30",
                        ].join(" ")}
                      >
                        <h3 className="font-[family-name:var(--font-playfair)] text-2xl text-[#2C2C2C]">
                          {option.name}
                        </h3>
                        <p className="mt-3 text-sm leading-7 text-[#2C2C2C]/62">
                          {option.description}
                        </p>
                      </button>
                    );
                  })}
                </div>
                <div className="mt-8 flex justify-end">
                  <button
                    type="button"
                    onClick={() => nextStep(totalSteps)}
                    className="rounded-full bg-[#B8956B] px-6 py-3 text-sm font-medium text-white"
                  >
                    Continua
                  </button>
                </div>
              </div>
              <BookingSummary title="La tua selezione" items={summaryItems} />
            </div>
          ) : null}

          {service === "consulenza" && currentStep === 1 ? (
            <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
              <form
                onSubmit={handleNeedsSubmit}
                className="rounded-[2rem] border border-[#2C2C2C]/8 bg-white p-8 md:p-10"
              >
                <p className="text-xs uppercase tracking-[0.28em] text-[#B8956B]">Step 1</p>
                <h2 className="mt-4 font-[family-name:var(--font-playfair)] text-3xl text-[#2C2C2C]">
                  Descrivi le tue esigenze
                </h2>
                <div className="mt-8 grid gap-5">
                  <select
                    name="interest"
                    required
                    defaultValue={consultationDetails.interest}
                    className="rounded-2xl border border-[#2C2C2C]/10 bg-[#FAFAF7] px-5 py-4 outline-none"
                  >
                    <option>Strategia Social</option>
                    <option>Fotografia per il brand</option>
                    <option>Local SEO</option>
                    <option>Piano contenuti</option>
                  </select>
                  <textarea
                    name="needs"
                    required
                    rows={7}
                    defaultValue={consultationDetails.needs}
                    placeholder="Raccontaci obiettivi, sfide attuali e cosa vorresti ottenere nei prossimi mesi."
                    className="rounded-2xl border border-[#2C2C2C]/10 bg-[#FAFAF7] px-5 py-4 outline-none"
                  />
                </div>
                <div className="mt-8 flex justify-end">
                  <button
                    type="submit"
                    className="rounded-full bg-[#B8956B] px-6 py-3 text-sm font-medium text-white"
                  >
                    Continua
                  </button>
                </div>
              </form>
              <BookingSummary title="La tua selezione" items={summaryItems} />
            </div>
          ) : null}

          {((service === "fotografia" && (currentStep === 2 || currentStep === 3)) ||
            (service === "consulenza" && currentStep === 2)) && (
            <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
              <div className="space-y-6">
                <BookingCalendar
                  monthLabel={
                    availableDates[0]
                      ? new Intl.DateTimeFormat("it-IT", {
                          month: "long",
                          year: "numeric",
                        }).format(new Date(`${availableDates[0]}T12:00:00`))
                      : "Disponibilità"
                  }
                  availableDates={availableDates}
                  selectedDate={selectedDate}
                  onSelectDate={setSelectedDate}
                />
                <div className="rounded-[2rem] border border-[#2C2C2C]/8 bg-white p-6 md:p-8">
                  <h3 className="font-[family-name:var(--font-playfair)] text-2xl text-[#2C2C2C]">
                    Scegli l&apos;orario
                  </h3>
                  <div className="mt-6">
                    <TimeSlotPicker
                      slots={slotsForSelectedDate.map(formatSlot)}
                      selectedSlot={selectedTimeSlot}
                      onSelectSlot={setSelectedTimeSlot}
                    />
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <button
                    type="button"
                    onClick={previousStep}
                    className="text-sm text-[#2C2C2C]/60 transition-colors hover:text-[#B8956B]"
                  >
                    ← Indietro
                  </button>
                  <button
                    type="button"
                    onClick={() => nextStep(totalSteps)}
                    disabled={!selectedDate || !selectedTimeSlot}
                    className="rounded-full bg-[#B8956B] px-6 py-3 text-sm font-medium text-white disabled:bg-[#B8956B]/35"
                  >
                    Continua
                  </button>
                </div>
              </div>
              <BookingSummary title="La tua selezione" items={summaryItems} />
            </div>
          )}

          {((service === "fotografia" && currentStep === 4) ||
            (service === "consulenza" && currentStep === 3)) && (
            <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
              <form
                onSubmit={handleContactSubmit}
                className="rounded-[2rem] border border-[#2C2C2C]/8 bg-white p-8 md:p-10"
              >
                <p className="text-xs uppercase tracking-[0.28em] text-[#B8956B]">
                  Step {service === "fotografia" ? 4 : 3}
                </p>
                <h2 className="mt-4 font-[family-name:var(--font-playfair)] text-3xl text-[#2C2C2C]">
                  Conferma i tuoi dati
                </h2>
                <div className="mt-8 grid gap-5">
                  <input
                    name="name"
                    required
                    defaultValue={contactInfo.name}
                    placeholder="Nome e cognome"
                    className="rounded-2xl border border-[#2C2C2C]/10 bg-[#FAFAF7] px-5 py-4 outline-none"
                  />
                  <input
                    name="email"
                    type="email"
                    required
                    defaultValue={contactInfo.email}
                    placeholder="Email"
                    className="rounded-2xl border border-[#2C2C2C]/10 bg-[#FAFAF7] px-5 py-4 outline-none"
                  />
                  <input
                    name="phone"
                    type="tel"
                    required
                    defaultValue={contactInfo.phone}
                    placeholder="Telefono"
                    className="rounded-2xl border border-[#2C2C2C]/10 bg-[#FAFAF7] px-5 py-4 outline-none"
                  />
                  <textarea
                    name="notes"
                    rows={5}
                    defaultValue={contactInfo.notes}
                    placeholder="Note aggiuntive, obiettivi o dettagli logistici"
                    className="rounded-2xl border border-[#2C2C2C]/10 bg-[#FAFAF7] px-5 py-4 outline-none"
                  />
                </div>
                <div className="mt-8 flex items-center justify-between">
                  <button
                    type="button"
                    onClick={previousStep}
                    className="text-sm text-[#2C2C2C]/60 transition-colors hover:text-[#B8956B]"
                  >
                    ← Indietro
                  </button>
                  <button
                    type="submit"
                    className="rounded-full bg-[#B8956B] px-6 py-3 text-sm font-medium text-white"
                  >
                    Continua
                  </button>
                </div>
              </form>
              <BookingSummary title="La tua selezione" items={summaryItems} />
            </div>
          )}

          {((service === "fotografia" && currentStep === 5) ||
            (service === "consulenza" && currentStep === 4)) && !state.success ? (
            <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
              <form
                action={formAction}
                className="rounded-[2rem] border border-[#2C2C2C]/8 bg-white p-8 md:p-10"
              >
                <input type="hidden" name="serviceTypeId" value={selectedServiceType?.id ?? ""} />
                <input type="hidden" name="slotId" value={selectedSlot?.id ?? ""} />
                <input
                  type="hidden"
                  name="redirectPath"
                  value={service === "fotografia" ? "/prenota/fotografia" : "/prenota/consulenza"}
                />
                <input
                  type="hidden"
                  name="notes"
                  value={
                    service === "fotografia"
                      ? `${contactInfo.notes}\nPacchetto: ${photographySessionType}`
                      : `${contactInfo.notes}\nInteresse: ${consultationDetails.interest}\nEsigenze: ${consultationDetails.needs}`
                  }
                />
                <p className="text-xs uppercase tracking-[0.28em] text-[#B8956B]">
                  Conferma finale
                </p>
                <h2 className="mt-4 font-[family-name:var(--font-playfair)] text-3xl text-[#2C2C2C]">
                  Invia la prenotazione
                </h2>
                <p className="mt-4 text-base leading-8 text-[#2C2C2C]/65">
                  Verifica i dettagli e conferma. Se non hai effettuato l&apos;accesso verrai
                  reindirizzato alla pagina login.
                </p>
                {state.message ? (
                  <p className="mt-4 text-sm text-rose-700">{state.message}</p>
                ) : null}
                <div className="mt-8 flex items-center justify-between">
                  <button
                    type="button"
                    onClick={previousStep}
                    className="text-sm text-[#2C2C2C]/60 transition-colors hover:text-[#B8956B]"
                  >
                    ← Indietro
                  </button>
                  <button
                    type="submit"
                    disabled={pending || !selectedSlot || !selectedServiceType}
                    className="rounded-full bg-[#B8956B] px-6 py-3 text-sm font-medium text-white disabled:bg-[#B8956B]/35"
                  >
                    {pending ? "Invio..." : "Conferma richiesta"}
                  </button>
                </div>
              </form>
              <BookingSummary title="La tua selezione" items={summaryItems} />
            </div>
          ) : null}

          {state.success ? (
            <div className="rounded-[2rem] border border-[#2C2C2C]/8 bg-white p-10 text-center shadow-[0_24px_80px_rgba(44,44,44,0.05)] md:p-16">
              <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-[#B8956B]/12 text-[#B8956B]">
                <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                  <path d="M20 6L9 17l-5-5" />
                </svg>
              </div>
              <p className="mt-8 text-xs uppercase tracking-[0.32em] text-[#B8956B]">
                Richiesta inviata
              </p>
              <h2 className="mt-4 font-[family-name:var(--font-playfair)] text-4xl text-[#2C2C2C]">
                Grazie{contactInfo.name ? `, ${contactInfo.name}` : ""}.
              </h2>
              <p className="mx-auto mt-5 max-w-2xl text-base leading-8 text-[#2C2C2C]/65">
                Abbiamo ricevuto la tua richiesta per {summaryItems[0].value.toLowerCase()} il{" "}
                {formatDate(selectedDate)} alle {selectedTimeSlot}. Ti contatteremo presto.
              </p>
              <div className="mx-auto mt-10 max-w-xl">
                <BookingSummary title="Recap finale" items={summaryItems} />
              </div>
              <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
                <button
                  type="button"
                  onClick={() => resetBooking(service)}
                  className="rounded-full border border-[#2C2C2C]/12 px-6 py-3 text-sm font-medium text-[#2C2C2C]"
                >
                  Nuova prenotazione
                </button>
                <Link
                  href="/"
                  className="rounded-full bg-[#B8956B] px-6 py-3 text-sm font-medium text-white"
                >
                  Torna alla Home
                </Link>
              </div>
            </div>
          ) : null}
        </BookingShell>
      </main>
      <Footer />
    </>
  );
}