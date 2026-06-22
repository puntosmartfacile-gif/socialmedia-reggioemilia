import BookingFlowClient from "@/app/components/booking/BookingFlowClient";
import { getAvailabilitySlotsByServiceType, getServiceTypesByType } from "@/app/lib/supabase/queries";

const labels = ["Servizio", "Data", "Orario", "Conferma", "Fatto"];

export default async function PhotographyBookingPage() {
  const serviceTypes = await getServiceTypesByType("photography");
  const slots = await getAvailabilitySlotsByServiceType(serviceTypes.map((service) => service.id));

  return (
    <BookingFlowClient
      service="fotografia"
      title="Prenota la tua sessione fotografica"
      eyebrow="Booking fotografia"
      description="Definisci il tipo di sessione, scegli una data disponibile e inviaci i tuoi riferimenti. Ti ricontatteremo con conferma finale e dettagli operativi."
      labels={labels}
      totalSteps={5}
      serviceTypes={serviceTypes}
      slots={slots}
    />
  );
}
