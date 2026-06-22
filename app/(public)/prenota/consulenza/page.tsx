import BookingFlowClient from "@/app/components/booking/BookingFlowClient";
import { getAvailabilitySlotsByServiceType, getServiceTypesByType } from "@/app/lib/supabase/queries";

const labels = ["Esigenze", "Data e ora", "Conferma", "Fatto"];

export default async function ConsultationBookingPage() {
  const serviceTypes = await getServiceTypesByType("consultation");
  const slots = await getAvailabilitySlotsByServiceType(serviceTypes.map((service) => service.id));

  return (
    <BookingFlowClient
      service="consulenza"
      title="Prenota una consulenza strategica"
      eyebrow="Booking consulenza"
      description="Raccontaci il tuo contesto, scegli uno slot disponibile e inviaci i tuoi riferimenti. Ti prepareremo un confronto mirato e concreto."
      labels={labels}
      totalSteps={4}
      serviceTypes={serviceTypes}
      slots={slots}
    />
  );
}
